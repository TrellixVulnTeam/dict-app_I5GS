import DataModeEnum from "../components/const/dataModeEnum";
import Definition from "../models/definition";

interface ISingleDefinitionProps {
  idDefinitionProp: number;
  openProp: boolean;

  onClosePopUp: (value: boolean) => void;
}

export default ISingleDefinitionProps;
