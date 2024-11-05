import React from "react";
import { Typography, Tooltip } from "@mui/material";

interface TextProps {
  text: string;
  maxLength: number;
  maxWidth: number;
}

const Text: React.FC<TextProps> = ({ text, maxLength, maxWidth }) => {
  const isTextOverflow = text.length > maxLength;
  const displayText = isTextOverflow ? text.substring(0, maxLength) + "..." : text;

  return (
    <Tooltip title={isTextOverflow ? text : ""} placement="top">
      <Typography
        variant="body1"
        noWrap
        sx={{
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
          maxWidth: maxWidth,
          cursor: isTextOverflow ? "pointer" : "default",
        }}
      >
        {displayText}
      </Typography>
    </Tooltip>
  );
};

export default Text;
