import Definition from "../models/definition";
import Language from "../models/language";

interface IDefinitionsProps {
  definitions: Array<Definition>;

  onDoubleClick: (value: boolean) => void;
}

export default IDefinitionsProps;
