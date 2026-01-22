import { Modal as RNModal, type ModalProps } from 'react-native';

export const Modal = (props: ModalProps) => (
  <RNModal transparent statusBarTranslucent {...props} />
);
