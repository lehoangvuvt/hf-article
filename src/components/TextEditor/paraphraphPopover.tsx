"use client";

import { Popover } from "@mui/material";
import { FontStyle, Paragraph, Type } from "./types";
import { useEffect, useState } from "react";
import UploadService from "@/services/upload.service";

export type ChangeContentTypeData =
  | {
      type: Type.LINK | Type.TEXT;
      value: string;
    }
  | {
      type: Type.IMAGE;
      value: string;
      width: number;
      height: number;
    };

type Props = {
  open: boolean;
  anchorEl: HTMLButtonElement | null;
  setAnchorEl: (anchorEl: HTMLButtonElement | null) => void;
  paragraph: Paragraph;
  removeFS: (fs: FontStyle) => void;
  addFS: (fs: FontStyle) => void;
  status: "CREATE" | "UPDATE" | "NONE";
  changeContentType: (data: ChangeContentTypeData) => void;
};

const ParaphraphPopover: React.FC<Props> = ({
  paragraph,
  open,
  anchorEl,
  setAnchorEl,
  removeFS,
  addFS,
  status,
  changeContentType,
}) => {
  if (status === "NONE") return null;
  if (status === "UPDATE") {
    return (
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={() => {
          setAnchorEl(null);
        }}
        style={{
          marginTop: "5px",
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        <div className="bg-[#121212] flex flex-row h-[40px] items-center flex-wrap px-[5px]">
          {paragraph.validFontStyles.map((fs) => (
            <div
              onClick={() => {
                if (paragraph.fontStyles.includes(fs)) {
                  removeFS(fs);
                } else {
                  addFS(fs);
                }
              }}
              key={fs}
              style={{
                color: !paragraph.fontStyles.includes(fs)
                  ? "rgba(255,255,255,0.7)"
                  : "white",
              }}
              className=" px-[10px] text-[0.9rem] font-medium capitalize cursor-pointer"
            >
              {fs.toLowerCase()}
            </div>
          ))}
        </div>
      </Popover>
    );
  } else {
    return (
      <>
        <input
          type="file"
          style={{ display: "none" }}
          id="file-upload-input"
          onChange={(e) => {
            const uploadedFile = e.target.files?.[0];
            if (uploadedFile) {
              var reader = new FileReader();
              reader.readAsDataURL(uploadedFile);
              reader.onload = async function () {
                if (!reader.result) return;
                const base64 = reader.result.toString();

                const response = await UploadService.UploadFile({
                  base64,
                  file_type: "image",
                  file_name: `${uploadedFile.name}_${new Date().getTime()}`,
                });

                if (response.status === "success") {
                  changeContentType({
                    type: Type.IMAGE,
                    value: response.data.url,
                    height: response.data.height,
                    width: response.data.width,
                  });
                } else {
                  alert("Upload image failed");
                }
              };
              reader.onerror = function (error) {
                console.log("Error: ", error);
              };
            }
          }}
        />
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={() => {
            setAnchorEl(null);
          }}
          style={{
            marginTop: "5px",
          }}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
        >
          <div className="bg-[#121212] flex flex-row h-[40px] items-center flex-wrap px-[5px]">
            {paragraph.validTypes.map(
              (type) =>
                type !== Type.TEXT &&
                type !== Type.LINK && (
                  <div
                    onClick={() => {
                      if (type !== Type.IMAGE) {
                        const castedType = type as Type.LINK | Type.TEXT;
                        changeContentType({ type: castedType, value: "" });
                        setAnchorEl(null);
                      } else {
                        document.getElementById("file-upload-input")?.click();
                      }
                    }}
                    key={type}
                    className=" px-[10px]
                    transition-colors
                    text-[rgba(255,255,255,0.7)]
                    text-[0.9rem] font-medium capitalize cursor-pointer hover:text-[rgba(255,255,255,1)]"
                  >
                    {type.toLowerCase()}
                  </div>
                )
            )}
          </div>
        </Popover>
      </>
    );
  }
};

export default ParaphraphPopover;
