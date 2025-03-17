import { ChevronDown } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "../ui/collapsible";
import { cn } from "@/functions";

interface FurtherExplanationProps {
  title: string;
  children: React.ReactNode;
}

export const FurtherExplanation = ({
  title,
  children,
}: FurtherExplanationProps) => {
  return (
    <Collapsible
      className={cn(
        "bg-slate-300 dark:bg-slate-900 rounded-lg not-prose p-4 border border-slate-400 px-5 flex flex-col gap-2 cursor-pointer transition-all duration-300",
        "hover:bg-slate-300/80",
        "dark:hover:border-slate-700 dark:hover:bg-slate-900/80" 
      )}
    >
      <CollapsibleTrigger className="flex items-center justify-between w-full cursor-pointer">
        <h3 className="text-lg font-bold">{title}</h3>
        <ChevronDown className="size-6" />
      </CollapsibleTrigger>
      <CollapsibleContent className="">{children}</CollapsibleContent>
    </Collapsible>
  );
};
