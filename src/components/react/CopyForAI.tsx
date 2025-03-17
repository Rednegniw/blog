import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/functions";

interface CopyForAIProps {
  content: string;
}

export const CopyForAI = ({ content }: CopyForAIProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      // Strip markdown and format content for AI
      const formattedContent = content
        .replace(/```[\s\S]*?```/g, "") // Remove code blocks
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
    <button
      onClick={copyToClipboard}
      aria-label="Copy content for AI"
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-colors",
        "bg-primary-500 text-white hover:bg-primary-600",
        "dark:bg-primary-600 dark:hover:bg-primary-700"
      )}
    >
      {copied ? (
        <>
          <Check size={16} />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy size={16} />
          <span>Copy for AI</span>
        </>
      )}
    </button>
  );
}; 