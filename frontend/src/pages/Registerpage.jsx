import React, { useState } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Registerpage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    number: '',
    firstname: '',
    lastname: '',
    rank: '',
    agency: '',
    position: ''
  });

  const [error, setError] = useState('');

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/register', formData);  // Ensure correct endpoint
      if (response.data.success) {
        navigate('/login');
      } else {
        setError(response.data.message || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed');
    }
  };

  return (
    <Box sx={{ width: '100vw', height: '100vh', background: 'linear-gradient(to bottom, #757AFD, #61FE68)', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <Box
        sx={{
          width: '75%',
          maxWidth: '500px',
          height: '90vh',
          backgroundColor: 'rgba(255, 255, 255, 0.3)', // Transparent white
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
        <Typography variant="h5" fontWeight="bold" gutterBottom>สมัครสมาชิก</Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', mb: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="Email"
              name="username"
              margin="normal"
              sx={{ mb: 1 }}
              value={formData.username}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              size="small"
              label="Password"
              name="password"
              margin="normal"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
            />
          </Box>
          <TextField
            fullWidth
            size="small"
            label="รหัสประจําตัวข้าราชการ"
            name="number"
            margin="normal"
            sx={{ mb: 1 }}
            value={formData.number}
            onChange={handleInputChange}
          />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', mb: 1 }}>
            <TextField
              fullWidth
              size="small"
              label="ชื่อจริง"
              name="firstname"
              margin="normal"
              sx={{ mb: 1 }}
              value={formData.firstname}
              onChange={handleInputChange}
            />
            <TextField
              fullWidth
              size="small"
              label="นามสกุล"
              name="lastname"
              margin="normal"
              sx={{ mb: 1 }}
              value={formData.lastname}
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', mb: 1 }}>
            <FormControl fullWidth margin="normal" size="small">
              <InputLabel>ยศ</InputLabel>
              <Select
                name="rank"
                value={formData.rank}
                onChange={handleInputChange}
                label="ยศ"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value="นาย">นาย</MenuItem>
                <MenuItem value="นางสาว">นางสาว</MenuItem>
                <MenuItem value="นาง">นาง</MenuItem>
                <MenuItem value="จ.ต.">จ.ต.</MenuItem>
                <MenuItem value="จ.ต.หญิง">จ.ต.หญิง</MenuItem>
                <MenuItem value="จ.ท.">จ.ท.</MenuItem>
                <MenuItem value="จ.ท.หญิง">จ.ท.หญิง</MenuItem>
                <MenuItem value="จ.อ.">จ.อ.</MenuItem>
                <MenuItem value="จ.อ.หญิง">จ.อ.หญิง</MenuItem>
                <MenuItem value="พ.อ.ต">พ.อ.ต</MenuItem>
                <MenuItem value="พ.อ.ต.หญิง">พ.อ.ต.หญิง</MenuItem>
                <MenuItem value="พ.อ.ท.">พ.อ.ท.</MenuItem>
                <MenuItem value="พ.อ.ท.หญิง">พ.อ.ท.หญิง</MenuItem>
                <MenuItem value="พ.อ.อ.">พ.อ.อ.</MenuItem>
                <MenuItem value="พ.อ.อ.หญิง">พ.อ.อ.หญิง</MenuItem>
                <MenuItem value="ร.ต.">ร.ต.</MenuItem>
                <MenuItem value="ร.ต.หญิง">ร.ต.หญิง</MenuItem>
                <MenuItem value="ร.ท.">ร.ท.</MenuItem>
                <MenuItem value="ร.ท.หญิง">ร.ท.หญิง</MenuItem>
                <MenuItem value="ร.อ.">ร.อ.</MenuItem>
                <MenuItem value="ร.อ.หญิง">ร.อ.หญิง</MenuItem>
                <MenuItem value="น.ต.">น.ต.</MenuItem>
                <MenuItem value="น.ต.หญิง">น.ต.หญิง</MenuItem>
                <MenuItem value="น.ท.">น.ท.</MenuItem>
                <MenuItem value="น.ท.หญิง">น.ท.หญิง</MenuItem>
                <MenuItem value="น.อ.">น.อ.</MenuItem>
                <MenuItem value="น.อ.หญิง">น.อ.หญิง</MenuItem>
              </Select>
            </FormControl>
            <TextField
              fullWidth
              size="small"
              label="สังกัด"
              name="agency"
              margin="normal"
              sx={{ mb: 1 }}
              value={formData.agency}
              onChange={handleInputChange}
            />
          </Box>
          <TextField
            fullWidth
            size="small"
            label="ตําเเหน่ง"
            name="position"
            margin="normal"
            sx={{ mb: 2 }}
            value={formData.position}
            onChange={handleInputChange}
          />
          {error && <Typography color="error">{error}</Typography>}
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '30px' }}>
            <Button variant="contained" color="success" size="normal" type="submit">
              สมัครสมาชิก
            </Button>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              size="normal"
            >
              ย้อนกลับ
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Registerpage;
