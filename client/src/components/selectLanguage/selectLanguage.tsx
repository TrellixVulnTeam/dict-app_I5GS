import {
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ILanguageProps from "../../interfaces/ILanguagesProps";
import Language from "../../models/language";

const SelectLanguage = ({ languages, onChange }: ILanguageProps) => {
  const defaultAllLanguages = new Language(0, "All");
  const [selectedLanguageId, setSelectedLanguageId] = useState(0);
  const [languagesList, setLanguagesList] = useState<Language[]>([
    defaultAllLanguages,
    ...languages,
  ]);

  useEffect(() => {
    setLanguagesList(
      [...languages, new Language(0, "All")]?.sort((x, y) =>
        x?.label > y?.label ? 1 : -1
      )
    );
  }, [languages]);

  const handleChange = (event: SelectChangeEvent<number>) => {
    setSelectedLanguageId(event.target.value as number);
    onChange(event.target.value as number);
  };

  return (
    <div>
      <FormControl sx={{ m: 1, width: 300 }}>
        <InputLabel id="languages-label">Language</InputLabel>
        <Select
          labelId="languages-label"
          id="languages-combobox"
          value={selectedLanguageId}
          onChange={handleChange}
          input={<OutlinedInput label="Language" />}
        >
          {languagesList.map((language) => (
            <MenuItem
              key={language.id}
              value={language.id}
              //style={getStyles(name, personName, theme)}
            >
              {language.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  );
};

export default SelectLanguage;
