import React, { useEffect, useState } from 'react';
import { Box, Typography, IconButton, AppBar, Toolbar, Drawer, List, ListItem, ListItemText, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useAuth } from '../components/AuthContext'; // Import AuthContext
import { useNavigate } from 'react-router-dom';
import backgroundImage from '../assets/images/icon-01-1024x1024.png';

// Define columns for the table
const columns = [
  { id: 'firstname', label: 'First Name', minWidth: 100 },
  { id: 'lastname', label: 'Last Name', minWidth: 100 },
  { id: 'number', label: 'Number', minWidth: 100 },
  { id: 'rank', label: 'Rank', minWidth: 100 },
  { id: 'agency', label: 'Agency', minWidth: 100 },
  { id: 'actions', label: 'Actions', minWidth: 100, align: 'center' }, // New column for Actions (Edit button)
];

const AdminManagepage = () => {
  const [open, setOpen] = useState(false);
  const [members, setMembers] = useState([]);
  const [selectedMember, setSelectedMember] = useState(null); // Initialize selectedMember as null
  const { isLoggedIn, logout } = useAuth(); // Use logout function from AuthContext
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/member'); 
      if (!response.ok) {
        throw new Error('Failed to fetch members');
      }
      const data = await response.json();
      setMembers(data); 
    } catch (error) {
      console.error('Error fetching members:', error.message);
     
    }
  };

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout(); 
    navigate('/login');
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleSelectMember = (member) => {
    setSelectedMember(member); // Set selectedMember when a member is selected
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedMember((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveChanges = async () => {
    try {
      if (!selectedMember || !selectedMember.id_member) {
        throw new Error('Selected member is not defined or missing id_member');
      }
  
      console.log('Updating member:', selectedMember);
  
      const response = await fetch(`http://localhost:5000/api/member/${selectedMember.id_member}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(selectedMember),
      });
  
      if (!response.ok) {
        const errorMessage = await response.text();
        throw new Error(`Failed to update member: ${errorMessage}`);
      }
  
      const updatedMember = await response.json();
      console.log('Updated member:', updatedMember);
  
      // Update the local state (members) with the updated member
      setMembers(prevMembers =>
        prevMembers.map(member =>
          member.id_member === updatedMember.id_member ? updatedMember : member
        )
      );
  
      // Optionally, clear selectedMember state after successful update
      setSelectedMember(null);
  
      alert('Member updated successfully!');
  
      // Reload members data after update
      fetchMembers(); // Call fetchMembers to reload the data
    } catch (error) {
      console.error('Error updating member:', error.message);
      alert(error.message || 'Failed to update member');
    }
  };

  // Render members data in table rows
  const renderMembers = () => {
    return members.map((member) => ({
      id: member.id_member,
      firstname: member.firstname,
      lastname: member.lastname,
      number: member.number,
      rank: member.rank,
      agency: member.agency,
      actions: (
        <Button
          variant="outlined"
          size="small"
          onClick={() => handleSelectMember(member)} // Set selected member when edit button is clicked
        >
          Edit
        </Button>
      ),
      // Add more fields as per your member data structure
    }));
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
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
      <Toolbar />
      <Drawer
        variant="temporary"
        open={open}
        onClose={toggleDrawer}
        sx={{
          [`& .MuiDrawer-paper`]: {
            width: 240,
            boxSizing: 'border-box',
            background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))'
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
                    handleLogout(); // Call logout function on logout click
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
          flexGrow: 1,
          background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'relative',
          flexWrap: 'wrap', // Ensure boxes wrap on smaller screens
          padding: '10px',
        }}
      >
        {/* Background layer with black opacity */}
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            zIndex: 1,
          }}
        />
        {/* Left Box */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: { xs: '100%', sm: '30%' }, // Adjust width for different screen sizes
            height: '85vh',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: '10px', // Add margin for spacing between boxes
            border: '1px solid black',
            borderRadius: '30px',
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            ตารางแก้ไขข้อมูล
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <TextField
              name="firstname"
              label="First Name"
              variant="outlined"
              value={selectedMember?.firstname || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              name="lastname"
              label="Last Name"
              variant="outlined"
              value={selectedMember?.lastname || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              name="number"
              label="Number"
              variant="outlined"
              value={selectedMember?.number || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              name="rank"
              label="Rank"
              variant="outlined"
              value={selectedMember?.rank || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <TextField
              name="agency"
              label="Agency"
              variant="outlined"
              value={selectedMember?.agency || ''}
              onChange={handleInputChange}
              fullWidth
              sx={{ marginBottom: '10px' }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveChanges}
              disabled={!selectedMember} // Disable button if no member is selected
            >
              Save Changes
            </Button>
          </Box>
        </Box>
        {/* Right Box */}
        <Box
          sx={{
            position: 'relative',
            zIndex: 2,
            width: '100%',
            maxWidth: { xs: '100%', sm: '65%' }, // Adjust width for different screen sizes
            height: '85vh',
            backgroundColor: 'rgba(255, 255, 255, 0.3)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            margin: '10px', // Add margin for spacing between boxes
            border: '1px solid black',
            borderRadius: '30px',
          }}
        >
          <Typography variant="h4" component="div" gutterBottom>
            ตารางแสดงข้อมูล
          </Typography>
          <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: '60vh' }}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} style={{ minWidth: column.minWidth, backgroundColor: '#61FE68', color: 'black' }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {renderMembers().slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((member) => {
                    return (
                      <TableRow hover role="checkbox" tabIndex={-1} key={member.id}>
                        {columns.map((column) => {
                          const value = member[column.id];
                          return (
                            <TableCell key={column.id} align={column.align}>
                              {column.format && typeof value === 'number' ? column.format(value) : value}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={members.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminManagepage;
