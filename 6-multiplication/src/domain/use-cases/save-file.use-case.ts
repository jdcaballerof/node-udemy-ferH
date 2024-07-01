import { mkdirSync, writeFileSync } from "fs";



interface SaveFileUseCase {
    run: (options: Options) => boolean,
}

// The UseCase's options
interface Options {
    fileContent:    string,
    fileDestination?:   string,
    fileName?:      string
}


export class SaveFile implements SaveFileUseCase {

    constructor() {}

    run( options: Options ): boolean { 
        const { 
            fileContent, 
            fileDestination = 'outputs', 
            fileName = `table`, 
        } = options

        try {
            mkdirSync(fileDestination, { recursive: true })
            writeFileSync(`${fileDestination}/${fileName}.txt`, fileContent)
            console.log(`\nFile created in /${fileDestination}`);
            return true
        } catch (error) {
            console.error(error);
            return false
        }
    }
}