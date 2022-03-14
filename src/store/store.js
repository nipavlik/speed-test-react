import { configureStore } from '@reduxjs/toolkit'

import speedtestReducer from './speedtestSlice'

export const store = configureStore({
  reducer: {
    speedtest: speedtestReducer
  }
})