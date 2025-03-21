import { PasswordStrength } from "../Components/Inputs/Password";
import { AutocompleteLoading } from "../Components/Inputs/Input";
import { useState } from "react";
import axios from "axios";
import "./signup.css"; // Importing external CSS
import { NavLink, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { login } from "../AuthState/AuthSlice"; 
export default function Signup({toggleForm}) {
const Navigate = useNavigate();
const dispatch = useDispatch();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "Job Seeker" // Default role
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:5000/v1/signup",{
        name:data.name,
        email:data.email,
        password:data.password,
        role: data.role // Include role in the request
    })
    .then(response=>{
        if(response.data.success==true){
          axios.post("http://localhost:5000/v1/login",{
            email:data.email,
            password:data.password,
            role: data.role // Include role in login request
          })
          .then(response=>{
            dispatch(login({
              user: response.data.data._id,
              role: response.data.data.role
            }));
            Navigate('/');
          })
          .catch(error=>{
            alert("Account Created Pls Login");
          })
        }
        else{
            alert("Signup Failed Try Again");
        }
    })
    .catch(error=>{
        alert("Signup Failed Try Again");
    })
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2 className="signup-title">Sign Up</h2>

        <form onSubmit={handleSubmit} className="signup-form">
          <div className="form-group">
            <label className="form-label">Name</label>
            <AutocompleteLoading
              name="name"
              placeholder="Enter Your Name"
              value={data.name}
              onChange={handleChange}
              className="form-input"
            />
          </div>

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
            Sign Up
          </button>
        </form>
        <p>if Already have Account? <button style={{ all: "unset", cursor: "pointer" }} onClick={toggleForm}>Log IN</button></p>
      </div>
    </div>
  );
}
