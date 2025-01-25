import React, { useEffect, useState } from 'react'
import Header from '../common/Header';
import Loader from '../common/Loader';
import ModelWindow from '../common/ModelWindow';
import AddUserModel from './AddUserModel';
import EditUserModel from './EditUserModel';
import { createUser, updateUser , loadUserList } from '../../actions';
import { failedToast } from '../../utils';

function UserList() {
  const [loader, setLoader] = useState(false)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setEditModal] = useState(false)
  const [userList, setUserList] = useState([])
  const [editItem, setEditItem] = useState(null)

  
 const loadList = async()=>{
    loadUserList()
       .then((res)=>{
          if(res.status){
             setUserList(res.result)
          }
          else{
            failedToast("Failed To Load User List")
          }
       })
       .catch(()=>{
           failedToast("Failed To Load User List")
       })
  }

  const toggleShowAddModal = () => {
    setShowAddModal(!showAddModal)
  }

  const toggleEditModel = () => {
    setEditModal(!showEditModal)
  }

  const onAddSubmit = async (modal) => {
    return  createUser(modal)
      .then((res) => {
        if (res.status) {
          setUserList(res.result)
        }
        
        return res
      })
      .catch(() => {
        return false
      })
  }
  const onEditItem = (item) => {
    setEditItem(item)
    setEditModal(true)
  }
  const onEditSubmit = async(model) => {
    return updateUser(model)
      .then((res) => {
        if (res.status) {
          setUserList(res.result)
        }
        return res
      })
      .catch(() => {
        return false
      })
  }

  const onAddCancel = () => {
     setShowAddModal(false)
  }

  const onEditCancel = () => {
     setEditModal(false)
  }

  const toggleLoading = (bool) => {
    setLoader(bool)
  }

  useEffect(()=>{
    loadList()
 } , [])


  return (
    <div>
      <Header />
      <div className='container my-4'>
        {
          showAddModal && <ModelWindow
            className="modal-lg"
            title="Add User"
            backdrop="static"
            toggleModal={toggleShowAddModal}
          >
            <AddUserModel
              onSubmit={onAddSubmit}
              onCancel={onAddCancel}
              toggleLoading={toggleLoading}
            />

          </ModelWindow>
        }
        {
          showEditModal && editItem && <ModelWindow
            className="modal-lg"
            title="Edit User"
            backdrop="static"
            toggleModal={toggleEditModel}
          >
            <EditUserModel
              onCancel={onEditCancel}
              onSubmit={onEditSubmit}
              userDet={editItem}
              toggleLoading={toggleLoading}
            />
          </ModelWindow>
        }

        {
          loader && <Loader />
        }

        <div className='card px-4 mb-2'>
          <h2 className='text-gray fw-bold fs-4 rounded-sm py-2'>Users</h2>
        </div>
        <div className='d-flex justify-content-end'>
          <a href='' onClick={() => toggleShowAddModal()} className="btn border bg-white btn-falcon-default  text-gray btn-sm mb-2">
            <i className="fas fa-plus-circle mr-4 px-2"></i>
            New User
          </a>
        </div>
        <div>
          <table class="table  w-100 text-center">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Username</th>
                <th scope="col">Email</th>
                <th scope="col">Status</th>
                <th scope="col">Edit</th>
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
                      <td><i className="fas fa-edit text-gray cursor-pointer" style={{ cursor: "pointer" }} onClick={() => onEditItem(item)}></i></td>
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




export default UserList
