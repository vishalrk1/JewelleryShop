import React from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import Link from "next/link";

interface Props {
  icon: React.ReactElement;
  label: string;
  href: string;
}

const IconButton: React.FC<Props> = ({ icon, label, href }) => {
  return (
    <TooltipProvider delayDuration={100}>
      <Link href={href} className="hidden md:flex">
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
