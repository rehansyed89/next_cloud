import React from "react";
import { getFileSizeByType, getFileTypesParams } from "@/lib/utils";
import Sort from "@/components/Sort";
import { calculateTotalSpaceUsed, getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";
import Card from "@/components/Card";

const Page = async ({ params, searchParams }: SearchParamProps) => {
  const type = (await params)?.type as string;
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];
  const [files, totalSpace] = await Promise.all([
    getFiles({ types, searchText, sort }),
    calculateTotalSpaceUsed(),
  ]);
  const totalFileSize = getFileSizeByType({ totalSpace, type });
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total : <span className="h-5">{totalFileSize}</span>
          </p>
          <div className="sort-container">
            <p className="body-1 hidden text-light-200 sm:block">Sort By:</p>
            <Sort />
          </div>
        </div>
      </section>

      {files.total > 0 ? (
        <section className="file-list">
          {files.documents.map((file: Models.Document) => (
            <Card key={file.$id} file={file} />
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};
export default Page;
