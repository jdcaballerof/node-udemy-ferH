import type { Context } from "@netlify/functions";



export default async (req: Request, context: Context) => {
  
    const data = {
        message: "Hello, world!"
    }

    console.log('Saludo: Ok');

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type':'application/json'
        }
    })
}