import React , {useContext, useEffect, useState} from 'react'
import Header from '../common/Header'
import Loader from '../common/Loader'
import Banana from '../../assets/images/banana_imgg.png'
import { SocketContext } from '../../App'
import { getCount } from '../../actions'
import { failedToast , successToast } from '../../utils'

function PlayGround() {
  const socket = useContext(SocketContext);
  const [count , setCount] =  useState(0)

  const loadCount = ()=>{
    getCount()
      .then((res)=>{
          if(res.status){
            console.log("res")
             setCount(res.result.CLICK_COUNT)
          }
          else{
             failedToast("Failed to load count")
          }
      })
      .catch(()=>{
        failedToast("Failed to load count")
      })
  }

  useEffect(()=>{
    loadCount()
  } , [])

  const handleBananaClick = () => {
    
    socket.emit("player-click" , (response)=>{
        console.log("we are in and response is : ", response)
        if(response.status){
          setCount(response.user.CLICK_COUNT)
        }
        else{
          failedToast("Failed to update the count")
        }
    });
  };

  return (
    <div>
      <Header />
      <div className='container my-4'>
        <div className='card px-4 mb-2'>
          <h2 className='text-gray fw-bold fs-4 rounded-sm py-2'>Playground</h2>
        </div>

        <div className='row gap-4'>
            <div className='col-12 py-6 text-center'>
                 <h2 className='text-cener fw-bold text-black fs-8'>{count}</h2>
            </div>
            <div className='col-12 text-center mt-6 py-8 '>
                <img src={Banana} alt="Banana"  style={{height : '200px', width : '200px', cursor : 'pointer'}} onClick={handleBananaClick}/>
            </div>
        </div>
      </div>
    </div>
  )
}

export default PlayGround
