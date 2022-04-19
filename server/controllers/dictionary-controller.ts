// Import database
const knexController = require("./../db.ts");
console.log("knexController", knexController);
// Retrieve all books
exports.definitionAll = async (req, res) => {
  // Get all books from database
  knexController
    .select("*") // select all records
    .from("definition") // from 'books' table
    .then((userData) => {
      // Send books extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving books: ${err}` });
    });
};
