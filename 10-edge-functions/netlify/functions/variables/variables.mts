import type { Context } from "@netlify/functions";



export default async (req: Request, context: Context) => {

    const TOKEN = process.env.SECRET_TOKEN

    if(!TOKEN) {
        console.log('Vars: failed');
        throw new Error('Missing token')
    }
  
    const data = {
        token: TOKEN,
    }

    console.log('Vars: Ok');

    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type':'application/json'
        }
    })
}