import React from "react";
import RenderBooksByShelf from "../untils/RenderBookUntils";

const Shelf = ({ books, shelfTitle, shelfType, fetchBooks }) => {
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{shelfTitle}</h2>
      <div className="bookshelf-books d-flex">
        {RenderBooksByShelf(books, shelfType, fetchBooks)}
      </div>
    </div>
  );
};

export default Shelf;
