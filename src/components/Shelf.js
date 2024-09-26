import React from "react";
import RenderBooksByShelf from "../untils/RenderBookUntils";

const Shelf = ({ books, shelfTitle, shelfType, fetchBooks }) => {
  return (
    <div>
      <h2>{shelfTitle}</h2>
      <div className="d-flex">
        {RenderBooksByShelf(books, shelfType, fetchBooks)}
      </div>
    </div>
  );
};

export default Shelf;
