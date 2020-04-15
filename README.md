### intro

a lightweight react state management lib based on immer 、 react hook and context



### quick start

```
yarn add @jarzzzi/wolverine-state
```


### example

```code
const initialState: StoreData = {
 count: 0,
 show: false
}

const store = createStore(initialState)

function Demo () {
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

function App () {
 return (
   <Provider value={store}>
    <Demo />
    <Text />
   </Provider>
 )
}
```