import * as React from "react";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import RenderCondition from "../RederCondition";
import { Typography } from "@mui/material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

interface FormModalProps {
  title?: string;
  isShowTitle?: boolean;
  children?: React.ReactNode;
  actionChildren?: React.ReactNode;
  isOpen?: boolean;
  handleClose?: () => void;
}

const FormModal: React.FC<FormModalProps> = ({
  title,
  isShowTitle = true,
  children,
  actionChildren,
  isOpen = false,
  handleClose,
}) => {
  return (
    <React.Fragment>
      <BootstrapDialog onClose={handleClose} aria-labelledby="customized-dialog-title" open={isOpen}>
        <RenderCondition condition={isShowTitle}>
          <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            <Typography className="font-bold">{title}</Typography>
          </DialogTitle>
        </RenderCondition>

        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent className="min-w-96 max-w-4xl" dividers>
          {children}
        </DialogContent>
        <DialogActions>{actionChildren}</DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default FormModal;
