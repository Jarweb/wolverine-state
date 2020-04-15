import immer, {Draft} from 'immer'

type Listener = Function
type Updater<T> = (prevState: T) => T
type DraftFn<T> = (prevState: Draft<T>) => void | T

export interface Store<T> {
	get(): T,
	set(state: T): void,
	set(stateFn: Updater<T>): void,
	on(listener: Function): void,
	off(listener: Function): void,
	reset(): void,
	produce(draftFn: DraftFn<T>): void
}

export function createStore<T>(initialState: T): Store<T> {
	let listeners: Listener[] = []
	let state = initialState

	const get = () => {
		return state
	}

	const set = (nextState: T | Updater<T>) => {
		state = typeof nextState === 'function' ? (nextState as Updater<T>)(state) : nextState
		listeners.forEach(listener => listener())
	}

	const on = (listener: Listener) => {
		listeners.push(listener)
		return () => off(listener)
	}

	const off = (listener: Listener) => {
		listeners = listeners.filter(item => item !== listener)
	}

	const reset = () => {
		set(initialState)
	}

	const produce = (draftFn: DraftFn<T>) => {
		const state = get()
		const newState = immer(state, draftFn)
		newState !== state && set(newState as T)
	}

	return {
		get,
		set,
		on,
		off,
		reset,
		produce
	}
}

export function subscribe<T> (store: Store<T>, listener: Listener) {
	return store.on(listener)
}