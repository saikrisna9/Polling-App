import React from "react";
import AuthLayout from "../../components/Layout/AuthLayout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfilePhotoSelector from "../../components/Input/ProfilePhotoSelector";
import AuthInput from "../../components/Input/AuthInput.jsx";
import { Link } from "react-router-dom";
import { validateEmail } from "../../utils/helper.js";
import axiosInstance from "../../utils/axiosInstance.js";
import { API_PATHS } from "../../utils/apiPaths.js";
import uploadImage from "../../utils/uploadImage.js";
import { UserContext } from "../../context/UserContext.jsx";
import { useContext } from "react";

const SignUpform = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState(null);
  
  const{updateUser} = useContext(UserContext)

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl=""

    if(!validateEmail(email)){
      setError("Please Enter a valid email address");
      return;
    }
    if(!fullName){
      setError("Please enter Fullname")
      return;
    }
    if(!username){
      setError("Please enter Username")
      return;
    }
    if(!password){
      setError("Please Enter the password");
      return;
    }
    setError("")
    try {
      
      if(profilePic){
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl =imgUploadRes.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        username,
        email,
        password,
        profileImageUrl
      })
      const {token,user} =response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard")
      }
    } catch (error) {
      if(error.response && error.response.data.message){
        setError(error.response.data.message)
      }else{
        setError("Something went wrong. Please try again")
      }
      
      
    }
  };
  return (
    <div>
      <AuthLayout>
        <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-10 flex flex-col justify-center">
          <h3 className="text-xl font-semibold text-black">
            Create An Account
          </h3>
          <p className="text-xs text-slate-700 mt-[5px] mb-6">
            Join Us today by entering your details below
          </p>
          <form onSubmit={handleSignUp}>
            <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <AuthInput
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
              />
              <AuthInput
                value={email}
                onChange={({ target }) => setEmail(target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="text"
              />

              <AuthInput
                value={username}
                onChange={({ target }) => setUsername(target.value)}
                label="Username"
                placeholder="john"
                type="text"
              />

              <AuthInput
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="Min 8 Charcaters"
                type="password"
              />
            </div>
            {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              CREATE ACCOUNT
            </button>

            <p className="text-[13px] text-slate-800 mt-3">
             Already have an Account?{" "}
              <Link className="font-medium text-primary underline" to="/login">
                Login
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </div>
  );
};

export default SignUpform;
