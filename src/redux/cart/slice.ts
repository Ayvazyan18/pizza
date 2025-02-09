import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, CartSliceState } from './types'
import { getCartFromLS } from '../../utils/getCartFromLS'
import { calcTotalPrice } from '../../utils/calcTotalPrice'

const { items, totalPrice } = getCartFromLS()

const initialState: CartSliceState = {
	totalPrice,
	items,
}

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItems(state, action: PayloadAction<CartItem>) {
			const findItem = state.items.find(obj => obj.id === action.payload.id)

			if (findItem) {
				findItem.count++
			} else {
				state.items.push({
					...action.payload,
					count: 1,
				})
			}
			state.totalPrice = calcTotalPrice(state.items)
		},
		minusItems(state, action: PayloadAction<string>) {
			const findItem = state.items.find(obj => obj.id === action.payload)

			if (findItem) {
				findItem.count--
			}
		},
		removeItems(state, action: PayloadAction<string>) {
			state.items = state.items.filter(obj => obj.id === action.payload)
		},
		clearItems(state) {
			state.items = []
			state.totalPrice = 0
		},
	},
})


export const { addItems, minusItems, removeItems, clearItems } =
	cartSlice.actions

export default cartSlice.reducer
