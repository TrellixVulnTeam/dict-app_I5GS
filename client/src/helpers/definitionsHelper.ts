import Definition from "../models/definition";

/**
 * Transforms the data of type "any" to data of type "Definition"
 */
class DefinitionsHelper {
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
}

export default DefinitionsHelper;
