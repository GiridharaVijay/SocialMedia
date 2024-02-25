import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import './Login.css'
import { useUser } from './Context';


function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [bio,setBio] = useState('');
  const [email,setEmail] = useState('');
  const [profilePic,setProfilePic] = useState('');
  const [login,setLogin] = useState(true);
  const Navigate = useNavigate();
  const {user, updateUser,isLogin,checkLogin} = useUser();
  const handleLogin =async (e) => {
    e.preventDefault();
    try{
     await axios.get('http://localhost:8000/api/v1/socialMedia/Account').then((res)=>{
     console.log(res);
     console.log("Data Retrieved");
     const user = res.data.find(u => u.userName === username && u.password === password);
      console.log(user)
     if (user) {
       console.log('Login successful');
       // Navigate to another page after successful login
       console.log(user._id)
       updateUser(user);
       checkLogin(true);
       Navigate(`/posts/${user._id}`); // Change '/dashboard' to your desired route
     } else {
       console.log('Invalid username or password');
     }
   })
    }catch(error){
     console.error(error);
    }
  };
  const handleSignUp = async(e)=>{
     e.preventDefault();
     try{
      await axios.post('http://localhost:8000/api/v1/socialMedia/Account',{
        userName : username,
        email: email,
        bio: bio,
        profileImage: profilePic,
        password: password
    }).then((res)=>{
      console.log(res);
      console.log("Account Created Successfully");
      setLogin(true);
    })
     }catch(error){
      console.error(error);
     }
     
  }
  return (
    <div className='fullPage-login'>
      <div className='navbar'>
        <div className='navbar-heading'>Social Hub</div>
      </div>
      {
        login ? (
          <div className="login-box">
          <h2>Login</h2>
          <div>
            <div className="input-group ">
              <div className='field-login' htmlFor="username">Username:</div>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="input-group">
              <div className='field-login' htmlFor="password">Password:</div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className='button-login' type="button" onClick={handleLogin}>
              Login
            </button>
            <div className='noAcc'>
              <div>Don't have an account?</div><div onClick={()=>setLogin(false)} className='signButton'>Sign up</div>
            </div>
          </div>
        </div>
        ):(
          <div className="login-box signup-box">
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
            className='text-area1'
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            // rows="4" cols="50"
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
        
        <button className='button-login' type="button" onClick={handleSignUp}>
          Sign Up
        </button>
        <div className='noAcc'>
          <div>Already have an account?</div><div onClick={()=>setLogin(true)} className='signButton'>Login</div>
        </div>
      </div>
      </div>
    </div>
        )
      }
      
    </div>
  )
}

export default Login
