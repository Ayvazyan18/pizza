export type Pizza = {
	id: string
	title: string
	price: number
	imageUrl: string
	sizes: number[]
	types: number[]
	count: number
}

export enum Status {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error',
}

export interface PizzaSliceState {
	items: Pizza[]
	status: 'loading' | 'success' | 'error'
}

export type SearchPizzaParams = {
	sortBy: string
	order: string
	category: string
	search: string
	currentPage: string
}