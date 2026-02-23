import { useState } from "react";
import { Copy, Check, Bot } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface CopyForAIProps {
  content: string;
}

export const CopyForAI = ({ content }: CopyForAIProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Strip markdown and format content for AI
      const formattedContent = content
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1") // Convert links to plain text
        .replace(/#+\s(.*)/g, "$1") // Remove heading markers
        .replace(/\*\*(.*?)\*\*/g, "$1") // Remove bold markers
        .replace(/\*(.*?)\*/g, "$1") // Remove italic markers
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .trim();

      await navigator.clipboard.writeText(formattedContent);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <TooltipProvider>
      <Tooltip >
        <TooltipTrigger>
          <Button
            onClick={copyToClipboard}
            aria-label="Copy content for AI"
            size="icon"
          >
            {copied ? <Check size={16} /> : <Bot size={16} />}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="max-w-[300px] p-4 text-sm">
          Copy unformatted article text to use in Cursor and similar AI tools
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
