import React, { forwardRef } from "react";
import { Box, TextField } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { cn } from "@/lib/utils";

interface TextInputProps {
  label: string;
  id: string;
  variant?: "filled" | "outlined" | "standard";
  icon?: React.ReactNode;
  showIcon?: boolean;
  error?: boolean;
  helperText?: string;
  type?: string;
  className?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  (
    {
      label,
      id,
      variant = "standard",
      icon = <AccountCircle />,
      showIcon = true,
      error = false,
      helperText,
      type = "text",
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        {showIcon && <span style={{ marginRight: "8px", marginBottom: "4px" }}>{icon}</span>}
        <TextField
          id={id}
          label={label}
          variant={variant}
          inputRef={ref}
          error={error}
          helperText={helperText}
          type={type}
          className={cn(className)}
          {...props}
        />
      </Box>
    );
  },
);

export default TextInput;
