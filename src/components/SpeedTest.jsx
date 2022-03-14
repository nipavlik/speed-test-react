import styled from 'styled-components'
import { useSelector, useDispatch } from 'react-redux'

import { selectIsLoad, selectIsShowInfo, selectSpeed, startAsync } from '../store/speedtestSlice'
import Loader from './loader.svg'

function SpeedTest() {
  const isLoad = useSelector(selectIsLoad)
  const isShowInfo = useSelector(selectIsShowInfo)
  const speed = useSelector(selectSpeed)

  const dispatch = useDispatch()

  return (
    <SpeedTestWrapper>

      <Info style={{ display: isShowInfo ? 'block' : 'none' }}>
        Входящее соединение: { speed } МБайт/с
      </Info>
      
      <img style={{ display: isLoad ? 'block' : 'none' }} src={Loader} alt="Загрузка" />

      <Button style={{ display: !isLoad ? 'block' : 'none' }} onClick={() => dispatch(startAsync())}>Начать</Button>
      
    </SpeedTestWrapper>
  )
}

const Button = styled.button`
  background-color: #407ca3;
  border: 1px solid #407ca3;
  color: #fff;
  cursor: pointer;
  border-radius: 5px;
  height: 30px;
  box-sizing: content-box;
  padding: 1px 20px;
  font-weight: 400;
`

const SpeedTestWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Info = styled.div`
  margin-bottom: 15px;
`

export default SpeedTest
