import React from "react";
import Link from "next/link";
import Thumbnail from "@/components/Thumbnail";

const Card = ({ file }: { file: Models.Document }) => {
  return (
    <Link href={file.url} className="file-card" target="_blank">
      <div className="flex justify-between">
        <Thumbnail
          type={file.type}
          extension={file.extension}
          url={file.url}
          className="!size-20"
          imageClassName="!size-11"
        />
      </div>
    </Link>
  );
};
export default Card;
