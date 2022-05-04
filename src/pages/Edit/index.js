import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCases, editCaseAsync } from '../../redux/casesSlice';
import { useNavigate } from 'react-router-dom';
import { fetchCharacters } from '../../redux/charactersSlice';

import 'bootstrap/dist/css/bootstrap.css';
import Form from '@rjsf/core';

import { useParams } from 'react-router-dom';
// import capabilitiesSchema from '../../schema';

const Edit = () => {
	let navigate = useNavigate();

	const characters = useSelector((state) => state.characters.items);
	const cases = useSelector((state) => state.cases.items);
	const status = useSelector((state) => state.characters.status);

	const [formData, setFormData] = useState({});

	const { id } = useParams();
	const editItem = cases.filter((item) => item.id === Number(id))[0];

	const dispatch = useDispatch();

	useEffect(() => {
		if (status === 'idle') {
			dispatch(fetchCharacters());
			dispatch(fetchCases());
		}
	}, [dispatch, status, id]);

	const handleSubmit = async () => {
		const editCase = {
			id,
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

		await dispatch(editCaseAsync(editCase)).then(() => {
			alert('Case updated successfully');
			navigate('/');
		});
	};

	const schema = {
		type: 'object',
		title: 'Edit Case',
		properties: {
			title: {
				type: 'string',
				title: 'Title',
				default: editItem.title,
			},
			cache: {
				type: 'object',
				properties: {
					cache: {
						type: 'boolean',
						default: editItem.capabilities.cache.cache_time > 0 ? true : false,
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
							default: editItem.capabilities.cache.cache_time,
							writeOnly: true,
						},
					},
				},
			},
			expire: {
				type: 'object',
				properties: {
					expire: {
						type: 'boolean',
						default: editItem.capabilities.expire.expire_time > 0 ? true : false,
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
							type: 'number',
							default: editItem.capabilities.expire.expire_time,
							writeOnly: true,
						},
					},
				},
			},
			name: {
				type: 'number',
				title: 'Agent',
				default: editItem.agentId,
				enum: characters.map((agent) => agent.id),
				enumNames: characters.map((agent) => agent.fullname),
			},
		},
		required: ['title', 'name'],
	};
	const uiSchema = {};

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
					Edit
				</button>
			</div>
		</Form>
	);
};

export default Edit;
