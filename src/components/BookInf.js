import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";
import { Row } from "antd";
import Flex from "./Flex.js";
import { getBookDetail } from "../BooksAPI.js";

const BookInf = () => {
  const [book, setBook] = useState({
    id: "",
    title: "",
    description: "",
    author: "",
    image: "",
  });

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const getInfBooks = await getBookDetail(id);

        const dataPush = {
          id: getInfBooks?.id || "",
          title: getInfBooks?.title || "",
          description: getInfBooks?.description || "",
          author:
            getInfBooks?.authors && getInfBooks?.authors.length > 0
              ? getInfBooks?.authors[0]
              : "",
          image: getInfBooks?.imageLinks?.thumbnail || "",
          previewLink: getInfBooks?.previewLink || "",
        };
        setBook(dataPush);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBook();
  }, [id]);

  const handleBackPage = () => {
    navigate("/");
  };

  if (!book) {
    return <div>Loading...</div>; // Add a loading state while fetching the book details
  }

  return (
    <div className="search-books">
      <div className="list-books">
        <Row>
          <Flex className="list-books-title">
            <a className="close-search" onClick={handleBackPage}>
              Back HomePage
            </a>
            <h1>Book Details</h1>
            {/* <div className="list-books-title"></div> */}
          </Flex>
        </Row>
        <div className="list-books-content">
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              margin: "20px 0",
            }}
          >
            <img id="book-image" src={book?.image} alt="Book Cover" />
          </div>
          <h2 style={{ display: "flex", justifyContent: "center" }}>
            Title:
            <span id="book-title"> {book?.title}</span>
          </h2>
          <div className="description" style={{ margin: "20px 20px" }}>
            <p id="book-description">
              <strong> ID: </strong>
              <span id="book-description">{book?.id}</span>
            </p>
            <p>
              <strong>Author: </strong>
              <span id="book-author">{book?.author}</span>
            </p>
            <p>
              <strong>Description: </strong>
              <span id="book-description">{book?.description}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookInf;
