"use client";

import { generateUploadButton } from "@uploadthing/react";
import { OurFileRouter } from "../api/uploadthing/core";
import Image from "next/image";
import { RxAvatar } from "react-icons/rx";

const UploadButton = generateUploadButton<OurFileRouter>();
// src="https://utfs.io/f/659166c0-a7b8-45c2-bcc7-5756373ff8a5-2i8.jpg"

export default function UploadComponent({
  path,
  setPath,
}: {
  path?: string;
  setPath: (e: string) => void;
}) {
  return (
    <div className="h-150 flex w-full flex-col items-center justify-center">
      {path !== undefined ? (
        <Image
          alt="profile"
          width={150}
          height={150}
          className="rounded-full"
          src={path}
        />
      ) : (
        <RxAvatar size={120} />
      )}
      <UploadButton
        endpoint="imageUploader"
        appearance={{ container: { marginTop: 15 } }}
        onClientUploadComplete={(res) => {
          // Do something with the response
          setPath(res[0]?.url as string);
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </div>
  );
}
