import React, { useEffect,useState } from 'react';
import LoginComp from './components/LoginComp';
import RegisterComp from './components/RegisterComp';
import CreateListItemComponent from './components/CreateListItemComponent';
import CreateTaskComponent from './components/CreateTaskComponent';
import { Container } from '@mui/system';

function App() {
  const [lists, setLists] = useState([]); //list of lists

  //for every list i will create a new task component by passing in the list id
	useEffect(() => {
		async function fetchLists() {
			const response = await fetch('http://localhost:3001/list/all',{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'},
        credentials: 'include',});
			const data = await response.json();
      console.log(data);
			setLists(data);
		}
		fetchLists();
	}, []);
  
  return (
    <div className="App">
      <RegisterComp/>
      <Container>
      <LoginComp/>
      </Container>
      <CreateListItemComponent/> 
      <Container>
      {lists.map((list) => (
        <Container>
         <CreateTaskComponent key={list.ID} list={list}/>
        </Container>
      ))}
      </Container>
    </div>
  );
}

export default App;
