import React, { forwardRef } from "react";
import { Box, Select, MenuItem, Checkbox, ListItemText, FormControl, InputLabel, FormHelperText } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { cn } from "@/lib/utils";

interface MultiSelectorProps {
  label: string;
  id: string;
  variant?: "filled" | "outlined" | "standard";
  icon?: React.ReactNode;
  showIcon?: boolean;
  error?: boolean;
  helperText?: string;
  options: Array<{ value: string | number; label: string }>;
  className?: string;
  value?: (string | number)[];
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
}

const MultiSelector = forwardRef<HTMLDivElement, MultiSelectorProps>(
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
      value = [],
      ...props
    },
    ref,
  ) => {
    return (
      <FormControl className="w-full" variant={variant} error={error} ref={ref}>
        <Box className="w-full" sx={{ display: "flex", alignItems: "center" }}>
          {showIcon && <span style={{ marginRight: "8px", marginBottom: "4px" }}>{icon}</span>}
          <InputLabel id={`${id}-label`}>{label}</InputLabel>
          <Select
            labelId={`${id}-label`}
            className={cn(className)}
            id={id}
            multiple
            value={value}
            renderValue={(selected) => (selected as string[]).join(", ")}
            label={label}
            {...props}
          >
            {options.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                <Checkbox checked={value.includes(option.value)} />
                <ListItemText primary={option.label} />
              </MenuItem>
            ))}
          </Select>
        </Box>
        {helperText && <FormHelperText>{helperText}</FormHelperText>}
      </FormControl>
    );
  },
);

export default MultiSelector;
