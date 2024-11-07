import React, { forwardRef } from "react";
import { Box, Select, MenuItem, FormControl, InputLabel, FormHelperText } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { cn } from "@/lib/utils";

interface SelectorInputProps {
  label: string;
  id: string;
  variant?: "filled" | "outlined" | "standard";
  icon?: React.ReactNode;
  showIcon?: boolean;
  error?: boolean;
  helperText?: string;
  options: Array<{ value: string | number; label: string }>;
  className?: string;
  onFocus?: (event: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
  value?: string | number;
  disabled?: boolean;
}

const SelectorInput = forwardRef<HTMLDivElement, SelectorInputProps>(
  (
    {
      label,
      id,
      variant = "standard",
      icon = <AccountCircle />,
      showIcon = false,
      error = false,
      helperText,
      options,
      className,
      value,
      disabled = false,
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl className="w-full" variant={variant} error={error} ref={ref} disabled={disabled}>
        <Box className="w-full" sx={{ display: "flex", alignItems: "center" }}>
          {showIcon && <span style={{ marginRight: "8px", marginBottom: "4px" }}>{icon}</span>}
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select className={cn(className)} labelId={`${id}-label`} id={id} value={value} label={label} {...props}>
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </Box>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default SelectorInput;
