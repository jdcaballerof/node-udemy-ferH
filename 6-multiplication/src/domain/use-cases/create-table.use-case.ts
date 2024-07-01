/** La funcionalidad de este archivo es
 *& Crear la data de la tabla
*/


export interface CreateTableUseCase {
    run: (options: CreateTableOptions) => string
}

export interface CreateTableOptions {
    base: number,
    limit?: number,
}


export class CreateTable implements CreateTableUseCase {

    // Este es el primer metodo que se manda a llamar al construir una clase
    constructor(){
        /** DI   */
    }

    /**
     * Crea la data de la tabla 
     * Tambien se puede llamar "execute" o "create" para este caso de "CreateTable".
    */ 
    run({base, limit=10}: CreateTableOptions){
        const content = []

        for (let i = 1; i <= limit; i++) {
            const str = `${base} x ${i} = ${base*i}`
            content.push(str)
        }

        return content.join('\n')
    }

}