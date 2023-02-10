export type Users = {
	user_id: number
	firstname: string
	lastname: string
	email: string
	password: string
}

export type Carts = {
	cart_id: number
	user_id: number
}

export type ItemTypes = {
	item_type_id: number
	name: string
}

export type Items = {
	item_id: number
	name: string
	quantity: number
	image_url: string
	item_type_id: number
}

export type CartItems = {
	cart_id: number
	item_id: number
	quantity: number
}
