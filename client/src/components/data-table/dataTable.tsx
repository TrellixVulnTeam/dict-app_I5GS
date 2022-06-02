import React, { useEffect, useState } from "react";
import { DataGrid, GridCellParams, MuiEvent } from "@mui/x-data-grid";
import IDefinitionsProps from "../../interfaces/IDefinitionsProps";
import Button from "@mui/material/Button";
import DefinitionDialog from "../definitionDialog/definitionDialog";
import Definition from "../../models/definition";

const DataTable = ({ definitions, onDoubleClick }: IDefinitionsProps) => {
  const columns = [
    { field: "id", headerName: "ID", width: 30 },
    { field: "word", headerName: "Word", width: 150 },
    { field: "definition", headerName: "Definition", width: 700 },
    { field: "translation", headerName: "Translation", width: 230 },
    {
      field: "action",
      headerName: "Action",
      sortable: false,
      renderCell: (params: any) => {
        const onClick = (e: any) => {
          console.log("params", params);
          console.log("e", e);
          e.stopPropagation(); // don't select this row after clicking

          const currentRow = params.row;

          console.log("row", currentRow);
          return alert(JSON.stringify(currentRow, null, 4));
        };
        return <Button onClick={onClick}>Delete</Button>;
      },
    },
  ];
  const userTableStyles = {
    height: "650px",
    width: "1190px",
    m: 1,
  };

  const [pageSize, setPageSize] = useState(10);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);

  function openDetailsAndUpdateDialog(
    params: GridCellParams<any, any, any>,
    event: MuiEvent<React.MouseEvent<HTMLElement, MouseEvent>>
  ) {
    if (!event.ctrlKey) {
      event.defaultMuiPrevented = true;
    }
    console.log("params", params);
    setIsDoubleClicked(true);
    onDoubleClick(isDoubleClicked);
  }

  return (
    <>
      <DataGrid
        rows={definitions}
        columns={columns}
        sx={userTableStyles}
        checkboxSelection
        onCellDoubleClick={(params, event) =>
          openDetailsAndUpdateDialog(params, event)
        }
        pagination
        pageSize={pageSize}
        onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
        rowsPerPageOptions={[2, 5, 10]}
      />
    </>
  );
};

export default DataTable;
