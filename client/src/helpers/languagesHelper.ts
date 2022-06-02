import Language from "../models/language";

/**
 * Transforms the data of type "any" to data of type "Language"
 */
class LanguagesHelper {
  static loadLanguagesList: (data: any) => Language[] = (data: any) => {
    if (data) {
      let languagesList = new Array<Language>();
      let language: Language;
      data.forEach((def: any) => {
        language = {
          id: def.id_language,
          label: def.libelle,
        };
        languagesList.push(language);
      });
      return languagesList;
    }
    return [];
  };
}

export default LanguagesHelper;
