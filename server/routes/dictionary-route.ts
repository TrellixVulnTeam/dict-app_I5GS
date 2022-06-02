// Import express
const expressRoute = require("express");

// Import books-controller
const definitionRoutes = require("./../controllers/dictionary-controller.ts");

// Create router
const router = expressRoute.Router();

// Add route for GET request to retrieve all definitions
// In server.ts, dictionary route is specified as '/dictionary'
// this means that '/all' translates to '/dictionary/allDefinitions'
router.get("/allDefinitions", definitionRoutes.definitionAll);

// Add route for GET request to retrieve all languages
// In server.ts, dictionary route is specified as '/dictionary'
// this means that '/all' translates to '/dictionary/allLanguages'
router.get("/allLanguages", definitionRoutes.languageAll);

// Add route for GET request to retrieve all definitions of a language
// In server.ts, dictionary route is specified as '/dictionary'
// this means that '/definitionsByLanguage' translates to '/dictionary/definitionsByLanguage'
router.get("/definitionsByLanguage", definitionRoutes.definitionsByLanguage);

//Route to Get Definition by IdDef
router.get("/definitionByIdDef", definitionRoutes.definitionByIdDef);

// Export router
module.exports = router;
