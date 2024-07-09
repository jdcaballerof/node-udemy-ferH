import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"


interface CheckServiceMultipleUseCase {
    run(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void


export class CheckServiceMultiple implements CheckServiceMultipleUseCase {
    
    constructor(
        private readonly logRepositories: LogRepository[],
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback,
    ){}

    private callSaveLogOfManyRepos( log: LogEntity ){
        this.logRepositories.forEach( logRepository => {
            logRepository.saveLog( log )
        })
    }

    async run(url: string): Promise<boolean> {
        try {
            const req = await fetch(url)
            if( !req.ok )  throw new Error(`Error on check service: ${url}`)
            
            const log = new LogEntity({
                origin: 'check-service.ts',
                message: `Service ${url} working`, 
                level: LogSeverityLevel.low,
                createdAt: new Date()
            })
            this.callSaveLogOfManyRepos(log)
            this.successCallback && this.successCallback()
            
            return true
        } catch (error) {
            const errorMsg = `Service ${url} error: ${error}`
            const log = new LogEntity({
                origin: 'check-service.ts',
                message: errorMsg, 
                level: LogSeverityLevel.high,
                createdAt: new Date()
            })
            this.callSaveLogOfManyRepos(log)
            this.errorCallback && this.errorCallback(errorMsg)
            return false
        }
    }


}