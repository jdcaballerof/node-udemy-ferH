import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


export const yarg = yargs( hideBin(process.argv) )
    .option('b',{
        alias: 'base',
        type: 'number',
        demandOption: true,     // Especificar si es necesaria este argumento
        describe: 'Multiplication table base'
    })
    .option('l',{
        alias: 'limit',
        type: 'number',
        default: 10,
        describe: 'Multiplication table limit'
    })
    .option('s',{
        alias: 'save',
        type: 'boolean',
        default: false,
        describe: 'Save multiplication table'
    })
    .option('n',{
        alias: 'name',
        type: 'string',
        default: 'multiplication-table',
        describe: 'File name'
    })
    .option('d',{
        alias: 'destination',
        type: 'string',
        default: 'tables',
        describe: 'File destination inside outputs'
    })
    .option('log',{
        type: 'boolean',
        default: false,
        describe: 'Show multiplication table'
    })
    .check( (argv, options) => {

        if( argv.b<=0 ) throw 'Error: base must be greater than 0'
        if( argv.l<1 || !Number.isInteger(argv.l) ) throw 'Error: limit must be integer and greater than 1'
        if( !argv.s && !argv.log ) throw 'Error: missing -s and/or -log'

        return true     // Necesario devolver true o un Error
    })
    .parseSync()
