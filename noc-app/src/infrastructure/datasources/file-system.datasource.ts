import fs from "fs";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";




export class FileSystemDatasource implements LogDatasource {

    private readonly logsPath = 'logs/'
    private readonly pathFileNames = {
        all:    this.logsPath + 'all-logs.log',
        low:    this.logsPath + 'low-logs.log',
        medium: this.logsPath + 'medium-logs.log',
        high:   this.logsPath + 'high-logs.log',
    } 

    constructor() {
        this.createLogsFiles()
    }

    /** Crear los archivos para los logs si NO existen     */
    private createLogsFiles() {
        if( !fs.existsSync(this.logsPath) )  fs.mkdirSync(this.logsPath)

        Object.values(this.pathFileNames).forEach(path => {
            if(path === this.pathFileNames.low)  return 

            if( !fs.existsSync( path ) )  fs.writeFileSync( path, '' )
        });
    }
    
    saveLog(log: LogEntity): void {
        const logStringify = JSON.stringify(log)+'\n'
        const pathAllLogs = this.pathFileNames.all
        fs.appendFileSync(pathAllLogs, logStringify)

        if(log.level === LogSeverityLevel.low)  return
        
        if(log.level === LogSeverityLevel.medium) {
            fs.appendFileSync(this.pathFileNames.medium, logStringify)
        }
        if(log.level === LogSeverityLevel.high) {
            fs.appendFileSync(this.pathFileNames.high, logStringify)
        }
        
        // Si cambia el nombre de los levels se tendria que modificar tambien las keys de 'fileNames' con esta logica
        // const pathRequired = this.logsPath+this.fileNames[log.level]
        // fs.appendFileSync(pathRequired, logStringify)
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const content = fs.readFileSync( path, 'utf-8' )
        const logs = content.split('\n').map( LogEntity.fromJSON )

        return logs
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        switch(severityLevel) {
            case LogSeverityLevel.low:
                return this.getLogsFromFile(this.pathFileNames.low)
                
            case LogSeverityLevel.medium:
                return this.getLogsFromFile(this.pathFileNames.medium)
            
            case LogSeverityLevel.high:
                return this.getLogsFromFile(this.pathFileNames.high)

            
            default:
                throw new Error(`${severityLevel} not implemented`)
        }
    }
}