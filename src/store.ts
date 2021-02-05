import { configureStore } from '@reduxjs/toolkit'
import rootReducer from './reducers'

const store = configureStore({
  reducer: rootReducer,
})

export default store
export type RootStore = typeof store
export type RootState = ReturnType<RootStore['getState']>
