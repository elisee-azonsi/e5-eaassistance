import React, { useState } from 'react';
import './userform.css'; 
import { useEffect } from 'react';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2'


function UserForm() {
  const [formData, setFormData] = useState({
    text_problem: '',
    text_content: '',
    user_email: '',
    user_id: '',
  });
  
  const [cookies,removeCookie] = useCookies(['uuid']);
  const userLoggedIn = cookies['uuid'];

  const handleLogout = () => {
    // Remove the 'uuid' cookie
    removeCookie('uuid');
  
  };
  

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/text/add', formData, { withCredentials: true });
      
      Swal.fire({
        title:"Succès!",
        text: 'votre message a été envoyé',
        icon:'success',
         confirmButtonText: 'Fermer'
      });

    } catch (error) {
      console.error('Login error:', error);

     Swal.fire({
       title:"Erreur",
       text: 'Il y a eu un problème à la soumission',
       icon:'error',
       confirmButtonText: 'OK'
     });

    }
    // You can do something with the form data here, like submitting to a backend
    console.log(formData);
    setFormData({
      text_problem: '',
      text_content: '',
    })
  };

  

  const fetchData = async () => {
    try {
      // Crée une requet GET avec Axios
      const response = await axios.get('http://localhost:3000/hform/user-hform', { withCredentials: true });
      
      setData(response.data.result);
      setFormData(prevState => ({
        ...prevState,
        user_email: response.data.result[0]?.user_email,
        user_id: response.data.result[0]?.user_id
      }));
      console.log(response.data.result);
      
      setLoading(false);
    } catch (error) {
      
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect (() =>{
    fetchData();
  }, [])



  return (
    <div className="help-form">
        <button className='s-logout-button' onClick={handleLogout}>
          <Link to="/" >Déconnexion</Link>
        </button>
      <form onSubmit={handleSubmit} className="my-form">
      <div className='form-control'>
        <label  htmlFor="problem"><h3>Problème:</h3></label>
        <input
          type="text"
          id="text_problem"
          name="text_problem"
          value={formData.text_problem}
          onChange={handleChange}
          className="input-control"
        />
      </div>
      <div className='form-control'>
        <label  htmlFor="text"><h3>Description:</h3></label>
        <textarea
          id="text_content"
          name="text_content"
          value={formData.text_content}
          onChange={handleChange}
          className="input-control"
        />
      </div>
      <button type="submit" className="submit-btn">Submit</button>
    </form>
    </div>
    
  );
}

export default UserForm;