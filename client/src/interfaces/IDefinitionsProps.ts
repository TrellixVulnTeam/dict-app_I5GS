import Definition from "../models/definition";
import Language from "../models/language";

interface IDefinitionsProps {
  definitions: Array<Definition>;

  selectDefinition: (value: number) => void;
}

export default IDefinitionsProps;
