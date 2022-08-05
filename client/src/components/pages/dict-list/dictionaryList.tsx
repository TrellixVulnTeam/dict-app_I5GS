import React, { useEffect, useState } from "react";
import axios from "axios";
import Definition from "../../../models/definition";
import Language from "../../../models/language";
import SelectLanguage from "../../selectLanguage/selectLanguage";
import DataTable from "../../data-table/dataTable";
import LanguagesHelper from "../../../helpers/languagesHelper";
import DefinitionsHelper from "../../../helpers/definitionsHelper";
import DefinitionDialog from "../../definitionDialog/definitionDialog";

export const DictionaryList = () => {
  // Prepare states
  const [definitions, setDefinitions] = useState<Array<Definition>>([]);
  const [languages, setLanguages] = useState<Array<Language>>([]);
  const [selectedLanguageId, setSelectedLanguageId] = useState(0);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [idDefinitionSelected, setIdDefinitionSelected] = useState(0);

  // Fetch all languages on initial render, fetch definitions according to the selected language
  useEffect(() => {
    (async () => {
      try {
        await fetchAllLanguages();

        if (selectedLanguageId) {
          await fetchDefinitionsByLanguage(selectedLanguageId);
        } else {
          await fetchAllDefinitions();
        }
      } catch (error) {
        console.error(
          `There was an error while trying to initialize the state: ${error}`
        );
      }
    })();
  }, [selectedLanguageId]);

  // Fetch all definitions
  const fetchAllDefinitions = () => {
    axios
      .get("http://localhost:5000/dictionary/allDefinitions")
      .then((response) => {
        if (response) {
          setDefinitions([
            ...DefinitionsHelper.loadDefinitionsList(response.data),
          ]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error(
          `There was an error retrieving the definitions list: ${error}`
        );
      });
  };

  // Fetch all languages
  const fetchAllLanguages = async () => {
    axios
      .get("http://localhost:5000/dictionary/allLanguages")
      .then((response) => {
        if (response) {
          setLanguages([...LanguagesHelper.loadLanguagesList(response.data)]);
          setLoading(false);
        }
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the languages list: ${error}`
        )
      );
  };

  // Fetch all definitions of a language
  const fetchDefinitionsByLanguage = async (idLang: number) => {
    axios
      .get("http://localhost:5000/dictionary/definitionsByLanguage", {
        params: { idLanguage: idLang },
      })
      .then((response) => {
        setDefinitions([
          ...DefinitionsHelper.loadDefinitionsList(response.data),
        ]);
        setLoading(false);
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the defintions list: ${error}`
        )
      );
  };

  const openPopUp = (value: number) => {
    setIdDefinitionSelected(value);
    setIsOpen(true);
  };

  {
    if (isOpen != true) {
      return (
        <div>
          <SelectLanguage
            languages={languages}
            onChange={(value: number) => setSelectedLanguageId(value)}
          />
          <DataTable
            definitions={definitions}
            selectDefinition={(value: number) => openPopUp(value)}
          />
        </div>
      );
    } else {
      return (
        <div>
          <SelectLanguage
            languages={languages}
            onChange={(value: number) => setSelectedLanguageId(value)}
          />
          <DataTable
            definitions={definitions}
            selectDefinition={(value: number) => openPopUp(value)}
          />
          <DefinitionDialog
            openProp={isOpen}
            idDefinitionProp={idDefinitionSelected}
            dataModeProp={0}
            onClosePopUp={(value: boolean) => setIsOpen(value)}
          />
        </div>
      );
    }
  }
};
