import React from "react";
import { useNavigate } from "react-router";

const Book = ({ book, handleShelfChange, options }) => {
  const navigate = useNavigate();

  const getDefaultShelf = () => {
    return book?.shelf || "none";
  };

  return (
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
            value={getDefaultShelf()}
            onChange={(event) => handleShelfChange(event, book)}
          >
            <option value="move" disabled>
              Move to...
            </option>
            {options?.map((option) => (
              <option key={option?.value} value={option?.value}>
                {option?.label}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="book-title">{book?.title}</div>
      <div className="book-authors">{book?.authors?.join(", ")}</div>
    </div>
  );
};

export default Book;
