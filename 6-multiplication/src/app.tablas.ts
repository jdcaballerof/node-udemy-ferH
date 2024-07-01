import { mkdirSync, writeFileSync } from "fs";
import { yarg } from "./config/plugins/args.plugins";


const {
    b: base,
    l: limit,
    s: save,
    log: logTable
} = yarg


const header = `=====================
    Tabla del ${base}
=====================
`
const content = []

for (let i = 1; i <= limit; i++) {
    const str = `${base} x ${i} = ${base*i}`
    content.push(str)
}

const data = header+'\n'+content.join('\n')


if(logTable) console.log(data);


if(save) {
    const outputPath = 'outputs'

    mkdirSync(outputPath, { recursive: true })
    writeFileSync(`${outputPath}/tabla-${base}.txt`, data)
    console.log(`\nFile created in /${outputPath}`);
}