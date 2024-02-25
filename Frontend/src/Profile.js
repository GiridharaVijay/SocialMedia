import React from "react"
import { useUser } from "./Context"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDeleteLeft, faEdit, faMagnifyingGlass, faTrash} from '@fortawesome/free-solid-svg-icons'
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import './Profile.css'
function Profile({pageNo,setPageNo}) {
    const {user,updateUser,checkLogin} = useUser();
    const Navigate = useNavigate()
    console.log(user.profileImage)
    const handleDelete = async () => {
      try {
        await axios.delete(`http://localhost:8000/api/v1/socialMedia/Account/${user._id}`, {
          params: {
            userName: user.userName
          }
        });
    
        console.log("Account Deleted Successfully");
        updateUser({});
        checkLogin(false);
        Navigate('/');
      } catch (error) {
        console.error("Error deleting account", error);
        // Handle error appropriately, e.g., show an error message to the user
      }
    };
    
  return (
    <div>
      <div className="user-profile-container">
        <img className="user-profile-image" src={user.profileImage}></img>
      </div>
      <div className="userHeading-Profile">{user.userName}</div>
      <div className="userDetails-profile">Bio: {user.bio}</div>
      <div className="userDetails-profile">Email: {user.email}</div>
      <div className="icons-flex">
        <div className="icons-profile"><FontAwesomeIcon onClick={()=>setPageNo(3)} icon={faEdit} size="xl"/></div>
        <div className="icons-profile"><FontAwesomeIcon onClick={handleDelete} icon={faTrash} size="xl"/></div>
      </div>
    </div>
  )
}

export default Profile
