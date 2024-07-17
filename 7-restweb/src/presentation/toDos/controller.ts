import { Request, Response } from "express";


const todos = [
    {id: 1, text: 'Buy milk',  createdAt: new Date(), doneAt: null},
    {id: 2, text: 'Buy bread', createdAt: new Date(2024,5,15), doneAt: new Date()},
    {id: 3, text: 'Buy juice', createdAt: new Date(), doneAt: null},
]


export class ToDosController {

    // DI (dependency Injection)
    constructor(){}
    
    getToDos = ( req: Request, res: Response ) => {
        
        return res.json(todos)
    }

    getToDoByID = (req: Request, res: Response ) => {
        const id = +req.params.id
        if( isNaN(id) )  return res.status(400).json({error: `ID not valid: ${id}`})

        const todo = todos.find( t => t.id === Number(id) )
        if(todo)  return res.json(todo)
        else      return res.status(404).json(null)
    }

    createToDo = (req: Request, res: Response) => {
        const {text} = req.body   // Para obtener el JSON del Body de la petición aplicar en server.ts: server.use( express.json() )

        const newTodo = {id: todos.length+1, text, createdAt: new Date(), doneAt: null}
        todos.push(newTodo)
        
        return res.json(newTodo)
    }

    updateToDo = (req: Request, res: Response) => {
        const id = +req.params.id
        const {text, doneAt} = req.body   // Para obtener el JSON del Body de la petición aplicar en server.ts: server.use( express.json() )

        const toDoIndex = todos.findIndex( t => t.id === id )
        if (toDoIndex === -1)  return res.status(404).json(null)
        const toDo = todos[toDoIndex]
        const newToDo = { 
            ...toDo, 
            text: text || toDo.text, 
            doneAt: doneAt ?? toDo.doneAt, 
        }
        todos.splice(toDoIndex, 1, newToDo);
        
        return res.json(newToDo)
    }

    deleteToDo = (req: Request, res: Response) => {
        const id = +req.params.id

        const toDoIndex = todos.findIndex( t => t.id === id )
        if (toDoIndex === -1)  return res.status(404).json(null)
        
        todos.splice(toDoIndex, 1)
        
        return res.json({msg: `toDo ${id} deleted`})
    }
}