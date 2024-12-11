import React from "react";
import { cn, formatDateTime } from "@/lib/utils";

export const FormatDateTime = ({
  date,
  className,
}: {
  date: string;
  className?: string;
}) => {
  return (
    <p className={cn("body-2 text-light-100", className)}>
      {formatDateTime(date)}
    </p>
  );
};
