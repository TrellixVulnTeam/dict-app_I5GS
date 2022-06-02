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

const DefinitionDialog = ({
  definitionProp,
  dataModeProp,
  openProp,
}: ISingleDefinitionProps) => {
  const [open, setOpen] = useState(openProp);
  const [definition, setDefinition] = useState<Definition>(definitionProp);
  const [dataMode, setDataMode] = useState(dataModeProp);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    console.log("in dialog");
  });

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            To subscribe to this website, please enter your email address here.
            We will send updates occasionally.
          </DialogContentText>
          <TextField />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button>Subscribe</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DefinitionDialog;
