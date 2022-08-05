import React, { useEffect, useState } from "react";
import ISingleDefinitionProps from "../../interfaces/ISingleDefinitionProps";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Definition from "../../models/definition";
import axios from "axios";
import DefinitionsHelper from "../../helpers/definitionsHelper";

const DefinitionDialog = ({
  idDefinitionProp,
  dataModeProp,
  openProp,
  onClosePopUp,
}: ISingleDefinitionProps) => {
  const [open, setOpen] = useState(openProp);
  const [idDefinition, setIdDefinition] = useState(idDefinitionProp);
  const [definition, setDefinition] = useState<Definition>(
    new Definition(0, "", "", "")
  );
  const [dataMode, setDataMode] = useState(dataModeProp);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClosePopUp(false);
  };

  useEffect(() => {
    if (openProp) {
      setOpen(openProp);
      setIdDefinition(idDefinitionProp);
      fetchDefinitionsById(idDefinition);
    }
  }, [openProp]);

  // Fetch all definitions of a language
  const fetchDefinitionsById = async (idDef: number) => {
    axios
      .get("http://localhost:5000/dictionary/definitionByIdDef", {
        params: { idDefinition: idDef },
      })
      .then((response) => {
        if (response && response.data) {
          setDefinition(DefinitionsHelper.loadDefinition(response.data[0]));
        }
      })
      .catch((error) =>
        console.error(
          `There was an error retrieving the defintions list: ${error}`
        )
      );
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Definition details</DialogTitle>
        <DialogContent>
          <DialogContentText>{definition.id}</DialogContentText>
          <DialogContentText>{definition.word}</DialogContentText>
          <DialogContentText>{definition.definition}</DialogContentText>
          <DialogContentText>{definition.translation}</DialogContentText>
          <TextField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Update</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DefinitionDialog;
