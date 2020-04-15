import React from 'react'
import { useConnect } from '../src'
import { StoreData, store } from './store'

export function Demo () {
	const { count } = useConnect<StoreData, Partial<StoreData>>((state) => {
		return { count: state.count }
	})

	const inc = () => {
		store.produce((state) => {
			state.count++
		})
	}

	const dec = () => {
		store.produce((state) => {
			state.count--
		})
	}

	return (
		<div>
			<div>{count}</div>
			<button onClick={inc}>inc</button>
			<button onClick={dec}>dec</button>
		</div>
	)
}

export function Text () {
	const { show } = useConnect<StoreData, Partial<StoreData>>((state) => {
		return { show: state.show }
	})

	const handle = () => {
		store.produce((state) => {
			state.show = !show
		})
	}

	return (
		<div>
			<div>{show ? 'on' : 'off'}</div>
			<button onClick={handle}>click</button>
		</div>
	)
}