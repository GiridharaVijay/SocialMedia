import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDeleteLeft, faEdit, faMagnifyingGlass, faTrash} from '@fortawesome/free-solid-svg-icons'
import './Explore.css'
import axios from 'axios'
import { useUser } from './Context';
const Explore = ({pageNo,setPageNo}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState([]);
  const [content,setContent] = useState('');
  const [imageURL,setImageURL] = useState('');
  const [flagPost,setFlagPost] = useState(false);
  const [msgID,setMsgId] = useState('');
  const [popup,setPopup] = useState(false);
  const [popupInfo,setPopupInfo] = useState('');

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio,setBio] = useState('');
  const [email,setEmail] = useState('');
  const [profilePic,setProfilePic] = useState('');
  const [login,setLogin] = useState(true);

  const {user,updateUser} = useUser()
  useEffect(()=>{
    fetchPosts()
  },[flagPost])

  const fetchPosts = async ()=>{
    await axios.get('http://localhost:8000/api/v1/socialMedia/posts').then((res)=>{
      console.log(res.data);
      setPosts(res.data)
    })
  }
  
  const handlePost =async (e)=>{
        e.preventDefault();
        await axios.post('http://localhost:8000/api/v1/socialMedia/posts',{
          message : content,
          imgUrl : imageURL,
          userName : user.userName,
          timestamp: new Date().toLocaleString()
        }).then((res)=>{
          console.log("Post Created Successfully");
          setFlagPost(!flagPost);
          setPopup(true);
          setPopupInfo("Post Created Successfully");
          setContent('');
          setImageURL('');
        })
  }

  const handleDelete =async (msgId)=>{
      console.log(msgId)
      await axios.delete(`http://localhost:8000/api/v1/socialMedia/posts/${msgId}`).then((res)=>{
            console.log("Post Deleted");
            console.log(res)
            setFlagPost(!flagPost);
            setPopup(true);
            setPopupInfo("Post Deleted Successfully");
      })
  }

  const handleEdit = async (message)=>{
      setContent(message.message);
      setImageURL(message.imgUrl);
      setMsgId(message._id);
      setPageNo(2);
      
  }

  const handleUpdateAcc = async ()=>{
      await axios.put(`http://localhost:8000/api/v1/socialMedia/Account/${user._id}`,{
        userName : username,
        email: email,
        bio: bio,
        profileImage: profilePic,
        password: password
      }).then((res)=>{
        console.log("Account Updated Successfully");
        setPopup(true);
        setPopupInfo("Account Updated Successfully");
        setPageNo(0);
        console.log(res.data);
      })
  }

  const handleUpdate =async (e)=>{
      e.preventDefault();
      await axios.put(`http://localhost:8000/api/v1/socialMedia/posts/${msgID}`,{
          message : content,
          imgUrl : imageURL,
          userName : user.userName,
          timestamp: new Date().toLocaleString()
      }).then((res)=>{
        console.log("Post Updated");
        setFlagPost(!flagPost);
        setPopup(true);
        setPopupInfo("Post Updated Successfully");
        setPageNo(0);
        setContent('');
        setImageURL('');
      })
  }

  return (
    <div>
      {
        pageNo == 0 &&
        <div>
        <div className="explore-section">
        <div className='serach-icon'><FontAwesomeIcon size='xl' icon={faMagnifyingGlass} /></div>
        <input type="text" className="myInput" value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)} placeholder="Search for names.." title="Type in a name"></input>
       </div>
       <div className='chat_body'>
         {posts
           .filter((post) =>
             post.userName.toLowerCase().includes(searchTerm.toLowerCase())
           )
           .map((message) => (
             <div>
             <p className={`chat_message`}>
               <div className='chat_name_posi'><span className='chat_name'>{message.userName}</span></div>
               <div>{message.message}</div>
               <div>
               {message.imgUrl &&  <img className='msgImage' src={message.imgUrl}></img>}
              
               </div>
               <div className='position'>
                 <span className='chat_timestamp'>
                 {message.timestamp}
               
                 </span>
                 {
                   message.userName === user.userName && (
                       <div className='position2'>
                         <div className='delete'>
                           <FontAwesomeIcon size='xl' onClick={()=>handleEdit(message)} icon={faEdit}/>
                         </div>  
                         <div className='delete'>  <FontAwesomeIcon size='xl' onClick={()=>handleDelete(message._id)}  icon={faTrash}/></div>
                       </div>
                   )
                   
                 }
                 
               </div>
              
               </p>
             </div>
           
           ))}
       </div>
       </div>
      }
       
       {
        pageNo == 1 &&
        <div className="post-box">
        <h2 className='post-heading'>Create Post</h2>
        <div>
          <div className="input-group ">
            <div className='field-login' htmlFor="username">Content:</div>
            <textarea
          type="text"
          id="username"
          className='text-area'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
          </div>
          <div className="input-group">
            <div className='field-login' htmlFor="password">Image URL:</div>
            <input
              type="text"
              id="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <button className='button-login' type="button" onClick={handlePost} >
            Create Post
          </button>
        </div>
      </div>
       }


{
        pageNo == 2 &&
        <div className="post-box">
        <h2 className='post-heading'>Update Post</h2>
        <div>
          <div className="input-group ">
            <div className='field-login' htmlFor="username">Content:</div>
            <textarea
          type="text"
          id="username"
          className='text-area'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
          </div>
          <div className="input-group">
            <div className='field-login' htmlFor="password">Image URL:</div>
            <input
              type="text"
              id="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <button className='button-login' type="button" onClick={handleUpdate} >
            Update Post
          </button>
        </div>
      </div>
       }

{
        pageNo == 3 &&
        <div className="post-box">
        <h2 className='post-heading'>Update Account</h2>
        <div>
        <div className="input-group">
            <div className='field-login' htmlFor="password">User Name:</div>
            <input
              type="text"
              id="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className='field-login' htmlFor="password">Email:</div>
            <input
              type="text"
              id="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-group ">
            <div className='field-login' htmlFor="username">Bio:</div>
            <textarea
          type="text"
          id="username"
          className='text-area2'
          value={bio}
          onChange={(e) => setBio(e.target.value)}
        />
          </div>
          <div className="input-group">
            <div className='field-login' htmlFor="password">Profile URL:</div>
            <input
              type="text"
              id="text"
              value={imageURL}
              onChange={(e) => setImageURL(e.target.value)}
            />
          </div>
          <div className="input-group">
            <div className='field-login' htmlFor="password">Profile URL:</div>
            <input
              type="password"
              id="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className='button-login' type="button" onClick={handleUpdateAcc} >
            Update Account
          </button>
        </div>
      </div>
       }

       
        
        {
          popup && (
            <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className='bg-white p-10 text-black rounded'>
                <h1 className='font-sans font-extrabold text-2xl'>{popupInfo}</h1>
                <button className='bg-green-600 rounded p-2 pl-4 pr-4 font-bold ml-24 mt-5 ' onClick={()=>{setPopup(false)}}>Okay</button>
              </div>
            </div>
          )
        }
       



       {/* <div className="login-box signup-box">
        <h2>Sign Up</h2>
          <div className='flex-signup'>
            <div >
        <div className="input-group input-group-signup">
          <div className='field-login' htmlFor="username">Username:</div>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="input-group input-group-signup">
          <div className='field-login' htmlFor="username">Email:</div>
          <input
            type="text"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group input-group-signup">
          <div className='field-login' htmlFor="username">Bio:</div>
          <textarea
            type="text"
            id="username"
            className='text-area'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            // rows="4" cols="58"
          />
          </div>
          </div>
          <div className='margin-left'>
          <div className="input-group input-group-signup">
          <div className='field-login' htmlFor="username">Profile Image:</div>
          <input
            type="text"
            id="username"
            value={profilePic}
            onChange={(e) => setProfilePic(e.target.value)}
          />
        </div>
        
        <div className="input-group input-group-signup">
          <div className='field-login' htmlFor="password">Password:</div>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        
        <button className='button-login' type="button">
          Sign Up
        </button>
        <div className='noAcc'>
          <div>Already have an account?</div><div onClick={()=>setLogin(true)} className='signButton'>Login</div>
        </div>
      </div>
      </div>
    </div> */}


    </div>
  );
};

export default Explore;
