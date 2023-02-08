import { Application, Router } from 'https://deno.land/x/oak@v11.1.0/mod.ts'

const app = new Application()
const router = new Router()

router.get('/', ctx => {
    ctx.response.body = 'Hello World'
})

app.use(router.routes())
app.use(router.allowedMethods())

await app.listen({ port: 3000 })