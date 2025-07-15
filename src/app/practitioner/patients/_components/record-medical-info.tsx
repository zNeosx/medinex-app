import { Badge } from "@/components/ui/badge";
import { getPatientAlleryInfo } from "@/lib/utils";
import type { Patient } from "@/types/patient";
type Props = {
  patient: Patient;
};
const RecordMedicalInfo = ({ patient }: Props) => {
  return (
    <div className="my-4 grid grid-cols-2 gap-6">
      <div className="space-y-6">
        <div>
          <p>Groupe sanguin</p>
          <Badge variant={"outline"}>{patient.bloodType}</Badge>
        </div>
        <div>
          <p>Allergies</p>
          <div className="flex flex-wrap gap-3">
            {patient.allergies?.map((a) => (
              <Badge variant={getPatientAlleryInfo(a).badgeVariant} key={a.id}>
                {a.allergen}
              </Badge>
            ))}
          </div>
        </div>
        <div>
          <p>Conditions médicale</p>
          <div className="flex flex-wrap gap-3">
            {patient.medicalConditions?.map((m) => (
              <Badge variant={"outline"} key={m.id}>
                {m.conditionName}
              </Badge>
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <p>Assurance</p>
          <p>{patient.insuranceProvider}</p>
        </div>
      </div>
    </div>
  );
};

export default RecordMedicalInfo;
