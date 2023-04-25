import axios from "axios";
import React, { useEffect, useState } from "react";
import { apiUrl } from "../config/apiUrl";
import { useNavigate } from "react-router-dom";

function LoginScreen({setAuthToken, authToken}) {
    const [loading, setLoading] = useState(false)
    const [formData, setFormData] = useState({
        email:"",
        password:""
    })
    
    const navigate = useNavigate()
    const handleSubmit = async(event) =>{
        event.preventDefault()
        try {
            setLoading(true)
            const user = await axios.post(`${apiUrl}/user/login`);
            localStorage.setItem("authToken", user.data.token);
            setAuthToken(user.data.token)
            navigate("/");
            setLoading(false)
          } catch (e) {
            console.log({ e });
            
            setLoading(false)
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
              <h1>Sign in</h1>
              <h2>A great app to upload your pictures</h2>
            </hgroup>
            <form onSubmit={handleSubmit} method="post">
              <input
                type="text"
                name="email"
                placeholder="Email"
                aria-label="Email"
                onChange={(e)=> handleChange("email", e)}

                // autocomplete="nickname"
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
              {console.log("Loading", loading)}
              <button
              // eslint-disable-next-line jsx-a11y/aria-proptypes
              aria-busy={`${loading}`}
                type="submit"
                class="contrast"
                onclick="event.preventDefault()"
              >
                Login
              </button>
              <hgroup>
                <h6>Don't have an account? Sign Up</h6>
              </hgroup>
            </form>
          </div>
          {/* <div></div> */}
        </article>
      </main>
    </div>
  );
}

export default LoginScreen;
