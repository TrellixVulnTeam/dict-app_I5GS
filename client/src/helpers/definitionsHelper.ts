import Definition from "../models/definition";

/**
 * Transforms the data of type "any" to data of type "Definition"
 */
class DefinitionsHelper {
  // For list of data
  static loadDefinitionsList: (data: any) => Definition[] = (data: any) => {
    if (data) {
      let definitionsList = new Array<Definition>();
      let definition: Definition;
      data.forEach((def: any) => {
        definition = {
          id: def.id_def,
          word: def.word,
          definition: def.definition,
          translation: def.translation,
        };
        definitionsList.push(definition);
      });
      return definitionsList;
    }
    return [];
  };

  //For one data object
  static loadDefinition: (data: any) => Definition = (data: any) => {
    if (data) {
      let definition = new Definition(
        data.id_def,
        data.word,
        data.definition,
        data.translation
      );
      return definition;
    }
    return { id: 0, word: "", definition: "", translation: "" };
  };
}

export default DefinitionsHelper;
