import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faHouse, faMoneyBill, faPlus, faQuoteLeft, faRightFromBracket, faUserPlus, faWindowRestore } from '@fortawesome/free-solid-svg-icons';
import { useUser } from './Context';
import './Sidebar.css'
import {useNavigate} from 'react-router-dom'



function Sidebar({ setPageNo, pageNo }) {
  

  const Navigate = useNavigate();
 

  const { updateUser, checkLogin } = useUser();

  const handleLogout = () => {
    updateUser({});
    checkLogin(false);
    Navigate('/')
  };

  const handlePage = (index) => {
    setPageNo(index);
  };

  return (
   <div>
       <div className='Sidebar-heading'>
            Social Hub
       </div>
       <div>
        <div><div onClick={()=>handlePage(0)} className='sidebar-buttons'><FontAwesomeIcon icon={faHouse}/><div className='sidebar-text'>Home</div></div></div>
        <div><div onClick={()=>handlePage(1)} className='sidebar-buttons'><FontAwesomeIcon icon={faPlus}/><div className='sidebar-text'>Create</div></div></div>
        <div><div onClick={handleLogout} className='sidebar-buttons'><FontAwesomeIcon icon={faRightFromBracket}/><div className='sidebar-text'>Logout</div></div></div>
       </div>
   </div>
  );
}

export default Sidebar;
