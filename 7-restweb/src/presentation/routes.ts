import { Router } from "express";
import { ToDoRoutes } from "./toDos/routes";


export class AppRoutes {

    static get routes(): Router {
        const router = Router()

        //& Routes
        router.use( '/api/todos', ToDoRoutes.routes )

        router.get('/api/*', (req, res) => {
            const path = req.path
            res.send({path, date: new Date()})
        })

        return router
    }
}