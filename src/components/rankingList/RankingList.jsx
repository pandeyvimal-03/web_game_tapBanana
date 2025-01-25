import React, { useEffect , useState , useContext} from 'react'
import { loadUserList } from '../../actions'
import { failedToast , successToast } from '../../utils'
import Loader from '../common/Loader'
import Header from '../common/Header'
import { SocketContext } from '../../App'

function RankingList() {
  const socket = useContext(SocketContext);
  const [userList, setUserList] = useState([])
  const [loader, setLoader] = useState(false)

   const loadList = async()=>{
       loadUserList()
          .then((res)=>{
             if(res.status){
                setUserList(res.result.sort((a , b)=> b.CLICK_COUNT - a.CLICK_COUNT))
             }
             else{
               failedToast("Failed To Load User List")
             }
          })
          .catch(()=>{
              failedToast("Failed To Load User List")
          })
     }
   

   useEffect(()=>{

    loadList()

    socket.on("update-rankings", (data) => {
      setUserList(data);
    });

    return () => {
      socket.off("update-rankings");
    };
   } , [socket])

  return (
    <div>
    <Header />
    <div className='container my-4'>
      
      {
        loader && <Loader />
      }

      <div className='card px-4 mb-2'>
        <h2 className='text-gray fw-bold fs-4 rounded-sm py-2'>Ranking</h2>
      </div>
      
      <div>
        <table class="table  w-100 text-center">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Status</th>
              <th scope="col">Count</th>
            </tr>
          </thead>
          <tbody>
            {
              userList && userList.length > 0 && userList.map((item , index)=>{
                  return (
                    <tr>
                    <th scope="row">{index+1}</th>
                    <td >{item.USERNAME}</td>
                    <td>{item.EMAIL}</td>
                    <td>{item.STATUS == 1 ? 'Active' : 'Blocked'}</td>
                    <td>{item.CLICK_COUNT}</td>
                  </tr>
                  )
              })
            }
          </tbody>
        </table>

      </div>
    </div>
  </div>
  )
}

export default RankingList
