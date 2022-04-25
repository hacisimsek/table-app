import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/charactersSlice';
import { fetchCases, removeCaseAsync } from '../../redux/casesSlice';

import { Container, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

const Home = () => {
	const characters = useSelector((state) => state.characters.items);
	const cases = useSelector((state) => state.cases.items);
	const status = useSelector((state) => state.cases.status);
	const error = useSelector((state) => state.cases.error);

	const dispatch = useDispatch();

	const findName = (id) => {
		const character = characters.find((character) => character.id === id);
		return character ? character.fullname : 'Unknown';
	};

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCharacters());
			dispatch(fetchCases());
		}
	}, [dispatch, status]);

	if (status === 'failed') {
		return <Error error={error} />;
	}

	return (
		<Container className="p-4">
			{status === 'loading' && <Loading />}
			{status === 'succeeded' && (
				<Table striped bordered hover>
					<thead>
						<tr>
							<th>#</th>
							<th>Title</th>
							<th>FullName</th>
							<th>Status</th>
							<th>Capability</th>
							<th>Action</th>
						</tr>
					</thead>
					<tbody>
						{cases.map((item) => (
							<tr key={item.id}>
								<td>{item.id}</td>
								<td>{item.title}</td>
								<td>{findName(item.agentId)}</td>
								<td>{item.status}</td>
								<td>{String(typeof item.capabilities['cache'] === 'object' ? 'Cache' : '--')}</td>
								<td>
									<Link to={`/edit_case/${item.id}`} className="btn btn-primary m-2">
										Edit Item
									</Link>
									-
									<button className="btn btn-danger m-2" onClick={() => dispatch(removeCaseAsync(item.id))}>
										Delete Item
									</button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</Container>
	);
};

export default Home;
