"use client";

import { getAge } from "@/lib/utils";
import type { Patient } from "@/types/patient";
import type { ColumnDef } from "@tanstack/react-table";

export const patientColumns: ColumnDef<Patient>[] = [
  {
    accessorKey: "patient",
    header: "Patient",
    cell: ({ row }) => {
      console.log("row", row);
      return (
        <div className="font-medium">
          {row.original.firstName} {row.original.lastName}
        </div>
      );
    },
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      return <div className="font-medium">{row.original.phone}</div>;
    },
  },
  {
    accessorKey: "dateOfBirth",
    header: "Age",
    cell: ({ row }) => {
      return (
        <div className="font-medium">{getAge(row.getValue("dateOfBirth"))}</div>
      );
    },
  },
  {
    accessorKey: "bloodType",
    header: "Groupe sanguin",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("bloodType")}</div>;
    },
  },
  {
    accessorKey: "lastVisit",
    header: "Dernière visite",
    cell: ({ row }) => {
      return <div className="font-medium">N/A</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      return <div className="font-medium">{row.getValue("bloodType")}</div>;
    },
  },
];
