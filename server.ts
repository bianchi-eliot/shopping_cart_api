import { Application } from 'https://deno.land/x/oak@v11.1.0/mod.ts'

import usersRoutes from './src/users/routes.ts'
import cartsRoutes from './src/carts/routes.ts'
import itemTypesRoutes from './src/item_types/routes.ts'
import itemsRoutes from './src/items/routes.ts'
import cartItemsRoutes from './src/cart_items/routes.ts'
import rootRoutes from './src/root/routes.ts'

const app = new Application()

app.use(async (ctx, next) => {
  ctx.response.headers.set('Access-Control-Allow-Origin', 'http://localhost:5173')
  ctx.response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE')
  ctx.response.headers.set('Access-Control-Allow-Headets', 'Content-Type')
  await next()
})

app.use(usersRoutes.routes())
app.use(usersRoutes.allowedMethods())

app.use(cartsRoutes.routes())
app.use(cartsRoutes.allowedMethods())

app.use(itemTypesRoutes.routes())
app.use(itemTypesRoutes.allowedMethods())

app.use(itemsRoutes.routes())
app.use(itemsRoutes.allowedMethods())

app.use(cartItemsRoutes.routes())
app.use(cartItemsRoutes.allowedMethods())

app.use(rootRoutes.routes())
app.use(rootRoutes.allowedMethods())

await app.listen({ port: 3000 })
