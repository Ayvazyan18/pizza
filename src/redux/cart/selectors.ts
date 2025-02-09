import { RootState } from '../store'

export const selectCart = (state: RootState) => {
	return {
		...state.cart,
		totalPrice: state.cart.items.reduce(
			(sum, item) => sum + item.price * item.count,
			0
		),
	}
}

export const selectCartItemById = (id: string) => (state: RootState) =>
	state.cart.items.find(obj => obj.id === id)
