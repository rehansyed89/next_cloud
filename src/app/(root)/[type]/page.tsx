import React from "react";
import { getFileTypesParams } from "@/lib/utils";
import Sort from "@/components/Sort";

const Page = async ({ params }: SearchParamProps) => {
  const type = (await params)?.type as string;
  const types = getFileTypesParams(type) as FileType[];

  return (
    <div className="page-container">
      <section className="w-full">
        <h1 className="h1 capitalize">{types}</h1>
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
    </div>
  );
};
export default Page;
