import React from "react";
import { Models } from "node-appwrite";

export const ActionDropdown = ({ file }: { file: Models.Document }) => {
  return <p>{file.owner.fullName}</p>;
};
