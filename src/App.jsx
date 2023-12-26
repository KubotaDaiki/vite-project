import { Autocomplete } from "@aws-amplify/ui-react";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { generateClient } from "aws-amplify/api";
import * as React from "react";
import { useEffect, useState, useMemo } from "react";
import { Menu, MenuItem, Sidebar, SubMenu } from "react-pro-sidebar";
import "./App.css";
import { listTodos } from "./graphql/queries";
import { Sample } from "./ui-components";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import { Snackbar, Alert } from "@mui/material";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";

const client = generateClient();

function App() {
  const initialOpenDialog = {
    create: false,
    update: false,
    delete: false,
  };
  const [values, setValues] = useState([]);
  const [targetValue, setTargetValue] = useState({});
  const [openDialog, setOpenDialog] = React.useState(initialOpenDialog);
  const [snackbar, setSnackbar] = React.useState(null);

  const fieldItems = [
    { fieldName: "id", type: "TextField" },
    { fieldName: "name", type: "TextField" },
    { fieldName: "description", type: "TextField" },
    { fieldName: "category", type: "SelectField", options: ["A", "B"] },
  ];

  useEffect(() => {
    fetchTodos();
  }, []);

  async function fetchTodos() {
    try {
      const res = await client.graphql({
        query: listTodos,
      });
      const todos = res.data.listTodos.items;
      setValues(todos);
    } catch (err) {
      console.log("error fetching todos");
    }
  }

  function generateFieldSettings() {
    const fieldSettings = {};
    fieldItems.forEach(({ type, fieldName, options }) => {
      if (type === "TextField") {
        fieldSettings[fieldName] = {
          value: fieldName in targetValue ? targetValue[fieldName] : "",
          onChange: (e) => {
            updateTarget(fieldName, e.target.value);
          },
        };
      } else if (type === "SelectField") {
        fieldSettings[fieldName] = {
          value: fieldName in targetValue ? targetValue[fieldName] : "empty",
          onChange: (e) => {
            updateTarget(fieldName, e.target.value);
          },
          children: (
            <>
              <option key="empty" value="empty"></option>
              {...options.map((value) => (
                <option key={value} value={value} label={value}>
                  {value}
                </option>
              ))}
            </>
          ),
        };
      }
    });
    return fieldSettings;

    function updateTarget(key, newValue) {
      setTargetValue((oldValue) => {
        return { ...oldValue, [key]: newValue };
      });
    }
  }

  return (
    <main style={{ width: "100%" }}>
      <Autocomplete
        label="Autocomplete"
        options={values.map((value) => {
          return { id: value.id, label: value.name };
        })}
        onSelect={(selectValue) => {
          const target = values.find(
            (element) => selectValue.id === element.id
          );
          setTargetValue(target);
        }}
        placeholder="Search here..."
      />
      <Sample
        overrides={{
          Sample: { width: "100%" },
          ...generateFieldSettings(),
        }}
      ></Sample>
      <Button
        onClick={() =>
          setOpenDialog((oldValue) => {
            return { ...oldValue, create: true };
          })
        }
      >
        create
      </Button>
      <Button
        onClick={() =>
          setOpenDialog((oldValue) => {
            return { ...oldValue, update: true };
          })
        }
      >
        update
      </Button>
      <Button
        onClick={() =>
          setOpenDialog((oldValue) => {
            return { ...oldValue, delete: true };
          })
        }
      >
        delete
      </Button>
      <AlertDialog
        open={openDialog.create}
        text="データを追加します。よろしいですか？"
        handleOK={() => {
          setSnackbar({
            children: "追加完了しました",
            severity: "success",
          });
          setOpenDialog(initialOpenDialog);
        }}
        handleCancel={() => setOpenDialog(initialOpenDialog)}
      ></AlertDialog>
      <AlertDialog
        open={openDialog.update}
        text="データを更新します。よろしいですか？"
        handleOK={() => {
          setSnackbar({
            children: "更新完了しました",
            severity: "success",
          });
          setOpenDialog(initialOpenDialog);
        }}
        handleCancel={() => setOpenDialog(initialOpenDialog)}
      ></AlertDialog>
      <AlertDialog
        open={openDialog.delete}
        text="データを削除します。よろしいですか？"
        handleOK={() => {
          setSnackbar({
            children: "削除完了しました",
            severity: "success",
          });
          setOpenDialog(initialOpenDialog);
        }}
        handleCancel={() => setOpenDialog(initialOpenDialog)}
      ></AlertDialog>
      {snackbar && (
        <Snackbar
          open
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          onClose={() => setSnackbar(null)}
          autoHideDuration={6000}
        >
          <Alert {...snackbar} />
        </Snackbar>
      )}
      <Example></Example>
    </main>
  );
}

function AlertDialog({ open, handleOK, handleCancel, text }) {
  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {text}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOK}>OK</Button>
        <Button onClick={handleCancel}>キャンセル</Button>
      </DialogActions>
    </Dialog>
  );
}

const data = [
  {
    id: "12",
    firstName: "John",
    lastName: "Doe",
    address: "261 Erdman Ford",
    city: "East Daphne",
    state: "Kentucky",
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    address: "769 Dominic Grove",
    city: "Columbus",
    state: "Ohio",
  },
  {
    firstName: "Joe",
    lastName: "Doe",
    address: "566 Brakus Inlet",
    city: "South Linda",
    state: "West Virginia",
  },
  {
    firstName: "Kevin",
    lastName: "Vandy",
    address: "722 Emie Stream",
    city: "Lincoln",
    state: "Nebraska",
  },
  {
    firstName: "Joshua",
    lastName: "Rolluffs",
    address: "32188 Larkin Turnpike",
    city: "Charleston",
    state: "South Carolina",
  },
];

const Example = () => {
  const columns = useMemo(
    () => [
      {
        accessorKey: "firstName",
        header: "First Name",
      },
      {
        accessorKey: "lastName",
        header: "Last Name",
      },
    ],
    [data]
  );

  const table = useMaterialReactTable({
    columns,
    data: data,
    enableEditing: true,
    editDisplayMode: "modal",
    onEditingRowSave: ({ table, values }) => {
      // idを非表示するとvaluesからidを取得できないので、getStateから取得
      values["id"] = table.getState().editingRow.original.id;
      table.setEditingRow(null);
    },
  });

  return <MaterialReactTable table={table} />;
};

export default App;
