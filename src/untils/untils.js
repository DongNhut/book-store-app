import { searchBook } from "../BooksAPI";

const options = [
  { value: "currentlyReading", label: "Currently Reading" },
  { value: "wantToRead", label: "Want to Read" },
  { value: "read", label: "Read" },
  { value: "none", label: "None" },
];
export default options;

export async function handleSearch(item, setBooks, setListBook) {
  try {
    if (item !== "") {
      const searchResults = await searchBook(item);
      setBooks(searchResults);
      if (Array.isArray(searchResults)) {
        const dataBooks = searchResults
          .filter((book) => book?.imageLinks && book?.imageLinks?.thumbnail)
          .map((book) => ({
            id: book?.id ? book.id : "",
            title: book.title ? book.title : "",
            author: book?.authors?.join(", "),
            image: book?.imageLinks?.thumbnail,
          }));
        setListBook([...dataBooks]);
      } else {
        setListBook([]);
        setBooks([]);
      }
    } else {
      setBooks([]);
      setListBook([]);
    }
  } catch (error) {
    console.log(error);
  }
}
