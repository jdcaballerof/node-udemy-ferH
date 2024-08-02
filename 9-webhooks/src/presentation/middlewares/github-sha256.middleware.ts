import crypto from "crypto";
import { NextFunction, Request, Response } from "express"
import { envs } from "../../config";

const SECRET_KEY = envs.WEBHOOK_SECRET_TOKEN;



export class GithubSha256Middleware {

    static verifySignature = async (req: Request, res: Response, next: NextFunction) => {
        const expectedSignature = "sha256=" + crypto
            .createHmac( "sha256", SECRET_KEY )
            .update( JSON.stringify( req.body ) )
            .digest( "hex" );
   
        const xHubSignature = req.headers[ "x-hub-signature-256" ];
        console.log({originalSignature: SECRET_KEY, expectedSignature, xHubSignature});
        
        if ( xHubSignature !== expectedSignature ) {
            return res.status( 401 ).send( "Unauthorized" );
        }
    
        next();
    }
}


/* Original
const verify_signature = (req: Request) => {
    const signature = crypto
        .createHmac( "sha256", SECRET_KEY )
        .update( JSON.stringify( req.body ) )
        .digest( "hex" );
    
    let trusted = Buffer.from(`sha256=${signature}`, 'ascii');
    let untrusted = Buffer.from(req.header("x-hub-signature-256") ?? '', 'ascii');
    return crypto.timingSafeEqual( trusted, untrusted )

}
*/