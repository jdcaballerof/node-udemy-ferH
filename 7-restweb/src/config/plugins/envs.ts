import 'dotenv/config'
import { get } from 'env-var'


export const envs = {
    // PORT : get('PORT').required().asPortNumber(),
    PORT : get('PORT').default(4000).asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').default('public').asString(),
}