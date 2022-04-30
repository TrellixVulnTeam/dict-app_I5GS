// Import database
const knexController = require("./../db.ts");
// Retrieve all definitions
exports.definitionAll = async (req, res) => {
  // Get all definitions from database
  knexController
    .select("*") // select all records
    .from("definition") // from 'definitions' table
    .then((userData) => {
      // Send books extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving definitions: ${err}`,
      });
    });
};

// Retrieve all languages
exports.languageAll = async (req, res) => {
  // Get all languages from database
  knexController
    .select("*") // select all records
    .from("languages") // from 'languages' table
    .then((userData) => {
      // Send languages extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({ message: `There was an error retrieving languages: ${err}` });
    });
};

// Retrieve all definitions of a language
exports.definitionsByLanguage = async (req, res) => {
  // Get all languages from database
  knexController
    .where("id_language", Number(req.query.idLanguage))
    .select("*") // select all records
    .from("definition") // from 'definitions' table
    .then((userData) => {
      // Send languages extracted from database in response
      res.json(userData);
    })
    .catch((err) => {
      // Send a error message in response
      res.json({
        message: `There was an error retrieving definitions: ${err}`,
      });
    });
};
