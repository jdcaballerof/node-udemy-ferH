import { yarg } from "./config/plugins/args.plugins";
import { ServerApp } from "./presentation/server-app";


async function main() {
    const {
        b: base,
        l: limit,
        s: save,
        n: name,
        d: destination,
        log: logTable
    } = yarg

    ServerApp.run({ base, limit, save, fileName: name, fileDestination: destination, logTable })

}

main()