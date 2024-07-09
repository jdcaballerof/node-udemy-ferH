import 'dotenv/config'
import { Server } from "./presentation/server";
import { envs } from './config/plugins/envs.plugin';
import { LogModel, MongoDB } from './data/mongo';


async function main() {

    await MongoDB.connect({
        mongoUrl: envs.MONGO_URL,
        dbName: envs.MONGO_DB_NAME,
    })    

    Server.run()
}

main()