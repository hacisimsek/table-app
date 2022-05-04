import { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/charactersSlice';
import { fetchCases, addCaseAsync } from '../../redux/casesSlice';

// import { Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

// import capabilitiesSchema from '../../schema';

const Add = () => {
	const characters = useSelector((state) => state.characters.items);
	const cases = useSelector((state) => state.cases.items);

	// formData
	const [formData, setFormData] = useState({});

	const status = useSelector((state) => state.characters.status);
	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCharacters());
			dispatch(fetchCases());
		}
	}, [dispatch, status]);

	const handleSubmit = async (e) => {
		const addCases = {
			id: cases[cases.length - 1].id + 1,
			title: formData.title,
			status: 'incomplete',
			agentId: Number(formData.name),
			capabilities: {
				cache: formData.cache.cache
					? {
							cache_time: Number(formData.cache.cache_time),
							key_fields: ['ip'],
							method: 'unblock-ip',
					  }
					: {},
				expire: formData.expire.expire
					? {
							expire_time: Number(formData.expire.expire_time),
							key_fields: ['ip'],
							method: 'unblock-ip',
					  }
					: {},
			},
		};
		await dispatch(addCaseAsync(addCases)).then(() => {
			alert('Case added successfully');
			setFormData({});
		});
	};

	const schema = {
		type: 'object',
		title: 'Add Case',
		properties: {
			title: {
				type: 'string',
				title: 'Title',
				default: '',
			},
			cache: {
				type: 'object',
				properties: {
					cache: {
						type: 'boolean',
						default: false,
					},
				},
				if: {
					properties: {
						cache: {
							const: true,
						},
					},
				},
				then: {
					properties: {
						cache_time: {
							type: 'number',
							title: 'Cache Time',
							default: 0,
						},
					},
				},
			},
			expire: {
				type: 'object',
				properties: {
					expire: {
						type: 'boolean',
						default: false,
					},
				},
				if: {
					properties: {
						expire: {
							const: true,
						},
					},
				},
				then: {
					properties: {
						expire_time: {
							default: 3600,
							type: 'integer',
							writeOnly: true,
						},
					},
				},
			},
			name: {
				type: 'number',
				title: 'Agent',
				enum: characters.map((agent) => agent.id),
				enumNames: characters.map((agent) => agent.fullname),
			},
		},
		required: ['title', 'name'],
	};
	const uiSchema = {};

	if (status === 'pending') {
		return <div>Loading...</div>;
	}

	if (status === 'error') {
		return <div>Error!</div>;
	}

	return (
		<Form
			schema={schema}
			uiSchema={uiSchema}
			formData={formData}
			onChange={(e) => setFormData(e.formData)}
			onSubmit={(e) => handleSubmit(e)}
		>
			<div className="flex justify-end mt-4">
				<button
					className="bg-blue-500 hover:bg-blue-700  font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
					type="submit"
				>
					Add
				</button>
			</div>
		</Form>
	);
};

export default Add;
