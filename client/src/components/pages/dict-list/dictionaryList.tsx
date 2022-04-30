// Import deps
import React, { useEffect, useState } from "react";
import axios from "axios";
import Definition from "../../../models/definition";
import Language from "../../../models/language";
import SelectLanguage from "../../selectLanguage/selectLanguage";

// Create Dictionary component
export const DictionaryList = () => {
  // Prepare states
  let [definitions, setDefinitions] = useState<Array<Definition>>([]);
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [definitionsByLanguage, setDefinitionsByLanguage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // Fetch all books on initial render
  useEffect(() => {
    (async () => {
      await fetchLanguages();
    })();
  }, []);

  // Fetch all definitions
  const fetchDefinitions = () => {
    // Send GET request to 'dictionary/allDefinitions' endpoint
    axios
      .get("http://localhost:5000/dictionary/allDefinitions")
      .then((response) => {
        if (response) {
          setDefinitions([...loadDefinitionsList(response.data)]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(
          `There was an error retrieving the definitions list: ${error}`
        );
      });
  };

  const loadDefinitionsList = (data: any): Definition[] => {
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

  // Fetch all languages
  const fetchLanguages = async () => {
    // Send GET request to 'dictionary/allLanguages' endpoint
    axios
      .get("http://localhost:5000/dictionary/allLanguages")
      .then((response) => {
        // Update the languages state
        if (response) {
          setLanguages([...loadLanguagesList(response.data)]);
          // Update loading state
          setLoading(false);
        }
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the languages list: ${error}`
        )
      );
  };

  const loadLanguagesList = (data: any): Language[] => {
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

  // Fetch all definitions of a language
  const fetchDefinitionsByLanguage = async () => {
    // Send GET request to 'dictionary/definitionsByLanguage' endpoint
    axios
      .get("http://localhost:5000/dictionary/definitionsByLanguage", {
        params: { idLanguage: 1 },
      })
      .then((response) => {
        // Update the definitions state
        setDefinitionsByLanguage(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the defintions list: ${error}`
        )
      );
  };

  return (
    <div>
      <SelectLanguage languages={languages} />
    </div>
  );
};
