import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";
import { LogRepository } from "../../domain/repository/log.repository";



export class LogRepositoryImpl implements LogRepository {

    // Manera corta de crear propiedades
    constructor(
        private readonly logDataSource: LogDatasource,  
    ){}
    

    saveLog(log: LogEntity): void {
        return this.logDataSource.saveLog( log )
    }

    getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        return this,this.logDataSource.getLogs( severityLevel )
    }
    
}