import {BrowserRouter as Router,Switch ,Route, Routes} from 'react-router-dom';
import './App.css';
import Login from './Login';
import Posts from './Posts';
function App() {
  return (
    <div className="App">
      <Router>
          <Routes>
            <Route path="/" element={<Login/>}> </Route>
            <Route path="/Posts/:id" element={<Posts/>}> </Route>
            {/* <Route path='/rooms/:id/edit/:id2' element={<Edit/>}></Route>
            <Route path="/rooms/:id/delete/:id2" element={<Delete/>}> </Route> */}
            {/* <Route path="/addChat" element={<New listRoom={{ rooms, setRooms }}/>}></Route> */}
            {/* <Route path="/home" element={<Home/>}></Route>
            <Route path="/contact" element={<ContactForm/>}></Route> */}
          </Routes>
        </Router>
    </div>
  );
}

export default App;
