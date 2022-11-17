import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const [users, setUsers] = useState([])

  useEffect(() =>{
    fetch('http://localhost:5000/users')
    .then(res => res.json())
    .then(data => setUsers(data))
  }, [])

  const handleSubmit = event =>{
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    const user = {name, email};

    // send/post data to the server
    fetch('http://localhost:5000/user', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify(user)
    })

    .then(res => res.json())
    .then(data => {
      const newUsers = [...users, data]
      setUsers(newUsers)
      console.log(data)
    })
  }


  return (
    <div className="App">
      <h2>My own data network: {users.length}</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" id="" placeholder='Enter name' />
        <input type="text" name="email" id="" placeholder='Enter email' />
        <input type="submit" value="Add User" />
      </form>

      {
        users.map(user => <li key={user.id}>Id: {user.id} Name: {user.name} Job: {user.job}</li>)
      }
    </div>
  );
}

export default App;
