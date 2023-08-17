import React, { useEffect,useState } from 'react'
import axios from 'axios'
import lscache from 'lscache';


const Articles = (second) => {

  const [getData, setGetdata] = useState();

  const  getArticles = async() =>{
    try {
      const access_token = lscache.get("token")
    
      const config = {
        headers: { Authorization: `Bearer ${access_token}` },
        params: {
          email: "user@example.com",
          password: "password1234"
        }
      };

        const response = await axios.get('http://localhost:3002/somedata/index', config);

      setGetdata(response.data)
    } catch (error) {
      console.error('Error al intentar pedido', error);
  }
    };

   useEffect(()=>{
         getArticles();
   })

  
  return (
  <>
    <p>articles</p>
    {getData}
  </>)
 }

export default Articles