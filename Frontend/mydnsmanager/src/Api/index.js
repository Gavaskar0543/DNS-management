import { ApiUrls } from "../Utils";
const customFetch = async (url, { body, token, ...customConfig }) => {
    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...customConfig.headers
    };
  
    // Include token in headers if it exists
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    const config = {
      ...customConfig,
      headers: headers
    };
    
    if (body) {
      let formBody = new URLSearchParams();
      for (const key in body) {
        formBody.append(key, body[key]);
      }
      config.body = formBody.toString();
    }
    
    try {
      const response = await fetch(url, config);
      const data = await response.json();
      
      if (response.ok) {
        return {
          data: data,
          success: true
        };
      }
      
      throw new Error(data.message);
    } catch (error) {
      return {
        message: 'internal server error',
        success: false
      };
    }
  };
  

 export const requestNewUserAccount = (user) =>{
return customFetch(ApiUrls.createUserAccount,{
    method:'POST',
    body:{
        username:user.username,
        email:user.email,
        password:user.password
    }
})
  }