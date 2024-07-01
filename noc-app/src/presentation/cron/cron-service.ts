import { CronJob } from 'cron';


type CronTime = string | Date
type OnTick = () => void


export class CronService {

    static createJob(cronTime: CronTime, onTick: OnTick ): CronJob<null, null> {
        const job = new CronJob(
            cronTime,
            onTick
            // // null, // onComplete
            // // true, // start (autoStart) - job.start() is optional here because this is true
            // // 'America/Los_Angeles' // timeZone
        );
        job.start()

        return job
    }

}


/**
 *  field            allowed values
    -------          --------------
    1.second         0-59
    2.minute         0-59
    3.hour           0-23
    4.day of month   1-31
    5.month          1-12 (or names, see below)
    6.day of week    0-7 (0 or 7 is Sunday, or use names)
*/

/** Examples
 * '* * * * * *',  // cronTime - every second do this... 
 * '*\3 * * * * *',  // cronTime - every 3 seconds do this... 
*/