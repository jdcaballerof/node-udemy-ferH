import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogDatasource } from "../../domain/datasource/log.datasource";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entity";


const severityEnum = {
    low: SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}
const prisma = new PrismaClient()


export class PgPrismaLogDatasource implements LogDatasource {


    async saveLog(log: LogEntity): Promise<void> {
        const newLog = await prisma.logModel.create({
            data: {
                ...log,
                level: severityEnum[log.level],
            }
        })
        // console.log(newLog.id, newLog.message);
    }

    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        // GET logs
        const logsPrisma = await prisma.logModel.findMany({ where: { level: severityEnum[severityLevel] }})
        const logs = logsPrisma.map( LogEntity.fromObject )
        
        return logs
    }

}