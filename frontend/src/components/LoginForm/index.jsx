
import { useState } from 'react';
import { TextField, Typography, Link, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showAlert, API_BASE_URL } from '../../function'
import CustomButton from '../Button';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegisterLinkClick = (e) => {
    e.preventDefault(); 
    navigate('/register');
  }

  const handleLogin = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, {
        username,
        password,
      });

      const data = response.data?.data;
    if (data && data.token && data.user && data.user.role) {
      localStorage.setItem('token', data.token)
    } else {
      console.error('Login error: Token or user data is missing in the response');
      showAlert('error', 'Login Failed', 'Token or user data is missing in the response');
    } console.log('Login successful:', response.data);
      showAlert('success', 'Successfully loged ini', '');
      navigate('/home'); 
    } catch (error) {
      console.error('Login error:', error.message);
      showAlert('error', 'Login Failed', `<b>[CODE] ${error.code}</b><br>Please check your username and password`);
    }
  };

  return (
    <div style={{ paddingLeft: '10rem'}}>
    <Card style={{ textAlign: 'center', margin: '20px auto', padding: '30px', maxWidth: '400px' }}>
      <Typography  variant="h4" gutterBottom>
        Login
      </Typography>
      <TextField
        label="Username"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <TextField
        label="Password"
        type="password"
        variant="outlined"
        fullWidth
        margin="normal"
        placeholder="Enter your password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <CustomButton onClick={handleLogin} style={{marginTop: '20px', fontSize: '1.3rem', width: '7.5rem'}} >
        Login
      </CustomButton>
      <Typography style={{ marginTop: '10px', paddingTop: '10px', fontSize: '13px' }}>
        <Link href="#" onClick={handleRegisterLinkClick}>
          Register here if you dont have an account
        </Link>
      </Typography>
    </Card>
    </div>
  );
};

export default LoginForm;
