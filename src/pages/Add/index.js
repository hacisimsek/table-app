import { useState, useEffect } from 'react';
import Form from '@rjsf/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/charactersSlice';
import { fetchCases, addCaseAsync } from '../../redux/casesSlice';

// import { Container } from 'react-bootstrap';
// import 'bootstrap/dist/css/bootstrap.css';

import capabilitiesSchema from '../../schema';

const Add = () => {
  const characters = useSelector((state) => state.characters.items);
  const cases = useSelector((state) => state.cases.items);

  // formData
  const [formData, setFormData] = useState({});
  console.log('🚀 ~ file: index.js ~ line 18 ~ Add ~ formData', formData);

  const [title, setTitle] = useState('');
  const [name, setName] = useState(0);
  const [isCheckedCache, setIsCheckedCache] = useState(false);
  const [isCheckedExpire, setIsCheckedExpire] = useState(false);
  const [cacheTime, setCacheTime] = useState(
    capabilitiesSchema[1].schema.properties.cache_time.default
  );
  const [expireTime, setExpireTime] = useState(
    capabilitiesSchema[0].schema.properties.expire_time.default
  );

  const status = useSelector((state) => state.characters.status);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
      dispatch(fetchCases());
    }
  }, [dispatch, status]);

  const handleCheckboxChange = (e) => {
    if (e.target.name === 'cache') {
      setIsCheckedCache(e.target.checked);
    } else if (e.target.name === 'expire') {
      setIsCheckedExpire(e.target.checked);
    }
  };

  const handleSubmit = async (e) => {
    if (title.length === 0 || name === 0) {
      alert('Please fill all fields');
      return;
    }

    e.preventDefault();
    const addCases = {
      id: cases[cases.length - 1].id + 1,
      title,
      status: 'incomplete',
      agentId: Number(name),
      capabilities: {
        cache: isCheckedCache
          ? {
              cache_time: Number(cacheTime),
              key_fields: ['ip'],
              method: 'unblock-ip'
            }
          : {},
        expire: isCheckedExpire
          ? {
              expire_time: Number(expireTime),
              key_fields: ['ip'],
              method: 'unblock-ip'
            }
          : {}
      }
    };

    await dispatch(addCaseAsync(addCases)).then(() => {
      setTitle('');
      setName(0);
      setIsCheckedCache(false);
      setIsCheckedExpire(false);
      setCacheTime(capabilitiesSchema[1].schema.properties.cache_time.default);
      setExpireTime(
        capabilitiesSchema[0].schema.properties.expire_time.default
      );
    });
  };

  const schema = {
    type: 'object',
    title: 'Add Case',
    submitText: 'Add',
    properties: {
      title: {
        type: 'string',
        title: 'Title',
        default: ''
      },
      name: {
        type: 'number',
        title: 'Agent',
        default: 0,
        enum: characters.map((character) => character.fullname)
      },
      cache: {
        type: 'boolean',
        title: 'Cache',
        default: false
      },
      cache_time: {
        type: 'number',
        title: 'Cache Time',
        default: capabilitiesSchema[1].schema.properties.cache_time.default
      },
      expire: {
        type: 'boolean',
        title: 'Expire',
        default: false
      },
      expire_time: {
        type: 'number',
        title: 'Expire Time',
        default: capabilitiesSchema[0].schema.properties.expire_time.default
      }
    }
  };
  const uiSchema = {
    // submit button none
    submit: {
      'ui:widget': 'none'
    },

    name: {
      'ui:widget': 'select',
      'ui:placeholder': 'Select Agent'
    },
    cache: {
      'ui:widget': 'checkbox',
      'ui:options': {
        inline: true
      }
    },
    cache_time: {
      'ui:widget': 'updown',
      'ui:options': {
        updown: {
          min: 1,
          max: 60
        }
      }
    },
    expire: {
      'ui:widget': 'checkbox',
      'ui:options': {
        inline: true
      }
    },
    expire_time: {
      'ui:widget': 'updown',
      'ui:options': {
        updown: {
          min: 1,
          max: 60
        }
      }
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="mt-5">
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            id="title"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="mb-3 form-check" key={capabilitiesSchema[0].type}>
          <input
            type="checkbox"
            className="form-check-input"
            id={capabilitiesSchema[0].type}
            name={capabilitiesSchema[0].type}
            onChange={handleCheckboxChange}
            checked={isCheckedExpire}
          />
          <label
            htmlFor={capabilitiesSchema[0].type}
            className="form-check-label d-flex justify-content-start fw-bold"
          >
            {capabilitiesSchema[0].type}
          </label>
          {isCheckedExpire && (
            <div className="ml-3">
              <input
                type={capabilitiesSchema[0].schema.properties.expire_time.type}
                value={expireTime}
                className="form-control"
                id={capabilitiesSchema[0].schema.properties.expire_time.type}
                onChange={(e) => setExpireTime(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="mb-3 form-check" key={capabilitiesSchema[1].type}>
          <input
            type="checkbox"
            className="form-check-input"
            id={capabilitiesSchema[1].type}
            name={capabilitiesSchema[1].type}
            onChange={handleCheckboxChange}
            checked={isCheckedCache}
          />
          <label
            htmlFor={capabilitiesSchema[1].type}
            className="form-check-label d-flex justify-content-start fw-bold"
          >
            {capabilitiesSchema[1].type}
          </label>
          {isCheckedCache && (
            <div className="ml-3">
              <input
                type={capabilitiesSchema[1].schema.properties.cache_time.type}
                value={cacheTime}
                className="form-control"
                id={capabilitiesSchema[1].schema.properties.cache_time.type}
                onChange={(e) => setCacheTime(e.target.value)}
              />
            </div>
          )}
        </div>

        <select
          className="form-select"
          value={name}
          onChange={(e) => setName(e.target.value)}
        >
          <option value="">Select Agent</option>
          {characters.map((character) => (
            <option key={character.id} value={character.id}>
              {character.fullname}
            </option>
          ))}
        </select>
        <Form
          schema={schema}
          uiSchema={uiSchema}
          formData={formData}
          onChange={(e) => setFormData(e.formData)}
          onSubmit={(e) => handleSubmit(e)}
        />
        <button
          type="submit"
          className="btn btn-primary d-flex justify-content-end mt-3"
        >
          Add Case
        </button>
      </form>
    </div>
  );
};

export default Add;
