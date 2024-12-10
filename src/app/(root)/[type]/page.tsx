import React from "react";
import { getFileTypesParams } from "@/lib/utils";
import Sort from "@/components/Sort";
import { getFiles } from "@/lib/actions/file.actions";
import { Models } from "node-appwrite";

const Page = async ({ params, searchParams }: SearchParamProps) => {
  const type = (await params)?.type as string;
  const searchText = ((await searchParams)?.query as string) || "";
  const sort = ((await searchParams)?.sort as string) || "";
  const types = getFileTypesParams(type) as FileType[];

  const files = await getFiles({ types, searchText, sort });
  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{type}</h1>
        <div className="total-size-section">
          <p className="body-1">
            Total : <span className="h-5">0 MB</span>
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
            <h1 key={file.$id} className="h1">
              {file.name}
            </h1>
          ))}
        </section>
      ) : (
        <p className="empty-list">No files uploaded</p>
      )}
    </div>
  );
};
export default Page;
