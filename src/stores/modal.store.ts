// stores/modalStore.ts
import { create } from "zustand";

export enum ModalType {
  NULL = "null",
  NEW_PATIENT = "new_patient",
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ModalProps = Record<string, any>;

interface ModalStore {
  currentModal: ModalType;
  modalProps: ModalProps;
  openModal: (type: ModalType, props?: ModalProps) => void;
  closeModal: () => void;
}

export const useModalStore = create<ModalStore>((set) => ({
  currentModal: ModalType.NULL,
  modalProps: {},
  openModal: (type, props = {}) =>
    set({ currentModal: type, modalProps: props }),
  closeModal: () => set({ currentModal: ModalType.NULL, modalProps: {} }),
}));
