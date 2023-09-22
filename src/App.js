import './App.css';
import React, { useEffect } from 'react';
import UserService from './service/user'
import QrCode from './components/qrCode';
import SignUp from './components/formUser';

function App() {
  const [user, setUser] = React.useState(null);

  useEffect(() => {
    const test = UserService.getById('b75ad284-162c-4dc1-b80c-022a7d0179ee');
    console.log('test', test);
    {/* getUserById('1'); */}
    {/* create({ name: 'test', email: 'test@test' }); */}
    {/* update('1', { name: 'test2' }); */}
    {/* deleteById('1'); */}
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src='https://cdn.awsli.com.br/400x300/2418/2418798/logo/c262f740eb.png' className="App-logo" alt="logo" />
        <h1>Manacá Event Manager</h1>
      </header>
      <div className="main-container">
      <SignUp setParentState={setUser} />
      {user && (<QrCode value={user.id} imageName={user.name} />)}
      </div>
    </div>
  );
}

export default App;
