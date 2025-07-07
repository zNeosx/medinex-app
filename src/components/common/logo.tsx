import { cn } from "@/lib/utils";
import { HeartHandshake } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  variant?: "default" | "short";
  direction?: "horizontal" | "vertical";
  logoSize?: number;
  iconClassName?: string;
  textClassName?: string;
};
const Logo = ({
  variant = "default",
  direction = "horizontal",
  logoSize = 16,
  iconClassName,
  textClassName = "text-xl",
}: Props) => {
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
      <div
        className={cn(
          "bg-primary size-fit rounded-lg p-2 text-white",
          iconClassName,
        )}
      >
        <HeartHandshake size={logoSize} />
      </div>
      {variant === "default" ? (
        <h1 className={cn("font-bold", textClassName)}>Medinex</h1>
      ) : null}
    </Link>
  );
};

export default Logo;
