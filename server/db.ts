// Import path module
const path = require("path");

// Get the location of database.sqlite file
const dbPath = path.resolve(__dirname, "db/dictionary.sqlite");

// Create connection to SQLite database
const knex = require("knex")({
  client: "sqlite3",
  connection: {
    filename: dbPath,
  },
  useNullAsDefault: true,
});

// Create a table in the database called "language"
knex.schema
  // Make sure no "language" table exists
  // before trying to create new
  .hasTable("languages")
  .then((exists) => {
    if (!exists) {
      // If no "lanuage" table exists
      // create new, with "id", "libelle"
      return knex.schema
        .createTable("languages", (table) => {
          table.increments("id_language").primary();
          table.string("libelle");
        })
        .then(() => {
          // Log success message
          console.log("Table 'Languages' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Create a table in the database called "definition"
knex.schema
  // Make sure no "definition" table exists
  // before trying to create new
  .hasTable("definition")
  .then((exists) => {
    if (!exists) {
      // If no "definition" table exists
      // create new, with "id", "word", "definition",
      // "translation" and "id_language" columns
      // and use "id" as a primary identification
      // and increment "id" with every new record (definition)
      return knex.schema
        .createTable("definition", (table) => {
          table.increments("id_def").primary();
          table.string("word");
          table.string("definition", 5000);
          table.string("translation", 3000);
          table
            .integer("id_language")
            .references("id_language")
            .inTable("languages")
            .notNull()
            .onDelete("cascade");
        })
        .then(() => {
          // Log success message
          console.log("Table 'Definition' created");
        })
        .catch((error) => {
          console.error(`There was an error creating table: ${error}`);
        });
    }
  })
  .then(() => {
    // Log success message
    console.log("done");
  })
  .catch((error) => {
    console.error(`There was an error setting up the database: ${error}`);
  });

// Just for debugging purposes:
// Log all data in "definition" table
knex
  .select("*")
  .from("definition")
  .then((data) => console.log("definitions:", data))
  .catch((err) => console.log(err));

// Log all data in "language" table
knex
  .select("*")
  .from("languages")
  .then((data) => console.log("languages:", data))
  .catch((err) => console.log(err));

// Export the database
module.exports = knex;
