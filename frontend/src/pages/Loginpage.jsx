// Loginpage.jsx
import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import KeyIcon from '@mui/icons-material/Key';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../components/AuthContext';
import backgroundImage from '../assets/images/icon-01-1024x1024.png';

const Loginpage = () => {
  // const [username, setUsername] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');
  // const navigate = useNavigate();
  // const { login } = useAuth();

  // const handleLogin = async (event) => {
  //   event.preventDefault();
  //   setError('');

  //   try {
  //     const response = await fetch('http://localhost:5000/api/login', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({ username, password }),
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Login successful:', data);
  //       login(data.user); // Assuming `data.user` contains the user object with `id_member`
  //       navigate('/home');
  //     } else {
  //       const errorData = await response.json();
  //       setError(errorData.message || 'Login failed');
  //     }
  //   } catch (error) {
  //     console.error('Error during login:', error);
  //     setError('An error occurred during login. Please try again.');
  //   }
  // };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          width: '75%',
          maxWidth: '700px',
          height: '85vh',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
          border: '4px solid black',
          borderRadius: '30px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
        }}
      >
        <img
          src={backgroundImage}
          alt="Background"
          style={{
            width: '30%',
            height: 'auto',
            borderRadius: '30px',
            marginBottom: '20px',
            marginTop: '-40px',
          }}
        />
        <Typography variant="h5" component="h2" sx={{ marginBottom: '30px' }}>
        ระบบฐานข้อมูลใบรับรองด้านซอฟต์แวร์
        </Typography>
        {/* {error && ( */}
          <Typography variant="body2" color="error" sx={{ marginBottom: '20px' }}>
            {/* {error} */}
          </Typography>
        {/* )} */}
        <TextField
          label="Username"
          variant="outlined"
          fullWidth
          size="normal"
          // value={username}
          // onChange={(e) => setUsername(e.target.value)}
          sx={{ marginBottom: '20px', width: '70%', borderRadius: '8px' }}
          InputProps={{
            startAdornment: <EmailOutlinedIcon sx={{ color: 'grey', marginRight: '10px' }} />,
          }}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          size="normal"
          // value={password}
          // onChange={(e) => setPassword(e.target.value)}
          sx={{ marginBottom: '20px', width: '70%' }}
          InputProps={{
            startAdornment: <KeyIcon sx={{ color: 'grey', marginRight: '10px' }} />,
          }}
        />
        <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '20px' }}>
          {/* <Button variant="contained" color="primary" size="normal" onClick={handleLogin}>  */}
          <Button
            component={Link}
            to="/home"
            variant="contained"
            color="primary"
            size="normal"
          >
            เข้าสู่ระบบ
            </Button>
          {/* </Button> */}
          <Button
            component={Link}
            to="/register"
            variant="contained"
            color="success"
            size="normal"
          >
            สมัครสมาชิก
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Loginpage;
