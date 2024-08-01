import React from 'react';
import {Box,Typography,IconButton,AppBar,Toolbar,Drawer,List,ListItem,ListItemText,Paper,Table,TableBody,TableCell,TableContainer,TableHead,TablePagination,TableRow,} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import backgroundImage from '../assets/images/icon-01-1024x1024.png';
import { useAuth } from '../components/AuthContext';
import { useNavigate } from 'react-router-dom';
import PieActiveArc from '../components/Piechart';

const columns = [
  { id: 'name', label: 'Name', minWidth: 170 },
  { id: 'code', label: 'ISO Code', minWidth: 100 },
  {
    id: 'population',
    label: 'Population',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'size',
    label: 'Size (km²)',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  {
    id: 'density',
    label: 'Density',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toFixed(2),
  },
];

const rows = [
  { name: 'India', code: 'IN', population: 1324171354, size: 3287263, density: 1324171354 / 3287263 },
  { name: 'China', code: 'CN', population: 1403500365, size: 9596961, density: 1403500365 / 9596961 },
  { name: 'Italy', code: 'IT', population: 60483973, size: 301340, density: 60483973 / 301340 },
  { name: 'United States', code: 'US', population: 327167434, size: 9833520, density: 327167434 / 9833520 },
  { name: 'Canada', code: 'CA', population: 37602103, size: 9984670, density: 37602103 / 9984670 },
  { name: 'Australia', code: 'AU', population: 25475400, size: 7692024, density: 25475400 / 7692024 },
  { name: 'Germany', code: 'DE', population: 83019200, size: 357578, density: 83019200 / 357578 },
  { name: 'Ireland', code: 'IE', population: 4857000, size: 70273, density: 4857000 / 70273 },
  { name: 'Mexico', code: 'MX', population: 126577691, size: 1972550, density: 126577691 / 1972550 },
  { name: 'Japan', code: 'JP', population: 126317000, size: 377973, density: 126317000 / 377973 },
  { name: 'France', code: 'FR', population: 67022000, size: 640679, density: 67022000 / 640679 },
  { name: 'United Kingdom', code: 'GB', population: 67545757, size: 242495, density: 67545757 / 242495 },
  { name: 'Russia', code: 'RU', population: 146793744, size: 17098246, density: 146793744 / 17098246 },
  { name: 'Nigeria', code: 'NG', population: 200962417, size: 923768, density: 200962417 / 923768 },
  { name: 'Brazil', code: 'BR', population: 210147125, size: 8515767, density: 210147125 / 8515767 },
];

const StickyHeadTable = () => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden', mt: 2 }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
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
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

const Homepage = () => {
  const [open, setOpen] = React.useState(false);
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <AppBar position="fixed" sx={{ background: 'linear-gradient(to right, rgba(70, 219, 252, 0.8), rgba(208, 194, 194, 0.8))' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleDrawer} sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography  component="div" sx={{ flexGrow: 1,fontSize: { xs: '12px', sm: '16px', md: '18px', lg: '20px' }}} color="black" fontWeight="bold">
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
            background: 'linear-gradient(to bottom, #46DBFC, #D0C2C2)',
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
          flexGrow: 1,
          background: 'linear-gradient(to bottom, #46DBFC, #D0C2C2)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: { xs: 1, sm: 2, md: 3 },
          overflow: 'auto',
        }}
      >
        <Box
          sx={{
            width: { xs: '100%', sm: '100%', md: '100%', lg: '100%' },
            height: { xs: '40%', sm: '30%', md: '30%', lg: '60%' },
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            borderRadius: '20px',
            padding: { xs: 2, sm: 3 },
            boxSizing: 'border-box',
          }}
        >
          <Box>
            <Typography sx={{fontWeight:'bold', fontSize:'20px',textAlign:'center',color:'#FFFFFF',fontStyle: 'Inter'}}>
              สรุปข้อมูลใบรับรองด้านซอฟต์แวร์แต่ละประเภท
              </Typography>
              </Box>
          <Box sx={{display: 'flex',justifyContent: 'flex-start',alignItems: 'center'}}>
          <PieActiveArc />
          </Box>
        </Box>
        <Box sx={{ width: '100%', marginTop: 2 }}>
          <StickyHeadTable />
        </Box>
      </Box>
    </Box>
  );
};

export default Homepage;
