import React,{useState} from 'react'
import './Posts.css'
import Sidebar from './Sidebar'
import Explore from './Explore'
import Profile from './Profile'
function Posts() {
    const [pageNo, setPageNo] = useState(0);

  return (
    <div>
      <div class="flex">
  <div class="sidebar">
    <Sidebar pageNo={pageNo} setPageNo={setPageNo}/>
  </div>
  <div class="posts-container">
   <Explore pageNo={pageNo} setPageNo={setPageNo}/>
  </div>
  <div class="profile-container">
    <Profile pageNo={pageNo} setPageNo={setPageNo}/>
  </div>
</div>
    </div>
  )
}

export default Posts
