import { useNavigate } from "react-router";
import { React, useState, useEffect } from "react";
import Book from "./Books";
import options from "../untils/untils";
import { editBookInfo, getBooks, searchBook } from "../BooksAPI";
import { Button, Input } from "antd";

const SearchBook = () => {
  const navigate = useNavigate();
  const [searchBooks, setSearchBooks] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    if (searchBooks?.trim() !== "") {
      searchBook(searchBooks)
        .then((data) => {
          const searchResultsWithShelf = data.map((book) => {
            const matchingBook = books.find((b) => b.id === book.id);
            if (matchingBook) {
              return { ...book, shelf: matchingBook.shelf };
            } else {
              return book;
            }
          });
          setSearchResults(searchResultsWithShelf);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      setSearchResults([]);
    }
  }, [searchBooks]);

  const handleShelfChange = (event, book) => {
    const newShelf = event.target.value;

    editBookInfo(book, newShelf)
      .then(() => {
        // Handle successful update
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChange = (e) => {
    setSearchBooks(e.target.value);
  };

  const handleBackPage = () => {
    navigate("/");
  };

  // Get the books from the main page
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks()
      .then((data) => {
        setBooks(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="search-books">
      <div className="p-4 d-flex justify-content-between align-items-center">
        <Button
          type="primary"
          className="close-search"
          onClick={handleBackPage}
        >
          Back
        </Button>
        <div className="d-flex justify-content-between align-items-center">
          <h5 style={{ marginRight: 16 }}>Search: </h5>
          <Input
            type="text"
            placeholder="Search by title, author, or ISBN"
            value={searchBooks}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container">
        <div className="row">
          {searchResults.length > 0 ? (
            searchResults.map((book) => (
              <div className="col-4" key={book.id}>
                <Book
                  book={book}
                  handleShelfChange={handleShelfChange}
                  options={options}
                />
              </div>
            ))
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchBook;
