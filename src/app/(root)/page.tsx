import React from "react";
import { calculateTotalSpaceUsed, getFiles } from "@/lib/actions/file.actions";
import {
  cn,
  convertFileSize,
  formatDateTime,
  getUsageSummary,
} from "@/lib/utils";
import { Chart } from "@/components/Chart";
import Link from "next/link";
import Image from "next/image";
import { sum } from "d3-array";
import { Separator } from "@/components/ui/separator";
import { FormatDateTime } from "@/components/FormatDateTime";

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
    </div>
  );
};
export default Dashboard;
