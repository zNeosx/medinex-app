import { Badge } from "@/components/ui/badge";
import { getPatientStatusInfo } from "@/lib/utils";
import type { Patient } from "@/types/patient";
import { MapPin } from "lucide-react";
import React from "react";
type Props = {
  patient: Patient;
};
const RecordOverview = ({ patient }: Props) => {
  const patientStatusInfo = getPatientStatusInfo(patient.status);

  return (
    <div className="my-4 grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <p>Date de naissance</p>
          <p>{patient.dateOfBirth.toDateString()}</p>
        </div>
        <div>
          <p>Dernière visite</p>
          <p>N/A</p>
        </div>
        <div>
          <p>Adresse</p>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <p>
              {patient.address}, {patient.postalCode} {patient.city}
            </p>
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p>Status</p>
          <Badge variant={patientStatusInfo.badgeVariant}>
            {patientStatusInfo.translatedStatus}
          </Badge>
        </div>
        <div>
          <p>Prochaine visite</p>
          <p>N/A</p>
        </div>
      </div>
    </div>
  );
};

export default RecordOverview;
