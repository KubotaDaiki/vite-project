import { Autocomplete } from "@aws-amplify/ui-react";
import CancelIcon from "@mui/icons-material/Close";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import { DataGrid, GridActionsCellItem, GridRowModes } from "@mui/x-data-grid";
import { generateClient } from "aws-amplify/api";
import * as React from "react";
import { useEffect, useState } from "react";
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

const client = generateClient();

function App() {
  const [collapsed, setCollapsed] = useState(window.innerWidth < 800);
  const [values, setValues] = useState([]);
  const [targetValue, setTargetValue] = useState({});
  const [open, setOpen] = React.useState(false);
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

  /**
   * 折りたたまれたサイドバーの中身が画面サイズを超える場合のスクロールを有効化する
   * @param {number} level 階層の深さ
   * @returns スクロール用のCSS
   */
  function enableCollapsedSidebarScrollable(level) {
    // トップレベルの要素以外にスクロール設定をすると挙動が少しおかしくなるので、level === 0としている。
    if (level === 0 && collapsed) {
      return {
        overflowY: "auto",
        maxHeight: "80vh",
      };
    } else {
      return undefined;
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
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar collapsed={collapsed}>
        <Menu
          menuItemStyles={{
            subMenuContent: ({ level, active, disabled }) => {
              return {
                width: level === 0 && collapsed ? "300px" : undefined,
                ...enableCollapsedSidebarScrollable(level),
              };
            },
          }}
        >
          <SubMenu label="Charts">
            <SubMenu label="Charts">
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
              <MenuItem> Pie charts</MenuItem>
              <MenuItem> Line charts</MenuItem>
              <MenuItem> Bar charts</MenuItem>
            </SubMenu>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
            <MenuItem> Pie charts</MenuItem>
            <MenuItem> Line charts</MenuItem>
            <MenuItem> Bar charts</MenuItem>
          </SubMenu>
          <SubMenu label="Maps">
            <MenuItem> Google maps</MenuItem>
            <MenuItem> Open street maps</MenuItem>
          </SubMenu>
          <SubMenu label="Theme">
            <MenuItem> Dark</MenuItem>
            <MenuItem> Light</MenuItem>
          </SubMenu>
        </Menu>
      </Sidebar>
      <main style={{ width: "100%" }}>
        <button onClick={() => setCollapsed(!collapsed)}>Collapse</button>
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
        <Button onClick={() => setOpen(true)}>Sample</Button>
        <AlertDialog
          open={open}
          text="データを登録します。よろしいですか？"
          handleOK={() => {
            setSnackbar({
              children: "登録完了しました",
              severity: "success",
            });
            setOpen(false);
          }}
          handleCancel={() => setOpen(false)}
        ></AlertDialog>
        {!!snackbar && (
          <Snackbar
            open
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            onClose={() => setSnackbar(null)}
            autoHideDuration={6000}
          >
            <Alert {...snackbar} />
          </Snackbar>
        )}
        <FullFeaturedCrudGrid></FullFeaturedCrudGrid>
      </main>
    </div>
  );
}

export default App;

const initialRows = [
  {
    id: "1",
    name: "aaaaf",
    age: 25,
  },
  {
    id: "2",
    name: "aaaaf",
    age: 36,
  },
  {
    id: "3",
    name: "aaaaf",
    age: 19,
  },
  {
    id: "4",
    name: "aaaaf",
    age: 28,
  },
  {
    id: "5",
    name: "aaaaf",
    age: 23,
  },
];

function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });
  };

  const columns = [
    { field: "name", headerName: "名前", width: 180, editable: false },
    {
      field: "age",
      headerName: "Age",
      type: "number",
      width: 80,
      editable: true,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      width: 100,
      cellClassName: "actions",
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              sx={{
                color: "primary.main",
              }}
              onClick={handleSaveClick(id)}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelClick(id)}
              color="inherit"
            />,
          ];
        } else {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />,
          ];
        }
      },
    },
  ];

  return (
    <DataGrid
      rows={rows}
      columns={columns}
      editMode="row"
      rowModesModel={rowModesModel}
      processRowUpdate={(updatedRow, originalRow) => {
        console.log(updatedRow);
        console.log(originalRow);
        return updatedRow;
      }}
      onProcessRowUpdateError={(error) => console.log(error)}
      autoHeight
      sx={{ fontSize: "1rem" }}
    />
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
