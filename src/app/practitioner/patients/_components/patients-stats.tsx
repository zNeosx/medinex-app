import React from "react";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Patient } from "@/types/patient";
import { Calendar, CircleAlert, User, Users } from "lucide-react";

type Props = {
  patients: Patient[];
};

const PatientsStats = ({ patients }: Props) => {
  const today = new Date();
  return (
    // <div className="my-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Total patients
            </CardTitle>
            <CardDescription>
              <Users size={20} />
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{patients.length}</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Nouveau ce mois-ci
            </CardTitle>
            <CardDescription>
              <User size={20} />
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">
            {
              patients.filter((p) => p.createdAt.getMonth === today.getMonth)
                .length
            }
          </span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Rendez-vous à venir
            </CardTitle>
            <CardDescription>
              <Calendar size={20} />
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">N/A</span>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-medium">
              Examens en cours
            </CardTitle>
            <CardDescription>
              <CircleAlert size={20} />
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">N/A</span>
        </CardContent>
      </Card>
    </div>
  );
};

export default PatientsStats;
