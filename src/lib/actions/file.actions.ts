"use server";

export const uploadFile = async ({
  file,
  ownerId,
  accountId,
  path,
}: UploadFileProps) => {
  console.log(`Uploadings ${file.name} to ${path}`);
};
