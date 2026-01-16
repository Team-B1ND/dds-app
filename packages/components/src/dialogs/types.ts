export interface BaseDialogProps {
  open: boolean;
  title: string;
  description?: string;
  closeOnDimmerClick?: boolean;
  onClose?: () => void;
  onExited?: () => void;
}

export interface AlertDialogProps extends BaseDialogProps {
  buttonText?: string;
}

export interface ConfirmDialogProps extends BaseDialogProps {
  children?: React.ReactNode;
}
