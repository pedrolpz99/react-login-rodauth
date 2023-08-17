
import axios from 'axios';
import React, { useState } from 'react';
import lscache from 'lscache';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailnameChange = (e) => {
      setEmail(e.target.value);
    };
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleLogin = async() => {
        try {
            const response = await axios.post('http://localhost:3002/login', {
                email: email,
                password: password,
              });
        
              if (response.status === 200){
                lscache.set("token", response.data.access_token)
                lscache.set("refresh-token", response.data.refresh_token)   
                     
              }
            
            
        } catch (error) {
         console.log(error)   
        }
    };

return(
    <>
     <h1>Bienvenido</h1>
     
        <div>
          <input
            type="text"
            placeholder="Nombre de usuario"
            value={email}
            onChange={handleEmailnameChange}
          />
          <br />
          <input
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={handlePasswordChange}
          />
          <br />
          <button onClick={handleLogin}>Iniciar sesión</button>
        </div>
 
    </>
  
)
 }

export default Login