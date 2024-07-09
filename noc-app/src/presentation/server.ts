import { MongoLogDatasource, FileSystemDatasource, PgPrismaLogDatasource } from "../infrastructure/datasources";
import { LogRepositoryImpl } from "../infrastructure/repositories/log.repository.impl";
import { CronService } from "./cron/cron-service";
import { CheckServiceMultiple } from "../domain/use-cases/checks/check-service-multiple-db";


const LogRepository = new LogRepositoryImpl( 
    // new FileSystemDatasource
    // new MongoLogDatasource
    new PgPrismaLogDatasource
)

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource )
const mongoLogRepository = new LogRepositoryImpl( new MongoLogDatasource )
const pgPrismaLogRepository = new LogRepositoryImpl( new PgPrismaLogDatasource )


export class Server {

    static run() {
        console.log('Server is running...');
        const url = 'https://google.com'

        CronService.createJob(
            '*/3 * * * * *', 
            async () => {
                // new CheckService(
                    // LogRepository,
                new CheckServiceMultiple(
                    [fileSystemLogRepository, mongoLogRepository, pgPrismaLogRepository],
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error)
                )
                .run(url)
            }
        )
    }
}