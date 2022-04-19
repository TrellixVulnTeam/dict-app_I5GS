// Import deps
import React, { useEffect, useState } from "react";
import axios from "axios";

// Create Bookshelf component
export const App = () => {
  // Prepare states
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all books on initial render
  useEffect(() => {
    fetchBooks();
  }, []);

  // Fetch all books
  const fetchBooks = async () => {
    // Send GET request to 'books/all' endpoint
    axios
      .get("http://localhost:5000/dictionary/all")
      .then((response) => {
        // Update the books state
        setBooks(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch((error) =>
        console.error(`There was an error retrieving the book list: ${error}`)
      );
  };

  return <div className="book-list-wrapper"></div>;
};
