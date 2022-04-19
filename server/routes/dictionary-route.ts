// Import express
const expressRoute = require("express");

// Import books-controller
const definitionRoutes = require("./../controllers/dictionary-controller.ts");

// Create router
const router = expressRoute.Router();

// Add route for GET request to retrieve all book
// In server.js, books route is specified as '/books'
// this means that '/all' translates to '/books/all'
router.get("/all", definitionRoutes.definitionAll);

// Export router
module.exports = router;
