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
import "./definitionDialog.css";
import DataModeEnum from "../const/dataModeEnum";
import { InputLabel } from "@mui/material";

const DefinitionDialog = ({
  idDefinitionProp,
  openProp,
  onClosePopUp,
}: ISingleDefinitionProps) => {
  const [open, setOpen] = useState(openProp);
  const [idDefinition, setIdDefinition] = useState(idDefinitionProp);
  const [definition, setDefinition] = useState<Definition>(
    new Definition(0, "", "", "")
  );
  const [dataMode, setDataMode] = useState(DataModeEnum.READ_MODE);

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

  //Commandes

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    onClosePopUp(false);
  };

  const beginUpdate = () => {
    setDataMode(DataModeEnum.MODIFY_MODE);
  };

  const handleCancel = () => {
    setDataMode(DataModeEnum.READ_MODE);
  };

  const save = () => {
    //
  };

  {
    if (dataMode === DataModeEnum.READ_MODE) {
      return (
        <>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>{definition.word}</DialogTitle>
            <DialogContent>
              <DialogContentText>{definition.definition}</DialogContentText>
              <div className="translation">
                <label>Translation</label>
                <DialogContentText>{definition.translation}</DialogContentText>
              </div>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Close</Button>
              <Button onClick={beginUpdate}>Update</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    } else {
      return (
        <>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Modification ...</DialogTitle>
            <DialogContent>
              <TextField
                id="txt-word"
                margin="dense"
                label="Word"
                value={definition.word}
                required
              />
              <br />
              <InputLabel required>Definition</InputLabel>
              <TextField
                id="txt-definition"
                margin="dense"
                value={definition.definition}
                required
              />
              <br />
              <TextField
                id="txt-translation"
                margin="dense"
                label="Translation"
                value={definition.translation}
                required
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={save}>Save</Button>
            </DialogActions>
          </Dialog>
        </>
      );
    }
  }
};

export default DefinitionDialog;
