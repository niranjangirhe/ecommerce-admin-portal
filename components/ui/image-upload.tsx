"use client";

import { useEffect, useState } from "react";
import { Button } from "./button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";
import { CldUploadWidget } from "next-cloudinary";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  mulitple?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  mulitple = false,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 overflow-y-auto">
        <div className="mb-1 w-fit">
          <div className="grid grid-flow-col gap-2">
            {value.map((url) => (
              <div
                key={url}
                className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
              >
                <div className="z-10 absolute top-2 right-2">
                  <Button
                    type="button"
                    onClick={() => onRemove(url)}
                    variant="destructive"
                    size="icon"
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
                <Image fill className="object-cover" src={url} alt="Image" />
              </div>
            ))}
          </div>
        </div>
      </div>
      <CldUploadWidget
        onUpload={(res) => {
          onUpload(res);
        }}
        uploadPreset="l6n3rbve"
      >
        {({ open }) => {
          const onClick = () => {
            open();
          };
          return (
            <Button
              onClick={onClick}
              disabled={disabled}
              type="button"
              variant="secondary"
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              {mulitple ? "Upload Images" : "Upload an Image"}
            </Button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
