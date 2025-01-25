import React, { useState } from 'react'
import { failedToast, getStorage } from '../../utils'
import constant from '../../constant'
import { Navigate , useNavigate} from 'react-router-dom'
import Swal from 'sweetalert2'
import Loader from '../common/Loader'
import { login } from '../../actions'


function Login() {
    const navigate = useNavigate()
   const [userDet , setUserDet] = useState({
      email : {name : 'email' , value : '' , error : '' , isRequired : true},
      password : {name : 'password' , value : '' , error : '' , isRequired : true}
   })
   const [loader , setLoader] = useState(false)


    const onChange = (e)=>{
         const {name , value} = e.target
         setUserDet((prev) =>({
            ...prev,
            [name] : {...prev[name] , value : value}
         }))
    }

    const onSubmit = (e)=>{
        e.preventDefault()
        const model = {
            email : userDet?.email?.value,
            password : userDet?.password?.value
        }
        setLoader(true)
        login(model)
           .then((res)=>{
                setLoader(false)
               if(res.status){
                Swal.fire({
                    icon: "success",
                    text: "You have Successfully Logged in",
                    timer: 2000,
                    showCancelButton: false,
                    showConfirmButton: false,
                  });
        
                   if(res?.result?.user_detail?.userRoleId == '1'){
                    navigate(constant?.routes?.admin?.userList) 
                   }
                   else{
                    navigate(constant?.routes?.user?.playGame)
                   }
                
               }
               else{
                   failedToast(res.error)
               }
           })
           .catch((error)=>{
              setLoader(false)
              failedToast(error)
           })
    }


    return (
        <div className="container d-flex justify-content-center align-items-center min-vh-100">
            <form className="p-5 shadow-sm rounded bg-light w-50" onSubmit={(e)=>onSubmit(e)}>
                <h2 className="text-center mb-4">Login</h2>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputEmail1" className="form-label text-start mx-start text-start">Email address</label>
                    <input 
                        type="email" 
                        className="form-control" 
                        id="exampleInputEmail1" 
                        aria-describedby="emailHelp" 
                        placeholder="Enter your email"
                        name={userDet.email.name}
                        value={userDet.email.value}
                        onChange={onChange}
                    />
                    
                </div>
                
                <div className="mb-3">
                    <label htmlFor="exampleInputPassword1" className="form-label text-start">Password</label>
                    <input 
                        type="password" 
                        className="form-control" 
                        id="exampleInputPassword1" 
                        placeholder="Enter your password"
                        name={userDet.password.name}
                        value={userDet.password.value}
                        onChange={onChange}
                    />
                </div>
                
                <div className="d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary w-50">Submit</button>
                </div>
            </form>
            {
                loader && <Loader/>
            }
        </div>
    );
    
    
    
}

export default Login
