import Language from "../models/language";

interface ILanguageProps {
  languages: Array<Language>;

  onChange: (value: number) => void;
}

export default ILanguageProps;
