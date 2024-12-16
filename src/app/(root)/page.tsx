import React from "react";
import { calculateTotalSpaceUsed, getFiles } from "@/lib/actions/file.actions";
import { convertFileSize, getUsageSummary } from "@/lib/utils";
import { Chart } from "@/components/Chart";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import { FormatDateTime } from "@/components/FormatDateTime";
import { Models } from "node-appwrite";
import Thumbnail from "@/components/Thumbnail";
import { ActionDropdown } from "@/components/ActionDropdown";

const Dashboard = async () => {
  const [files, totalSpace] = await Promise.all([
    getFiles({ types: [], limit: 10 }),
    calculateTotalSpaceUsed(),
  ]);

  const usageSummary = getUsageSummary(totalSpace);
  return (
    <div className="dashboard-container">
      <section>
        <Chart used={totalSpace.used} />
        <ul className="dashboard-summary-list">
          {usageSummary.map((summary) => (
            <Link
              href={summary.url}
              key={summary.title}
              className="dashboard-summary-card"
            >
              <div className="space-y-4">
                <div className="flex justify-between gap-3">
                  <Image
                    src={summary.icon}
                    alt="uploaded image"
                    height={100}
                    width={100}
                    className="summary-type-icon"
                  />
                  <h4 className="summary-type-size">
                    {convertFileSize(summary.size)}
                  </h4>
                </div>

                <h5 className="summary-type-title">{summary.title}</h5>
                <Separator className="bg-light-400" />
                <p className="body-1 text-center text-light-200">Last update</p>
                <FormatDateTime
                  date={summary.latestDate}
                  className="text-center"
                />
              </div>
            </Link>
          ))}
        </ul>
      </section>

      <section className="dashboard-recent-files">
        <h3 className="h3 xl:h2 text-light-100">Recent files uploaded</h3>
        {files.documents.length > 0 ? (
          <ul className="mt-5 flex flex-col gap-5">
            {files.documents.map((file: Models.Document) => (
              <Link
                href={file.url}
                key={file.$id}
                className="flex items-center gap-3"
                target="_blank"
              >
                <Thumbnail
                  type={file.type}
                  extension={file.extension}
                  url={file.url}
                />
                <div className="recent-file-details">
                  <div className="flex flex-col gap-1">
                    <p className="recent-file-name">{file.name}</p>
                    <FormatDateTime
                      date={file.$createdAt}
                      className="caption"
                    />
                  </div>
                  <div className="flex flex-col items-end ">
                    <ActionDropdown file={file} />
                  </div>
                </div>
              </Link>
            ))}
          </ul>
        ) : (
          <p className="empty-list"> No files uploaded</p>
        )}
      </section>
    </div>
  );
};
export default Dashboard;
