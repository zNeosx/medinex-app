import { cn } from "@/lib/utils";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  variant?: "default" | "short";
  direction?: "horizontal" | "vertical";
};
const Logo = ({ variant = "default", direction = "horizontal" }: Props) => {
  return (
    <Link
      href={"/"}
      className={cn(
        "flex gap-2",
        direction === "horizontal"
          ? "flex-row items-center"
          : "flex-col items-center",
      )}
    >
      <div className="bg-primary size-fit rounded-lg p-4 text-white">
        <HeartHandshake size={32} />
      </div>
      {variant === "default" ? (
        <h1 className="text-3xl font-bold">Medinex</h1>
      ) : null}
    </Link>
  );
};

export default Logo;
