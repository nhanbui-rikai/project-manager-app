"use client";
import React, { forwardRef } from "react";
import { Box, TextField } from "@mui/material";
import { cn } from "@/lib/utils";

interface DateInputProps {
  label: string;
  id: string;
  variant?: "filled" | "outlined" | "standard";
  error?: boolean;
  helperText?: string;
  className?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const DateInput = forwardRef<HTMLInputElement, DateInputProps>(
  ({ label, id, variant = "standard", error = false, helperText, className, ...props }, ref) => {
    return (
      <Box className="w-full" sx={{ display: "flex", alignItems: "flex-end" }}>
        <TextField
          id={id}
          label={label}
          type="date"
          variant={variant}
          inputRef={ref}
          error={error}
          helperText={helperText}
          className={cn(className)}
          InputLabelProps={{ shrink: true }}
          sx={{ width: "100%" }}
          {...props}
        />
      </Box>
    );
  },
);

export default DateInput;
