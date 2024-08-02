import type { Context } from "@netlify/functions";



export default async (req: Request, context: Context) => {
  
    const data = {
        message: "discord"
    }


    console.log('github-discord: Ok');
    return new Response(JSON.stringify(data), {
        status: 200,
        headers: {
            'Content-Type':'application/json'
        }
    })
}