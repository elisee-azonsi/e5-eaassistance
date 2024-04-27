import React from 'react'
import './styles.css'
import axios from 'axios'
import { useState } from 'react'
import { CookiesProvider, useCookies } from 'react-cookie'
import { useNavigate } from "react-router-dom";
import { Link } from 'react-router-dom'


const Login = () => {

    const navigate = useNavigate();
    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
      });
    
      const [cookies, setCookie] = useCookies(['user'])
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setLoginData({
          ...loginData,
          [name]: value
        });
      };
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        
        console.log(loginData);
    
        try {
            const response = await axios.post('http://localhost:3000/user/login', loginData);
      
           const token = response.data.token;
           const user_role = response.data.user_role;
           console.log(user_role);
           setCookie('uuid', token, { path: '/',sameSite:'none',secure:true })
      
           
            console.log('Login successful');
            console.log(response.data)
            if(user_role === "0"){
              navigate("/userform");
              }
              else if(user_role === "1"){
              navigate("/notes");
              }
          } catch (error) {
            console.error('Login error:', error);
          }
        // Réinisitialiser le formulaire
        setLoginData({
          email: '',
          password: ''
        });
      };

  return (
  <div className="login-div">
    <div class="wrapper">
    <form onSubmit={handleSubmit}>
      <h1>Se Connecter</h1>
      <div class="input-box">
        <input name="email" value={loginData.email} type="email" placeholder="Identifiant" id='email' onChange={handleChange} required/>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input name='password' value={loginData.password} type="password" id="password" placeholder="Mot de passe" onChange={handleChange} required/>
        <i class='bx bxs-lock-alt' ></i>
      </div>
      <button type="submit" class="btn">Se Connecter</button>
      <div class="register-link">
        <p>Vous n'êtes pas enregistré?  <Link to="/Register">S'inscrire</Link></p>
      </div>
    </form>
  </div>
  </div>
  )
}

export default Login
