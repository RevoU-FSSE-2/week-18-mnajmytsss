import { useState } from 'react';
import { TextField, Typography, Link, Select, MenuItem, FormControl, InputLabel, Card } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { showAlert, API_BASE_URL } from '../../function'
import CustomButton from '../Button';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const handleLoginLinkClick = (e) => {
    e.preventDefault();
    navigate('/login');
  }

  const handleRegister = async () => {
    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, {
        username,
        password,
        role,
      });
      showAlert('success', 'Registration Successful!', 'You can now log in with your credentials.');
      console.log('Registration successful:', response.data);
      navigate('/login');
    } catch (error) {

      if (error.response && error.response.status === 400 && error.response.data.message) {
        showAlert('error', 'Registration Failed', `<b>[CODE] ${error.response.data.message}</b><br>Please check your username and password`);
      } else {
        showAlert('error', 'Registration Faied', `<b>[CODE] </b><br>An error occurred during registration. Please try again later.`);
      }
      console.error('Registration error:', error.message);
    }
  };

  return (
    <div style={{ paddingLeft: '10rem'}}>
    <Card style={{ textAlign: 'center', margin: '20px auto', padding: '30px', maxWidth: '400px' }}>
      <Typography variant="h4" gutterBottom>
        Register
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
      <FormControl fullWidth margin="normal" variant="outlined">
        <InputLabel id="role-label">Role</InputLabel>
        <Select
          labelId="role-label"
          id="role"
          value={role}
          onChange={(e) => setRole(e.target.value)}
          label="Role"
        >
          <MenuItem value="user">User</MenuItem>
          <MenuItem value="admin">Admin</MenuItem>
        </Select>
      </FormControl>
      <CustomButton onClick={handleRegister} style={{marginTop: '20px', fontSize: '1.3rem', width: '10rem'}}>
        Register
      </CustomButton>
      <Typography style={{ marginTop: '10px', paddingTop: '10px', fontSize: '13px' }}>
        <Link href="#" onClick={handleLoginLinkClick} target="_blank" rel="noopener">
          Login here if you already have an account
        </Link>
      </Typography>
    </Card>
    </div>
  );
};

export default RegisterForm;
