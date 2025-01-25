import React from 'react'
import constant from '../constant'
import { getStorage } from '../utils'
import { Routes , Route , Navigate} from 'react-router-dom'
import UserList from '../components/adminUserList/UserList'
import Login from '../components/login/Login'
import RankingList from '../components/rankingList/RankingList'
import PlayGround from '../components/playground/PlayGround'
import Home from '../components/home/Home'

function AdminRoute (props){
 
  const token = getStorage(constant.keys.token)
  const ud = getStorage(constant.keys.userDetail)
  
   if(!token){
    return <Navigate to={constant.routes.user.login}/>
   }

  else if( token && ud.userRoleId != 1){
      return <Navigate to={constant.routes.user.playGame}/>
   }

   return props.component

}

function PrivateRoute (props){
   const token = getStorage(constant.keys.token)
    if(token){
      return props.component
    }
    Navigate(constant.routes.user.login)
}

function AllRoutes() {
  return (
      <Routes>
           <Route path={constant.routes.user.home} element={<Home/>}/>
           <Route path={constant.routes.user.login} element={<Login/>}/>
           <Route path={constant.routes.user.playGame} element={<PrivateRoute component={<PlayGround/>}/>}/>
           <Route path={constant.routes.admin.userList} element={<AdminRoute component={<UserList/>}/>}/>
           <Route path={constant.routes.user.ranking} element={<PrivateRoute component={<RankingList/>}/>}/>
      </Routes>
  )
}

export default AllRoutes
