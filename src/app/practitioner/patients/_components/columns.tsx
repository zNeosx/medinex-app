/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getAge, getPatientStatusInfo } from "@/lib/utils";
import type { PatientWithEmail } from "@/types/patient";
import type { ColumnDef, FilterFn } from "@tanstack/react-table";
import { Eye, Mail, Phone } from "lucide-react";

const multiColumnFilterFn: FilterFn<PatientWithEmail> = (
  row,
  columnId,
  filterValue,
) => {
  console.log("filterValue", filterValue);
  const searchableRowContent =
    `${row.original.firstName} ${row.original.lastName} ${row.original.email} ${row.original.phone}`.toLowerCase();
  console.log("searchableRowContent", searchableRowContent);
  const searchTerm = (filterValue ?? "").toLowerCase();
  return searchableRowContent.includes(searchTerm);
};

const statusFilterFn: FilterFn<PatientWithEmail> = (
  row,
  columnId,
  filterValue: string[],
) => {
  if (!filterValue?.length) return true;
  const status: string = row.getValue(columnId);
  return filterValue.includes(status);
};

export const getPatientColumns = (
  onViewDetails: (patient: PatientWithEmail) => void,
): ColumnDef<PatientWithEmail>[] => [
  {
    accessorKey: "patient",
    enableColumnFilter: true,
    header: "Patient",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.firstName} {row.original.lastName}
        </div>
      );
    },
    filterFn: multiColumnFilterFn,
  },
  {
    accessorKey: "contact",
    header: "Contact",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          {row.original.email ? (
            <div className="flex items-center gap-2">
              <Mail size={12} />
              <p>{row.original.email}</p>
            </div>
          ) : null}
          <div className="flex items-center gap-2">
            <Phone size={12} />
            <p>{row.original.phone}</p>
          </div>
        </div>
      );
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
      return (
        <div className="font-medium">
          <Badge variant={"outline"}>{row.getValue("bloodType")}</Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "lastVisit",
    header: "Dernière visite",
    cell: () => {
      return <div className="font-medium">N/A</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const patientStatusInfo = getPatientStatusInfo(row.getValue("status"));
      return (
        <div className="font-medium">
          <Badge variant={patientStatusInfo.badgeVariant}>
            {patientStatusInfo.translatedStatus}
          </Badge>
        </div>
      );
    },
    filterFn: statusFilterFn,
  },
  {
    accessorKey: "_id",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <div className="font-medium">
          <Button
            variant={"outline"}
            onClick={() => onViewDetails(row.original)}
          >
            <Eye /> <span className="sr-only">Voir détails</span>
          </Button>
        </div>
      );
    },
  },
];
