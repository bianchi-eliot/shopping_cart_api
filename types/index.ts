export type Users = {
	user_id: number
	firstname: string
	lastname: string
	email: string
	password: string
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
