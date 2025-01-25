import React, { useState } from 'react'
import { successToast , failedToast } from '../../utils'

function AddUserModel(props) {
    const [userDet , setUserDet] = useState({
           username : {name : 'username' , value : '' , error : '' , isRequired : true},
           email : {name : 'email' , value : '' , error : '' , isRequired : true},
           password : {name : 'password' , value : '' , error : '' , isRequired : true},
           
    })
    

    const onSubmit = async(e)=>{
        e.preventDefault()
         if(isValid(userDet)){
             const model = {
                username : userDet.username.value,
                email : userDet.email.value,
                password : userDet.password.value
             }
             props.toggleLoading(true)
             props.onSubmit(model)
                .then((res)=>{
                    
                    props.toggleLoading(false)
                     if(res.status){
                        successToast("User created successfully !!")
                        setUserDet({
                            username : {name : 'username' , value : '' , error : '' , isRequired : true},
                            email : {name : 'email' , value : '' , error : '' , isRequired : true},
                            password : {name : 'password' , value : '' , error : '' , isRequired : true},
                            
                        })
                        props.onCancel()
                       
                     }
                    else{
                        failedToast("Submission Failed !!")
                    }
                })
                .catch(()=>{
                    props.toggleLoading(false)
                    failedToast("Submission Failed !!")
                })
         }
    }
  
    const onChange = (e)=>{
        const {name , value} = e.target
        setUserDet((prev)=>({
          ...prev ,
          [name] : {...prev[name] , value : value}
        }))
    }

    const isValid = () => {
        let valid = true;
        const updatedUserDet = { ...userDet };

        Object.keys(userDet).forEach((key) => {
          if (userDet[key].isRequired && userDet[key].value.trim() === '') {
            updatedUserDet[key].error = `${userDet[key].name} is required`;
            valid = false;
          } else {
            updatedUserDet[key].error = ''; 
          }
        });
    
        setUserDet(updatedUserDet); 
        return valid;
      };

  const {username , email , password} = userDet
  return (
    <form onSubmit={onSubmit}>
    <div className="col">
      <div className=" mx-auto col-lg-12 form-group">
        <label className="fs--1">Username *</label>
        <input
          type="text"
          className={
            username?.error?.length > 0
              ? "form-control is-invalid fs--1"
              : "form-control fs--1"
          }
          placeholder="Enter username"
          autoComplete="off"
          name='username'
          value={userDet.username.value}
          onChange={onChange}
        />
      </div>
      <div className=" mx-auto col-lg-12 form-group">
        <label className="fs--1">Email *</label>
        <input
          type="text"
          className={
            email?.error?.length > 0
              ? "form-control is-invalid fs--1"
              : "form-control fs--1"
          }
          placeholder="Enter Email"
          autoComplete="off"
          name='email'
          value={email.value}
          onChange={onChange}
        />
      </div>
      <div className=" mx-auto col-lg-12 form-group">
        <label className="fs--1">Password *</label>
        <input
          type="password"
          className={
            password?.error?.length > 0
              ? "form-control is-invalid fs--1"
              : "form-control fs--1"
          }
          placeholder="Enter password"
          autoComplete="off"
          name='password'
          value={password.value}
          onChange={onChange}
        />
      </div>

    </div>
    <div className=" mt-3 d-flex justify-content-end gap-3 align-items-center">
      <div className="">
        <button
          onClick={props.onCancel}
          type="button"
          className="btn btn-secondary btn-sm btn-block fs--1"
        >
          Cancel
        </button>
      </div>
     
      <div className="">
         <button
          type="submit"
          className="btn btn-primary text-white fw-bold btn-sm btn-sm btn-block fs--1"
        >
          Submit
        </button> 
      </div>
    </div>
  </form>
  )

 

}

export default AddUserModel
