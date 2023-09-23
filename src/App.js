import './App.css';
import React, { useEffect } from 'react';
import QrCode from './components/qrCode';
import SignUp from './components/formUser';
import CustomTabPanel from './components/CustomTabPanel';
import ListUsers from './components/listUsers';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { pink, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const theme = createTheme({
  palette: {
    primary: pink,
    secondary: purple,
  },
  multilineColor:{
      color:'red'
  },
  components: {
      MuiTextField: {
        styleOverrides: {
          root: {
              color: "rgba(255, 255, 255, 0.87)",
            '--TextField-brandBorderColor': '#FFF',
          },
        },
      },
      MuiOutlinedInput: {
          styleOverrides: {
            notchedOutline: {
              borderColor: 'var(--TextField-brandBorderColor)',
            },
          },
      },
  },
});

function App() {
  const [user, setUser] = React.useState(null);
  const[tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className='home-header'>
          <img src='https://cdn.awsli.com.br/400x300/2418/2418798/logo/c262f740eb.png' className="App-logo" alt="logo" />
          <h1>Manacá Event Manager</h1>
        </div>

      </header>
        <ThemeProvider theme={theme}>
          <Box 
            sx={{ flexGrow: 1, display: 'flex', height: 'auto' }}
          >
            <Tabs 
              value={tab} 
              onChange={handleChange} 
              orientation="vertical"
              variant="scrollable"
              textColor="secondary" 
              indicatorColor="secondary"
              sx={{ borderRight: 2, borderColor: 'divider' }}
            >
              <Tab label="Criar Convidado" {...a11yProps(0)}/>
              <Tab label="Lista de Convidados" {...a11yProps(1)}/>
            </Tabs>
            <CustomTabPanel value={tab} index={0} style={{ width: '250vh' }} >
              <div className="main-container">
                <SignUp setParentState={setUser} />
                {user && (<QrCode value={user.id} imageName={user.name} />)}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1} style={{ width: '250vh' }} >
              <ListUsers />
            </CustomTabPanel>
          </Box>
        </ThemeProvider>
    </div>
  );
}

export default App;
