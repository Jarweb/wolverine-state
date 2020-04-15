import React from 'react'
import { Provider } from '../src'
import { store } from './store'
import { Demo, Text} from './demo'

export default function App () {
	return (
		<Provider value={store}>
			<Demo />
			<Text />
		</Provider>
	)
}