import React, { forwardRef } from "react";
import { Box, TextField } from "@mui/material";
import { cn } from "@/lib/utils";

interface TextAreaProps {
  label: string;
  id: string;
  variant?: "filled" | "outlined" | "standard";
  error?: boolean;
  helperText?: string;
  className?: string;
  rows?: number;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ label, id, variant = "standard", error = false, helperText, className, rows = 4, ...props }, ref) => {
    return (
      <Box sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          id={id}
          label={label}
          variant={variant}
          inputRef={ref}
          error={error}
          helperText={helperText}
          className={cn(className)}
          multiline
          rows={rows}
          fullWidth
          {...props}
        />
      </Box>
    );
  },
);

export default TextArea;
