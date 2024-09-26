import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ListBook from "./components/ListBooks";
import SearchBook from "./components/SearchBook";
import BookInf from "./components/BookInf";
import NotFound from "./components/NotFound";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<NotFound />} />
        <Route path="/" element={<ListBook />} />
        <Route path="/search" element={<SearchBook />} />
        <Route path="/details/:id" element={<BookInf />} />
      </Routes>
    </Router>
  );
}

export default App;
