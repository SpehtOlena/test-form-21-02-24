import { useState } from 'react';
import './App.css';
import Body from './components/Body/Body';
import AddUser from './components/AddUser/AddUser';

function App() {
	const [activeUser, setActiveUser] = useState(null);
	return (
		<div className="App">
			{
				!!activeUser ?
					<div>
						<Body activeUser={activeUser} setActiveUser={setActiveUser} />
					</div>
					:
					< AddUser activeUser={activeUser} setActiveUser={setActiveUser} />
			}
		</div>
	);
}

export default App;
