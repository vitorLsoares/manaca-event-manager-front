import './App.css';
import React, { useRef, useMemo } from 'react';
import QrCode from './components/qrCode';
import SignUp from './components/formUser';
import CustomTabPanel from './components/CustomTabPanel';
import ListUsers from './components/listUsers';
import useContainerDimensions from './hooks/useContainerDimentions';

import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { pink, purple } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import WelcomeComponent from './components/welcomeComponent';

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
  const containerRef = useRef();
  const { width } = useContainerDimensions(containerRef);  
  const [user, setUser] = React.useState(null);
  const[tab, setTab] = React.useState(0);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const istMobile = useMemo(() => width < 800, [width])

  return (
    <div className="App" ref={containerRef}>
      <header className="App-header">
        <div className='home-header'>
          <img src='https://cdn.awsli.com.br/400x300/2418/2418798/logo/c262f740eb.png' className="App-logo" alt="logo" />
          <h1>Manacá Event Manager</h1>
        </div>

      </header>
        <ThemeProvider theme={theme}>
          <Box 
            sx={ istMobile ? {} : { flexGrow: 1, display: 'flex', height: 'auto' }}
          >
            <Tabs 
              value={tab} 
              onChange={handleChange} 
              orientation={ istMobile ? "horizontal" : "vertical"}
              variant="scrollable"
              textColor="secondary" 
              indicatorColor="secondary"
              sx={{ borderRight: 2, borderColor: 'divider' }}
            >
              <Tab label="Criar Convidado" {...a11yProps(0)}/>
              <Tab label="Lista de Convidados" {...a11yProps(1)}/>
              <Tab label="Bem-Vindo" {...a11yProps(2)}/>
            </Tabs>
            <CustomTabPanel value={tab} index={0} style={istMobile ? {} : { width: '250vh' }} >
              <div className={istMobile ? "main-container-mobile" : "main-container"}>
                <SignUp setParentState={setUser} />
                {user && (<QrCode value={user.id} imageName={user.name} />)}
              </div>
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={1} style={istMobile ? {} : { width: '250vh' }} >
              <ListUsers />
            </CustomTabPanel>
            <CustomTabPanel value={tab} index={2} style={istMobile ? {} : { width: '250vh' }} >
              <WelcomeComponent />
            </CustomTabPanel>
          </Box>
        </ThemeProvider>
    </div>
  );
}

export default App;
