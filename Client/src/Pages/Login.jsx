import { PasswordStrength } from "../Components/Inputs/Password";
import { AutocompleteLoading } from "../Components/Inputs/Input";
import { useState } from "react";
import axios from "axios";
import "./signup.css"; // Importing external CSS
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../AuthState/AuthSlice"; 
export default function Login({toggleForm}) {
const Navigate = useNavigate();
const dispatch = useDispatch();
  const [data, setData] = useState({
    email: "",
    password: "",
    role: "Job Seeker" // Default role
  });
const handleChange=(e)=>{
    setData({...data,[e.target.name]:e.target.value});
}
const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post("http://localhost:5000/v1/login",{
        email:data.email,
        password:data.password,
        role: data.role // Include role in the request
    })
    .then(response=>{
        if(response.data.success==true){
            dispatch(login({
                user: response.data.data._id,
                role: response.data.data.role
            }));
            Navigate('/');
        }
        else{
            alert(response.data.message);
        }
    })
    .catch(error=>{
        alert("Failed to Login");
    })
}
  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Log In</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Email</label>
            <AutocompleteLoading
              name="email"
              placeholder="Enter Your Email"
              value={data.email}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <select
              name="role"
              value={data.role}
              onChange={handleChange}
              className="form-input"
            >
              <option value="Job Seeker">Job Seeker</option>
              <option value="Employer">Employer</option>
            </select>
          </div>
          
          <div className="form-group">
            <PasswordStrength
              name="password"
              value={data.password}
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <button type="submit" className="submit-button">
            LogIn
          </button>
        </form>
        <p>Create New Account: <button onClick={toggleForm} style={{ all: "unset", cursor: "pointer" }}>Sign Up</button></p>
      </div>
    </div>
  );
}
