import React from 'react'
import { getStorage } from '../../utils'
import constant from '../../constant'
import { Navigate } from 'react-router-dom'
import Swal from 'sweetalert2'

function Home() {
    const token = getStorage(constant.keys.token)
    const ud = getStorage(constant.keys.userDetail)
    const isAdmin = ud?.userRoleId === 1 ? true : false
    
    if (token && isAdmin) {
        Swal.fire({
            icon: "success",
            text: "You have Successfully Logged in",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        return <Navigate to={constant.routes.admin.userList} />
    }
    else if (token && !isAdmin) {
        Swal.fire({
            icon: "success",
            text: "You have Successfully Logged in",
            timer: 2000,
            showCancelButton: false,
            showConfirmButton: false,
          });
        return <Navigate to={constant.routes.user.playGame} />
    }

    return <Navigate to={constant.routes.user.login}/>
}

export default Home
