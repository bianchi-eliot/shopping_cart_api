import { RouterContext } from 'https://deno.land/x/oak@v11.1.0/mod.ts'

export type RContext = RouterContext<
	'/item-types/:id',
	{ id: string } & Record<string | number, string | undefined>,
	Record<string, any>
>

export type ItemTypes = {
	id: number
	name: string
}
