import { envs } from "./config/plugins/envs";
import { AppRoutes } from "./presentation/routes";
import { Server } from "./presentation/server";



const {
    PORT: port, 
    PUBLIC_PATH: publicPath,
} = envs


function main() {

    const server = new Server({ 
        port, 
        publicPath,
        routes: AppRoutes.routes 
    })
    
    server.start()


}


main()