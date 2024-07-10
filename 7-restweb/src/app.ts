import { envs } from "./config/plugins/envs";
import { Server } from "./presentation/server";



const {
    PORT: port, 
    PUBLIC_PATH: publicPath,
} = envs


function main() {

    const server = new Server({ port, publicPath }).start()
    // const server = new Server().start()


}


main()