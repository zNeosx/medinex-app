import { useModalStore } from "@/stores/modal.store";
import NewPatientModal from "./new-patient.modal";

export default function ModalRoot() {
  const { currentModal } = useModalStore();

  if (!currentModal) return null;

  return (
    <>
      <NewPatientModal />
    </>
  );
}
