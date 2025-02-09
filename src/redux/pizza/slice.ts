import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { Pizza, PizzaSliceState, Status } from "./types"
import { fetchPizza } from "./asyncAction"


const initialState: PizzaSliceState = {
	items: [],
	status: Status.LOADING,
}

const pizzaSlice = createSlice({
	name: 'pizza',
	initialState,
	reducers: {
		setItems(state, action: PayloadAction<Pizza[]>) {
			state.items = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchPizza.pending, state => {
				state.status = Status.LOADING
				state.items = []
			})
			.addCase(fetchPizza.fulfilled, (state, action) => {
				state.items = action.payload
				state.status = Status.SUCCESS
			})
			.addCase(fetchPizza.rejected, state => {
				state.status = Status.ERROR
				state.items = []
			})
	},
})

export const { setItems } = pizzaSlice.actions

export default pizzaSlice.reducer
