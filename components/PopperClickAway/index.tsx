import * as React from "react";
import Box from "@mui/material/Box";
import { ClickAwayListener } from "@mui/material";
import { SxProps } from "@mui/system";

export default function PopperClickAway({
  open,
  setOpen,
  children,
  popper,
}: {
  open: boolean;
  setOpen: any;
  children: React.ReactNode;
  popper: React.ReactNode;
}) {
  const handleClickAway = () => {
    setOpen(false);
  };

  const styles: SxProps = {
    position: "absolute",
    top: 28,
    right: 0,
    left: 0,
    zIndex: 1,
    p: 1,
  };

  return (
    <ClickAwayListener onClickAway={handleClickAway}>
      <div className="relative">
        {children}
        {open ? <Box sx={styles}>{popper}</Box> : null}
      </div>
    </ClickAwayListener>
  );
}
