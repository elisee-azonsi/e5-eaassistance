import React from 'react';
import '../login/styles.css';
import axios from 'axios';
import { useState } from 'react';
import Swal from 'sweetalert2';


const Register = () => {
  const [registerData, setFormData] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    password: '',
    role:0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...registerData,
      [name]: value
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    

    try {
        const response = await axios.post('http://localhost:3000/user/register', registerData);
  
       
        console.log('Registration successful:', response.data);
        Swal.fire({
          title:"Succès!",
          text: 'Votre inscription à été validée',
          icon:'success',
          confirmButtonText: 'Fermer'
        });
      } catch (error) {
        console.error('Registration error:', error);
        Swal.fire({
          title:"Erreur",
          text: 'Il y a eu un problème à la soumission',
          icon:'error',
          confirmButtonText: 'OK'
        });
      }
    console.log(registerData);
    
    setFormData({
      name: '',
      surname: '',
      email: '',
      phone: '',
      password: '',
    });
  };



  return (
    <div className="register-div">
    <div class="wrapper">
    <form onSubmit={handleSubmit}>
      <h1>S'inscrire</h1>
      <div class="input-box">
        <input type="text" placeholder="Nom" 
        name="surname"
        value={registerData.surname}
        onChange={handleChange}
        required/>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input type="text" placeholder="Prenom" 
        name="name"
        value={registerData.name}
        onChange={handleChange}
        required/>
        <i class='bx bxs-user'></i>
      </div>
      <div class="input-box">
        <input type="text" placeholder="Email" 
        name="email"
        value={registerData.email}
        onChange={handleChange}
        required/>
        <i class='bx bx-envelope'></i>
      </div>
      <div class="input-box">
        <input type="number" placeholder="Votre télephone" 
        name="phone"
        value={registerData.phone}
        onChange={handleChange}
        required/>
        <i class='bx bx-phone'></i>
      </div>
      <div class="input-box">
        <input type="password" placeholder="Mot de passe" required/>
        <i class='bx bxs-lock-alt' ></i>
      </div>
      <div class="input-box">
        <input type="password" placeholder=" Confirmer votre mot de passe" 
        name="password"
        value={registerData.password}
        onChange={handleChange}
        required/>
        <i class='bx bxs-lock-alt' ></i>
      </div>
      <button type="submit" class="btn">Confirmer</button>
    </form>
  </div>
  </div>
  )
}

export default Register
