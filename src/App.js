import React from 'react';
import { BrowserRouter as Router, Route, Routes,Navigate,Link } from 'react-router-dom';
import lscache from "lscache";
import jwt_decode from "jwt-decode";
import './App.css';
import Articles from './pages/articles';
import Login from './login';


const  isTokenValid = () =>{
  const lscache_token = lscache.get("token");
  const decodedToken = jwt_decode(lscache_token);
  const time = Date.now() / 1000;
  const currentTime = Math.floor(time);

  console.log(currentTime)
  console.log(decodedToken.exp)
  if ( decodedToken.exp >= currentTime) {
    return true;
  } else {
    return true;
  }

};

console.log(isTokenValid())

function App() {
 
  return (
    <div className="App">
         <h1>Rodauth</h1>
         <Router>
           <Routes>
              <Route path="/" element={<Layout/>}/>
              <Route  path="/login" element={<Login/>} />
               <Route
            path="/articles"
            element={isTokenValid() ? <Articles /> : <Navigate to="/login" />}/>
          </Routes>
         </Router>
      

    </div>
  );
}

function Layout() {
  return(
<div>
<nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/articles">Articles</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/logout">Logout</Link>
          </li>
        </ul>
      </nav>
</div>
  )
  
}

export default App;
