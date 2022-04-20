import React from 'react';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { fetchCharacters } from '../../redux/charactersSlice';

import { Card, Container, Row, Col } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.css';

import Loading from '../../components/Loading';
import Error from '../../components/Error';

const Home = () => {
  const data = useSelector((state) => state.characters.items);
  const status = useSelector((state) => state.characters.status);
  const error = useSelector((state) => state.characters.error);
  const page = useSelector((state) => state.characters.page);
  const hasNextPage = useSelector((state) => state.characters.hasNextPage);

  const dispatch = useDispatch();

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchCharacters());
    }
  }, [dispatch, status]);

  if (status === 'failed') {
    return <Error error={error} />;
  }

  return (
    <Container className="p-4">
      <h2>Characters!</h2>
      <Row>
        {data.map((item) => (
          <Col xs={6} md={4} key={item.char_id}>
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={item.img} />
              <Link to={`/char/${item.char_id}`}>
                <Card.Body>
                  <Card.Title>{item.name}</Card.Title>
                  <Card.Text>nickname: {item.nickname}</Card.Text>
                </Card.Body>
              </Link>
            </Card>
          </Col>
        ))}
      </Row>
      <div className="d-flex justify-content-center">
        {status === 'loading' && <Loading />}
        {status !== 'loading' && hasNextPage && (
          <button onClick={() => dispatch(fetchCharacters(page))}>Load more ({page})</button>
        )}
      </div>
    </Container>
  );
};

export default Home;
