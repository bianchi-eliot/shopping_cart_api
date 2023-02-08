import { config } from 'https://deno.land/x/dotenv@v3.2.0/mod.ts'
import { Client } from 'https://deno.land/x/mysql@v2.11.0/mod.ts'
config({ export: true })

const client = await new Client().connect({
	hostname: Deno.env.get('DB_HOSTNAME'),
	username: Deno.env.get('DB_USERNAME'),
	db: Deno.env.get('DB_NAME'),
	password: Deno.env.get('DB_PASSWORD'),
	poolSize: 1,
})

export default client
