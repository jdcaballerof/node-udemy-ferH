import { CreateTable } from "../domain/use-cases/create-table.use-case"
import { SaveFile } from "../domain/use-cases/save-file.use-case"


interface RunOptions {
    base: number,
    limit: number,
    save: boolean,
    fileName: string,
    fileDestination: string,
    logTable: boolean,
}

export class ServerApp {

    // Un metodo estatico puedo llamarse sin necesidad de inicializar la clase
    static run(options: RunOptions) {
        console.log(options)
        console.log('Server running...')
        const { base, limit, logTable, save, fileName, fileDestination } = options

        const table = new CreateTable().run({ base, limit })

        if(logTable)  console.log(table);
        if(save) {
            const wasSaved = new SaveFile().run({ 
                fileContent: table,
                fileDestination: `outputs/${fileDestination}`, 
                fileName: fileName,
                // fileDestination: `outputs/table-${base}`, 
                // fileName: `table-${base}-limit-${limit}`,
            })
            // wasSaved 
            //     ? console.log('object')
            //     : console.error('error al guardar')

        }
    }
}