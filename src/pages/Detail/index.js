import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

const Detail = () => {
  const [char, setChar] = useState({});
  const { char_id } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/characters/${char_id}`)
      .then((res) => {
        setChar(res.data[0]);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [char_id]);

  return (
    <div>
      {loading && <Loading />}
      {error && <Error error={error} />}
      {!loading && !error && (
        <div>
          <h1>{char.name}</h1>
          <img src={char.img} alt={char.name} style={{height: '40%' , width: '40%'}}  />
          <p>{char.nickname}</p>
        </div>
      )}
    </div>
  );
};

export default Detail;
