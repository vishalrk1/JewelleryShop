import React from "react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { ChevronDownIcon } from "lucide-react";

interface FaqCollapsibleProps {
  question: string;
  answer: string;
}

const FaqCollapsible: React.FC<FaqCollapsibleProps> = ({
  question,
  answer,
}) => {
  return (
    <Collapsible>
      <CollapsibleTrigger className="flex w-full items-center justify-between rounded-md bg-gray-100 px-4 py-3 text-left text-base font-medium text-gray-900 transition-all hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75 dark:bg-gray-800 dark:text-gray-50 dark:hover:bg-gray-700">
        {question}
        <ChevronDownIcon className="h-5 w-5 text-gray-500 transition-transform group-[data-state=open]:rotate-180 dark:text-gray-400" />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-4 pt-2 text-gray-500 dark:text-gray-400">
        {answer}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default FaqCollapsible;
