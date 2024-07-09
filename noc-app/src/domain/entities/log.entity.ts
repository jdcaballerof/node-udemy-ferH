

interface Options {
    origin: string,
    message: string, 
    level: LogSeverityLevel,
    createdAt: Date
}

export enum LogSeverityLevel {
    low    = 'low',
    medium = 'medium',
    high   = 'high',
}
  
  
  
export class LogEntity {
  
    public origin: string;
    public level: LogSeverityLevel; // Enum
    public message: string;
    public createdAt: Date;
  
    constructor( options: Options ) {
        const { origin, level, message, createdAt } = options
        this.origin = origin;
        this.message = message;
        this.level = level;
        this.createdAt = createdAt;
    }

    static fromJSON( json: string): LogEntity {
        const { origin, message, level, createdAt } = JSON.parse(json)

        const log = new LogEntity({origin, message, level, createdAt})
        log.createdAt = new Date(createdAt)

        return log
    }

    static fromObject(object: Record<string, any>): LogEntity {
        const { origin, message, level, createdAt } = object
        //to-do: validations...
        const log = new LogEntity({ origin, message, level, createdAt })

        return log
    }
}