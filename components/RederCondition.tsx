import React from "react";

interface RenderConditionProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  condition: boolean;
}

const RenderCondition: React.FC<RenderConditionProps> = ({ children, fallback = null, condition }) => {
  return <>{condition ? children : fallback}</>;
};

export default RenderCondition;
