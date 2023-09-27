"use client";

import React, { useEffect, useMemo, useState } from "react";

//MRT Imports
//import MaterialReactTable, { type MRT_ColumnDef } from 'material-react-table'; //default import deprecated
import { MaterialReactTable, type MRT_ColumnDef } from "material-react-table";

//Material UI Imports
import { Box, Button, ListItemIcon, MenuItem, Typography } from "@mui/material";

//Icons Imports
import { AccountCircle, Send } from "@mui/icons-material";

function fetchData() {
  fetch("http://localhost:8080/persons").then;
}

type Persons = {
  id: number;
  name: string;
  email: string;
  phone: string;
  address: {
    id: number;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
};

export default function UserPage() {
  const [personsData, setPersonsData] = useState<Persons[]>([]);

  function fetchData() {
    fetch("http://localhost:8080/persons")
      .then((result) => result.json())
      .then((data) => {
        setPersonsData(data);
        console.log(data);
      });
  }

  useEffect(() => {
    fetchData();
  }, []);

  const columns = useMemo<MRT_ColumnDef<Persons>[]>(
    () => [
      {
        accessorKey: "id",
        header: "Id",
      },
      {
        accessorKey: "name",
        header: "Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "phone",
        header: "Phone",
      },
    ],
    []
  );

  return (
    <MaterialReactTable
      columns={columns}
      data={personsData}
      enableColumnFilterModes
      enableColumnOrdering
      enableGrouping
      enablePinning
      enableRowActions
      enableRowSelection
      initialState={{ showColumnFilters: true }}
      positionToolbarAlertBanner="bottom"
      renderTopToolbarCustomActions={({ table }) => {
        const handleDeactivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert("deactivating " + row.getValue("name"));
          });
        };

        const handleActivate = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert("activating " + row.getValue("name"));
          });
        };

        const handleContact = () => {
          table.getSelectedRowModel().flatRows.map((row) => {
            alert("contact " + row.getValue("name"));
          });
        };

        return (
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Button
              color="error"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleDeactivate}
              variant="contained"
            >
              Deactivate
            </Button>
            <Button
              color="success"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleActivate}
              variant="contained"
            >
              Activate
            </Button>
            <Button
              color="info"
              disabled={!table.getIsSomeRowsSelected()}
              onClick={handleContact}
              variant="contained"
            >
              Contact
            </Button>
          </div>
        );
      }}
    />
  );
}
