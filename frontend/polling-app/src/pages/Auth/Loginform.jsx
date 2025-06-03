import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import AuthLayout from "../../components/Layout/AuthLayout"
import AuthInput from '../../components/Input/AuthInput';
import { Link } from 'react-router-dom';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { UserContext } from '../../context/UserContext';



const Loginform = () => {

  const [email,setEmail] =useState("");
  const [password,setPassword] =useState("");
  const [error,setError] =useState(null);

  const{updateUser} = useContext(UserContext)

  const Navigate =useNavigate();
  
  const handleLogin=async(e)=>{
    e.preventDefault();
    if(!validateEmail(email)){
      setError("Please Enter a valid email address");
      return;
    }
    if(!password){
      setError("Please Enter the password");
      return;
    }
    setError("")

    try {
      const response =await axiosInstance.post(API_PATHS.AUTH.LOGIN,{
        email,
        password
      });
      const {token,user} = response.data

      if(token){
       localStorage.setItem("token",token);
       updateUser(user)
       Navigate("/dashboard")
        
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Something went wrong. Please try again")
      }
      
    }
  }

  return (
    <AuthLayout>
    <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center'>
        <h3 className='text-xl font-semibold text-black'>Welcome Back</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb=6'>Please Enter Your Details To Login</p>
      
      <form onSubmit={handleLogin}>
        <AuthInput  value={email}
        onChange={({target})=>setEmail(target.value)}
        label="Email Address" 
        placeholder ="john@example.com"
        type="text"/>


        <AuthInput 
         value={password}
        onChange={({target})=>setPassword(target.value)}
        label="Password" 
        placeholder ="Min 8 Charcaters"
        type="password"/>
       

       {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

       <button type='submit'className='btn-primary'>
       LOGIN
       </button>

       <p className='text-[13px] text-slate-800 mt-3'>
        Don't have an Account?{" "}
        <Link className="font-medium text-primary underline" to="/signup">
        SignUp
        </Link>
       </p>
   
        </form>
       </div>
    </AuthLayout>
  )
}

export default Loginform
