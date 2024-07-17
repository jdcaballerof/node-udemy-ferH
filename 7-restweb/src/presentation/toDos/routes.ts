import { Router } from "express";
import { ToDosController } from "./controller";


export class ToDoRoutes {

    static get routes(): Router {
        const router = Router()

        //& Routes
        const toDosController = new ToDosController()
        router.get( '/', toDosController.getToDos )
        router.get( '/:id', toDosController.getToDoByID )
        router.post( '/', toDosController.createToDo )
        router.put( '/:id', toDosController.updateToDo )
        router.delete( '/:id', toDosController.deleteToDo )


        return router
    }
}