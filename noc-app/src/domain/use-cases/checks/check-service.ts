import { LogEntity, LogSeverityLevel } from "../../entities/log.entity"
import { LogRepository } from "../../repository/log.repository"


interface CheckServiceUseCase {
    run(url: string): Promise<boolean>
}

type SuccessCallback = () => void
type ErrorCallback = (error: string) => void


export class CheckService implements CheckServiceUseCase {
    
    constructor(
        private readonly logRepository: LogRepository,
        private readonly successCallback?: SuccessCallback,
        private readonly errorCallback?: ErrorCallback,
    ){}

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
            this.logRepository.saveLog( log )
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
            this.logRepository.saveLog( log )
            this.errorCallback && this.errorCallback(errorMsg)
            return false
        }
    }


}