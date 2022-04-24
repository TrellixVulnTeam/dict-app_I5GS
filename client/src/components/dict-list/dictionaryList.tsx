// Import deps
import React, { useEffect, useState } from "react";
import axios from "axios";
import Definition from "../../models/definition";
import Language from "../../models/language";

// Create Dictionary component
export const DictionaryList = () => {
  // Prepare states
  const [definitions, setDefinitions] = useState<Array<Definition>>([]);
  const [languages, setLanguages] = useState([]);
  const [definitionsByLanguage, setDefinitionsByLanguage] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  // Fetch all books on initial render
  useEffect(() => {
    (async () => {
      await fetchLanguages();
      await fetchDefinitions();
      await fetchDefinitionsByLanguage();
      setTimeout(() => {
        console.log("5s", definitions);
      }, 5000);
    })();
  }, []);

  // Fetch all definitions
  const fetchDefinitions = async () => {
    // Send GET request to 'dictionary/allDefinitions' endpoint
    axios
      .get("http://localhost:5000/dictionary/allDefinitions")
      .then((response) => {
        console.log("res", response);
        setCount(response?.data?.length);
        setDefinitions([...loadDefinitionsList(response.data)]);
        console.log("definitions", definitions);
        setLoading(false);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the definitions list: ${error}`
        )
      );
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
      console.log("aaaaa", definitionsList);
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
        setLanguages(response.data);

        // Update loading state
        setLoading(false);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the languages list: ${error}`
        )
      );
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
      <>
        <h2>Dictionary List</h2>
        <div>
          <>
            {definitions?.forEach((def: any) => {
              <label>{def.id}</label>;
            })}
          </>
        </div>
        <h3>{count}</h3>
      </>
    </div>
  );
};
