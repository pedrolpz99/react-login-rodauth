import axios from 'axios';
import lscache from 'lscache';

export const AxiosInterceptor = () => {
  const  refreshAccessToken = async() =>{
    const refresh_token = lscache.get("refresh-token")
    const access_token = lscache.get("token")
    console.log(refresh_token)
    console.log("old access token" +access_token)
    const config = {
      headers: { Authorization: `Bearer ${access_token}` }
    };
    try {
      const response = await axios.post('http://localhost:3002/jwt-refresh',{
        refresh_token
      },config)
      const newAccessToken = response.data.access_token;
      return newAccessToken;
    } catch (error) {
        console.error('Error al refrescar el token:', error);
    }
  };
  
  axios.interceptors.response.use((response) => {
      return response;
    },
    async (error) => {
      const originalRequest = error.config;
  
      console.log(originalRequest);
      console.log(error.response)
      if (error.response.status === 400) {

        try {
          const newAccessToken = await refreshAccessToken();
          if (newAccessToken) {
            console.log("dentro de new acces token")
            lscache.remove('token');
            lscache.set('token', newAccessToken);
            axios.defaults.headers['Authorization'] = `Bearer ${newAccessToken}`;
            return axios(originalRequest.url);
          }
        } catch (refreshError) {
          throw refreshError;
        }
      }
  
      return Promise.reject(error);
    }
  );
  
  


}

 