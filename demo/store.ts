import { createStore } from '../src'

export interface StoreData {
	count: number,
	show: boolean,
}

const initialState: StoreData = {
	count: 0,
	show: false
}

export const store = createStore(initialState)