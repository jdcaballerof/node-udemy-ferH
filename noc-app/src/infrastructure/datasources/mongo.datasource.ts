import { LogModel } from "../../data/mongo";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogSeverityLevel, LogEntity } from "../../domain/entities/log.entity";




export class MongoLogDatasource implements LogDatasource {

    async saveLog(log: LogEntity): Promise<void> {
        const { origin, message, level, createdAt } = log
        //& CREATE una coleccion (tabla) y un documento (registro/row)
        const newLog = await LogModel.create({ origin, message, level, createdAt })
        // await newLog.save()
        console.log('Mongo Log created', newLog.id);
        // console.log(newLog);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const mongoLogs = await LogModel.find({ level: severityLevel })
        const logs = mongoLogs.map( LogEntity.fromObject )
        
        return logs
    }
}