/** @format */

import { urlConfig } from "@/configs/url.config";
import Image from "next/image";
import { Label } from "../ui/label";

export default function FormImage({
  src,
  label,
  weight,
  height,
  alt,
  className,
}: {
  src: string | undefined;
  label?: string;
  weight: number;
  height: number;
  alt: string;
  className?: string;
}) {
  return (
    <div
      className={`${
        className ? className : "flex flex-col items-center gap-2"
      }`}
    >
      <Label htmlFor={alt}>{label}</Label>
      {src ? (
        <Image
          className="object-cover rounded-lg"
          src={src}
          width={weight}
          height={height}
          alt={alt}
        />
      ) : (
        "-- ไม่มีภาพ --"
      )}
    </div>
  );
}
