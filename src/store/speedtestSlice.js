import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
  isLoad: false,
  isShowInfo: false,
  downloadSize: 0,
  startTime: 0,
  endTime: 0,
  speed: 0
}

export const speedtestSlice = createSlice({
  name: 'speedtest',
  initialState,
  reducers: {
    start: (state) => {
      state.isLoad = true
      state.isShowInfo = false

      state.startTime = new Date().getTime()

      state.speed = 0
    },
    calc: (state) => {
      let duration = (state.endTime - state.startTime) / 1000
      
      let bitsLoaded = state.downloadSize
      let speedBps = (bitsLoaded / duration).toFixed(2)
      let speedKbps = (speedBps / 1024).toFixed(2)
      let speedMbps = (speedKbps / 1024).toFixed(2)

      state.speed = speedMbps
    },
    setEndTime: (state, action) => {
      state.endTime = action.payload
    },
    setDownloadSize: (state, action) => {
      state.downloadSize = action.payload
    },
    stop: (state) => {
      state.isLoad = false
      state.isShowInfo = true
    }
  }
})

const { setEndTime, setDownloadSize, calc } = speedtestSlice.actions

export const startAsync = () => (dispatch) => {
  dispatch(start())

  let endRequest = () => {
    let endTime = new Date().getTime()
      dispatch(setEndTime(endTime))
      dispatch(calc())
      dispatch(stop())
  }

  axios.get('/bigfile.jpg', { 
    timeout: 5000,
    onDownloadProgress: (progressEvent) => {
      dispatch(setDownloadSize(progressEvent.loaded))
    },
    headers: {
      'Cache-Control': 'no-cache'
    }
  })
    .then(endRequest)
    .catch(endRequest)
}

export const { start, stop } = speedtestSlice.actions

export const selectSpeed = (state) => state.speedtest.speed
export const selectIsLoad = (state) => state.speedtest.isLoad
export const selectIsShowInfo = (state) => state.speedtest.isShowInfo

export default speedtestSlice.reducer