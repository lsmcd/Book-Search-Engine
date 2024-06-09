import { useState, useEffect } from 'react';
import {
  Container,
  Card,
  Button,
  Row,
  Col
} from 'react-bootstrap';

import { getMe, deleteBook } from '../utils/API';
import Auth from '../utils/auth';
import { removeBookId } from '../utils/localStorage';
  
import { useQuery } from "@apollo/client";
import { GET_ME } from '../utils/queries'
import { useMutation } from "@apollo/client";
import { REMOVE_BOOK } from '../utils/mutations';

const SavedBooks = () => {
  const { loading, error, data } = useQuery(GET_ME);
  const [removeBook, { bookData, bookLoading, bookError }] = useMutation(REMOVE_BOOK);
  const [userData, setUserData] = useState({});
  // if (loading) return 'Loading...';

  // if (error) return `Error! ${error.message}`;

  // use this to determine if `useEffect()` hook needs to run again
  const userDataLength = Object.keys(userData).length;

  useEffect(() => {
    getUserData();
  }, [loading]);

  const getUserData = async () => {
    try {
      if (data) {
        console.log(data);
        setUserData(data.me);
      } else {
        console.log(error)
      }
    } catch (err) {
      console.error(err);
    }
  };

  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    try {
      const { data } = await removeBook({variables: {bookId}});

      if (data) {
        console.log(data);
        removeBookId(bookId);
        window.location.reload();
      } else {
        console.log(error);
      }

    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (!userDataLength) {
    return <h2>LOADING...</h2>;
  }

  return (
    <>
      <div fluid="true" className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved books!</h1>
        </Container>
      </div>
      <Container>
        <h2 className='pt-5'>
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${userData.savedBooks.length === 1 ? 'book' : 'books'}:`
            : 'You have no saved books!'}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border='dark'>
                  {book.image ? <Card.Img src={book.image} alt={`The cover for ${book.title}`} variant='top' /> : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className='small'>Authors: {book.authors}</p>
                    <Card.Text>{book.description}</Card.Text>
                    <Button className='btn-block btn-danger' onClick={() => handleDeleteBook(book.bookId)}>
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedBooks;
