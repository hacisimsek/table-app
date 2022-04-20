import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuotes } from '../../redux/quotesSlice';
import { Link } from 'react-router-dom';

import Error from '../../components/Error';
import Loading from '../../components/Loading';

const Quotes = () => {
  const data = useSelector((state) => state.quotes.items);
  console.log('🚀 ~ file: index.js ~ line 10 ~ Quotes ~ data', data);
  const status = useSelector((state) => state.quotes.status);
  const error = useSelector((state) => state.quotes.error);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchQuotes());
    }
  }, [dispatch, status]);

  if (status === 'failed') {
    return <Error error={error} />;
  }

  return (
    <div>
      <h2>Quotes!</h2>
      <div className="d-flex flex-column justify-content-center">
        {status === 'loading' && <Loading />}

        {status !== 'loading' &&
          data.map((item) => (
            <div key={item.quote_id}>
              <Link to={`/quote/${item.quote_id}`}>
                <span>{item.quote}</span> {`-->`} <strong>{item.author}</strong>
              </Link>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Quotes;
