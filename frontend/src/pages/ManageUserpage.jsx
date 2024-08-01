import React, { useState, useEffect } from 'react';
import { Box, Typography, TextField, Button, FormControl, InputLabel, Select, MenuItem, IconButton, InputAdornment, AppBar, Toolbar, Drawer, List, ListItem, ListItemText } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import backgroundImage from '../assets/images/icon-01-1024x1024.png';
import { useAuth } from '../components/AuthContext';

const ManageUserpage = () => {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstname: '',
    lastname: '',
    rank: '',
    number: '',
    agency: ''
  });
  const [ranks, setRanks] = useState([]);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get(`http://localhost:5000/api/member/${user.id_member}`);
        const ranksResponse = await axios.get('http://localhost:5000/ranks');

        setUserData(userResponse.data);
        setRanks(ranksResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:5000/api/member/${user.id_member}`, userData);
      alert('User data updated successfully!');
    } catch (error) {
      console.error('Error updating user data:', error);
      alert('Failed to update user data. Please try again.');
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleRankChange = (event) => {
    const { value } = event.target;
    setUserData({ ...userData, rank: value });
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))',
      }}
    >
      <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} color="black" fontWeight="bold">
          ระบบฐานข้อมูลใบรับรองด้านซอฟต์แวร์
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          width: 240,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: 240,
            background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))',
          },
        }}
      >
        <Box sx={{ overflow: 'auto', paddingTop: '64px' }}>
          <List sx={{ margin: '10px' }}>
            <img
              src={backgroundImage}
              alt="Background"
              style={{
                width: '70%',
                height: 'auto',
                borderRadius: '30px',
                marginLeft: '15%',
                marginBottom: '20px',
                marginTop: '-50px',
              }}
            />
            {['Home', 'Manage', 'Log Out', 'Adminmanage'].map((text, index) => (
              <ListItem
                button
                key={text}
                onClick={() => {
                  if (text === 'Log Out') {
                    handleLogout();
                  } else if (text === 'Manage') {
                    navigate('/manageuser');
                  } else if (text === 'Adminmanage') {
                    navigate('/adminmanage');
                  } else if (text === 'Home') {
                    navigate('/home');
                  }
                }}
                sx={{
                  backgroundColor: text === 'Log Out' ? 'red' : '#757AFD',
                  '&:hover': {
                    backgroundColor: text === 'Log Out' ? 'darkred' : '#61FE68',
                  },
                  color: 'white',
                  margin: '10px 0',
                  borderRadius: '8px',
                }}
              >
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            width: '100%',
            maxWidth: '500px',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            padding: '20px',
            border: '4px solid black',
            borderRadius: '30px',
            boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          <Typography variant="h5" sx={{ textAlign: 'center', mb: 3 }}>
            จัดการข้อมูลส่วนตัว{/* Welcome, {userData.firstname} {userData.lastname} */}
          </Typography>
          <TextField
            label="Username"
            variant="outlined"
            fullWidth
            size="small"
            name="username"
            value={userData.username}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Password"
            variant="outlined"
            fullWidth
            size="small"
            name="password"
            type={showPassword ? 'text' : 'password'}
            value={userData.password}
            onChange={handleChange}
            sx={{ mb: 2 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <FormControl fullWidth size="small" sx={{ mb: 2 }}>
            <InputLabel>Rank</InputLabel>
            <Select value={userData.rank} onChange={handleRankChange}>
              {ranks.map((item) => (
                <MenuItem key={item.id} value={item.value}>
                  {item.value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            label="Agency"
            variant="outlined"
            fullWidth
            size="small"
            name="agency"
            value={userData.agency}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Firstname"
            variant="outlined"
            fullWidth
            size="small"
            name="firstname"
            value={userData.firstname}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Lastname"
            variant="outlined"
            fullWidth
            size="small"
            name="lastname"
            value={userData.lastname}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <TextField
            label="Number"
            variant="outlined"
            fullWidth
            size="small"
            name="number"
            value={userData.number}
            onChange={handleChange}
            sx={{ mb: 2 }}
          />
          <Box sx={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '30px', marginTop: '20px' }}>
            <Button variant="contained" color="primary" onClick={handleSave}>
              บันทึกข้อมูล
            </Button>
            <Button
              component={Link}
              to="/home"
              variant="contained"
              color="primary"
              size="normal"
            >
              ย้อนกลับ
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ManageUserpage;
