import { useEffect, useState } from "react";
import Header from "./Header";
import { useNavigate } from "react-router";
import Shelf from "./Shelf";
import { getBooks } from "../BooksAPI";
import { Button } from "antd";

const ListBook = () => {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);

  const fetchBooks = async () => {
    try {
      const booksData = await getBooks();
      setBooks(booksData);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleChangePageSearch = () => {
    navigate("/search");
  };

  return (
    <>
      <div className="w-full d-flex justify-content-between align-items-center">
        <Header />
        <Button type="primary" onClick={handleChangePageSearch}>
          Search Book
        </Button>
      </div>

      <div className="list-books">
        <div className="list-books-content">
          <div className="container">
            <div className="align-items-start">
              <Shelf
                books={books}
                shelfTitle="Currently Reading"
                shelfType="currentlyReading"
                fetchBooks={fetchBooks}
              />

              <Shelf
                books={books}
                shelfTitle="Want to Read"
                shelfType="wantToRead"
                fetchBooks={fetchBooks}
              />

              <Shelf
                books={books}
                shelfTitle="Read"
                shelfType="read"
                fetchBooks={fetchBooks}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ListBook;
