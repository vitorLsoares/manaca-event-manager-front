import React, {useEffect, useState} from 'react';
import UserService from '../service/user';
import sortBy from 'lodash/sortBy';


export default function WelcomeComponent() {
  const [users, setUsers] = useState({});


  useEffect(() => {
    const interval = setInterval(() => {
      UserService.getAll().then(({ data }) => {
        console.log(data?.listUsers?.items)
          setUsers(sortBy(data?.listUsers?.items, 'updatedAt').reverse()[0]);
      }).catch((resp) => console.log(resp));
    }, 1000); //set your time here. repeat every 5 seconds
  
    return () => clearInterval(interval);
  }, []);

  return (

      <div className="welcome-message">
            <div class="intro-text">
                <div class="intro-lead-in">Buona notte {users.name}</div>
                <div class="intro-heading">Bem Vindo ao Segunda aniversário da Manacá!</div>
                <div class="intro-heading"> sua mesa é {users.eventPosition}</div>
            </div>
      </div>
  );
}
