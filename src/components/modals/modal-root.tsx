import { useModalStore } from "@/stores/modal.store";
import NewPatientModal from "./new-patient.modal";
import PatientRecordDetailsModal from "./patient-record-detail.modal";

export default function ModalRoot() {
  const { currentModal } = useModalStore();

  if (!currentModal) return null;

  return (
    <>
      <NewPatientModal />
      <PatientRecordDetailsModal />
    </>
  );
}
