export type User = {
	user_id: number
	firstname: string
	lastname: string
	email: string
	password: string
}

export type Cart = {
	cart_id: number
	user_id: number
}

export type ItemType = {
	item_type_id: number
	name: string
}

export type Item = {
	item_id: number
	name: string
	price: string
	quantity: number
	image_url: string
	item_type_id: number
}

export type CartItem = {
	cart_id: number
	item_id: number
	quantity: number
}
