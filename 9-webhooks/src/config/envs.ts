import 'dotenv/config';
import {get} from 'env-var';



export const envs = {

  PORT: get('PORT').required().asPortNumber(),

  DISCORD_WEBHOOK_URL: get('DISCORD_WEBHOOK_URL').required().asString(),

  WEBHOOK_SECRET_TOKEN: get('WEBHOOK_SECRET_TOKEN').required().asString(),
}