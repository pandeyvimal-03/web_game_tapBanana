import React , {useState} from 'react'
import { successToast , failedToast } from '../../utils'

function EditUserModel(props) {
 const [userDet , setUserDet] = useState({
            username : {name : 'username' , value : props?.userDet?.USERNAME , error : '' , isRequired : true},
            email : {name : 'email' , value : props?.userDet?.EMAIL , error : '' , isRequired : true},
            status : {name : 'status' , value : props?.userDet?.STATUS , error : '' , isRequired : true},
            
     })
    
      const onSubmit = (e)=>{
          e.preventDefault()
         
              if(isValid(userDet)){
                  const model = {
                     player_id : props?.userDet?._id,
                     username : userDet.username.value,
                     email : userDet.email.value,
                     status : userDet.status.value
                  }
                  props.toggleLoading(true)
                  props.onSubmit(model)
                     .then((res)=>{
                         props.toggleLoading(false)
                          if(res.status){
                             setUserDet({
                                 username : {name : 'username' , value : '' , error : '' , isRequired : true},
                                 email : {name : 'email' , value : '' , error : '' , isRequired : true},
                                 status : {name : 'status' , value : '' , error : '' , isRequired : true},
                                 
                             })
                            successToast(" updated successfully !!")
                            props.onCancel()
                          }
                         else{
                             failedToast("updation Failed !!")
                         }
                     })
                     .catch(()=>{
                         props.toggleLoading(false)
                         failedToast("updation Failed !!")
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
           if (userDet[key].isRequired && userDet[key].value === '') {
             updatedUserDet[key].error = `${userDet[key].name} is required`;
             valid = false;
           } else {
             updatedUserDet[key].error = ''; 
           }
         });
     
         setUserDet(updatedUserDet); 
         return valid;
       };
 
   const {username , email , status} = userDet
   return (
     <form onSubmit={(e)=>onSubmit(e)}>
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
           name='email'
           value={email.value}
           onChange={onChange}
         />
       </div>
       <div className=" mx-auto col-lg-12 form-group">
         <label className="fs--1">Status *</label>
         <select
            className={
              status?.error?.length > 0
                ? "form-select form-control is-invalid fs--1"
                : "form-select form-control fs--1"
            }
            name="status"
            value={status.value}
            onChange={onChange}
          >
            <option value="">Select Status</option>
            <option value="1">Active</option>
            <option value="0">Blocked</option>
          </select>
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

export default EditUserModel
