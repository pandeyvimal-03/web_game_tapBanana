import React from 'react'
import { Link } from 'react-router-dom'
import '../../assets/css/App.css'
import { getStorage , removeAllLocalStorge} from '../../utils'
import constant from '../../constant'

function Header() {
    const ud = getStorage(constant.keys.userDetail)
    const isAdmin = ud?.userRoleId == 1 ? true : false
   
    const handleLogout = () => {
        removeAllLocalStorge()
        
        window.location.href = '/login'
    }

    return (
        <div className='header container-fluid shadow-sm'>
            <div className='container mx-auto row'>
                <div className='col-4 py-4 fw-bold fs-4'>
                    Tap#Banana
                </div>
                <div className='col-8 py-4'>
                    <ul className='d-flex justify-content-end list-unstyled'>
                        {
                            isAdmin &&
                            (<li className='mx-4'>
                                <Link className='text-decoration-none fw-bold ' to={constant.routes.admin.userList}>Users</Link>
                            </li>)
                        }

                        <li className='mx-4'>
                            <Link className='text-decoration-none fw-bold' to={constant.routes.user.playGame}>Playground</Link>
                        </li>

                        <li className='mx-4'>
                            <Link className='text-decoration-none fw-bold' to={constant.routes.user.ranking}>Ranking</Link>
                        </li>
                        
                        <li className='mx-4 dropdown'>
                            <a 
                              className='text-decoration-none fw-bold dropdown-toggle' href="" id="usernameDropdown" 
                              data-bs-toggle="dropdown" 
                              aria-expanded="false"
                              >
                                {ud?.username}
                            </a>
                            <ul className="dropdown-menu text-black" aria-labelledby="usernameDropdown">
                                <li className='dropdown-item'>
                                    <a className="text-decoration-none" href="" onClick={handleLogout}>
                                        Log Out
                                    </a>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Header
