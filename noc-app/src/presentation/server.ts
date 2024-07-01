import { CheckService } from "../domain/use-cases/checks/check-service";
import { CronService } from "./cron/cron-service";



export class Server {

    static run() {
        console.log('Server is running...');
        const url = 'https://google.com'

        CronService.createJob(
            '*/3 * * * * *', 
            async () => {
                new CheckService(
                    () => console.log(`${url} is ok`),
                    (error) => console.error(error)
                ).run(url)
            }
        )
    }
}