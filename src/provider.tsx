import React, { useContext, useCallback, useState, useEffect } from 'react'
import { StoreContext } from './context'
import { Store } from './store'

interface Props<T> {
	value: Store<T>
	children: React.ReactNode,
}

export function Provider<T> ({children, value: store}: Props<T>) {
	const defaultState = useCallback(() => store.get(), [store])
	const [state, setState] = useState(defaultState)
	
	useEffect(() => {
		const updater = () => {
			setState(store.get())
		}
		store.on(updater)

		return () => {
			store.off(updater)
		}
	}, [store, setState])
	
	return (
		<StoreContext.Provider value={state as any}>
			{children}
		</StoreContext.Provider>
	)
}


export function useConnect<S, V> (selector: (state: S) => V) {
	const state = useContext(StoreContext)
	const reselector = useCallback(() => selector(state as S), [selector, state])
	return reselector()
}

