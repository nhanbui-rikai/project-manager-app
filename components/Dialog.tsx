"use client";
import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";

export interface MessageBoxProps {
  children?: React.ReactNode;
  content?: string;
  title?: string;
  onClose: () => void;
  open: boolean;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const MessageBox: React.FC<MessageBoxProps> = ({ children, content, title, open, onClose }) => {
  return (
    <React.Fragment>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={onClose}
        aria-describedby="alert-dialog-slide-description"
      >
        {Boolean(title) && <DialogTitle>{title}</DialogTitle>}
        {Boolean(content) && (
          <DialogContent>
            <DialogContentText id="alert-dialog-slide-description">{content}</DialogContentText>
          </DialogContent>
        )}
        <DialogActions>{children}</DialogActions>
      </Dialog>
    </React.Fragment>
  );
};

export default MessageBox;
