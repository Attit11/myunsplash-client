import axios from "axios";
import React, { useState } from "react";
import { apiUrl } from "../config/apiUrl";
import { useNavigate } from "react-router-dom";

function SignUpScreen({setAuthToken, authToken}) {
    const [formData, setFormData] = useState({
        name: "",
        age: 0,
        email:"",
        password:""
    })
    const navigate = useNavigate()
    const handleSubmit = async(event) =>{
        try {
            event.preventDefault();
            // setLoading(true)
            const user = await axios.post(`${apiUrl}/user`, {...formData});
        
            localStorage.setItem("authToken", user.data.token);
            setAuthToken(user.data.token)
            navigate("/");
          } catch (e) {
            console.log({ e });
          }

    }
    const handleChange = (name, e) =>{
        setFormData(prev=> {
            return {...prev, [name]: e.target.value}
        })
    }
  return (
    <div>
      <nav class="container-fluid">
        <ul>
          <li>
            <a href="./" class="contrast" onclick="event.preventDefault()">
              <strong>My unsplash App</strong>
            </a>
          </li>
        </ul>
      </nav>

      <main class="container">
        <article class="grid">
          <div>
            <hgroup>
              <h1>Sign up</h1>
              <h2>A great app to upload your pictures</h2>
            </hgroup>
            <form onSubmit={handleSubmit} method="post">
              <input
                type="text"
                name="name"
                placeholder="Name"
                aria-label="Name"
                onChange={(e)=> handleChange("name", e)}
                //   autocomplete="nickname"
                required
              />
              <input
                type="text"
                name="email"
                placeholder="Email"
                aria-label="Email"
                //   autocomplete="nickname"
                onChange={(e)=> handleChange("email", e)}
                required
              />
              <input
                type="text"
                name="age"
                placeholder="Age"
                aria-label="Age"
                onChange={(e)=> handleChange("age", e)}
                //   autocomplete="nickname"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                aria-label="Password"
                onChange={(e)=> handleChange("password", e)}
                // autocomplete="current-password"
                required
              />
              <button
                type="submit"
                class="contrast"
                onclick="event.preventDefault()"
              >
                Sign Up
              </button>
              <hgroup>
                <h6>Already have an account? Login</h6>
              </hgroup>
            </form>
          </div>
          {/* <div></div> */}
        </article>
      </main>
    </div>
  );
}

export default SignUpScreen;
