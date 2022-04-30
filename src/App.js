import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';

// pages
import Home from './pages/Home';
import Add from './pages/Add';
import Edit from './pages/Edit';

function App() {
	return (
		<Container>
			<Container className="p-4">
				<div className="d-flex justify-content-end">
					{/* add button */}
					<Link to="/add_case" className="btn btn-primary  m-2">
						Add İtem
					</Link>
					{/* CASE LİST */}
					<Link to="/" className="btn btn-primary  m-2">
						Case List
					</Link>
				</div>
			</Container>
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/add_case" element={<Add />} />
				<Route path="/edit_case/:id" element={<Edit />} />
			</Routes>
		</Container>
	);
}

export default App;
