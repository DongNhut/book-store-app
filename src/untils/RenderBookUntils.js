/* eslint-disable react-hooks/rules-of-hooks */
import { useNavigate } from "react-router";
import options from "./untils";
import { editBookInfo } from "../BooksAPI";

const RenderBooksByShelf = (books, shelf, fetchBooks) => {
  const navigate = useNavigate();

  const handleShelfChange = (event, book) => {
    const newShelf = event.target.value;

    editBookInfo(book, newShelf)
      .then(() => {
        fetchBooks();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <div className="row">
        {books
          .filter((book) => book?.shelf === shelf)
          .map((book) => (
            <div className="col-4" key={book?.id}>
              <div className="book">
                <div className="book-top">
                  <div
                    className="book-cover"
                    style={{
                      width: 128,
                      height: 193,
                      backgroundImage: `url("${book?.imageLinks?.smallThumbnail}")`,
                    }}
                    onClick={() => {
                      navigate(`/details/${book?.id}`);
                    }}
                  ></div>
                  <div className="book-shelf-changer">
                    <select
                      value={book?.shelf}
                      onChange={(event) => handleShelfChange(event, book)}
                    >
                      <option value="none" disabled>
                        Move to...
                      </option>
                      {options.map((option) => (
                        <option key={option?.value} value={option?.value}>
                          {option?.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div className="book-title">{book?.title}</div>
                <div className="book-authors">{book?.authors.join(", ")}</div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default RenderBooksByShelf;
