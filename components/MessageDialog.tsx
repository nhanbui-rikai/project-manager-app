import React from "react";
import MessageBox from "./Dialog";
import Button from "@/components/Button";

interface MessageDialogProps {
  open: boolean;
  loading: boolean;
  title?: string;
  onConfirm: () => void;
  onClose: () => void;
}

const MessageDialog: React.FC<MessageDialogProps> = ({ open, loading, title, onConfirm, onClose }) => {
  return (
    <MessageBox title={title} open={open} onClose={onClose}>
      <Button loading={loading} onClick={onConfirm} name="Confirm" className="bg-danger" />
      <Button loading={loading} onClick={onClose} name="Cancel" className="bg-secondary" />
    </MessageBox>
  );
};

export default MessageDialog;
