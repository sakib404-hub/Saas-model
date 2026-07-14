import path from "path"
import dotenv from "dotenv"

dotenv.config({
    path : path.join(process.cwd(), '.env')
});


export const config = {
    port_number : process.env.PORT,
    databse_url : process.env.DATABASE_URL,
    bcrypt_salt_round : process.env.BCRYPT_SALT_ROUND,
    backend_origin_url : process.env.BACKEND_ORIGIN_URL
}

