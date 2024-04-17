import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";
import { twMerge } from "tailwind-merge";

interface Props {
  className?: string;
  icon: React.ReactElement;
  label: string;
  href: string;
}

const IconButton: React.FC<Props> = ({ icon, label, href, className }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Link href={href} className={twMerge("", className)}>
        <Tooltip>
          <TooltipTrigger>{icon}</TooltipTrigger>
          <TooltipContent>
            <p>{label}</p>
          </TooltipContent>
        </Tooltip>
      </Link>
    </TooltipProvider>
  );
};

export default IconButton;
