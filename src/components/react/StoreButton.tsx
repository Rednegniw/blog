import { cn } from "@/lib/utils";

interface StoreButtonProps {
  store: "google" | "apple";
  url: string;
  text?: string;
  iconSrc: any;
  className?: string;
}

export default function StoreButton({ store, url, text, iconSrc, className }: StoreButtonProps) {
  const defaultText = store === "google" ? "Get it on Google Play" : "Download on the App Store";
  const buttonText = text || defaultText;

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 px-6 h-14 no-underline",
        " dark:bg-white  dark:text-black",
        "rounded-lg border border-gray-700 dark:border-gray-300",
        "font-medium text-base",
        "transition-all duration-200",
        "hover:bg-gray-100 dark:hover:bg-gray-100",
        "hover:-translate-y-0.5 hover:shadow-lg",
        "active:translate-y-0 active:shadow-md",
        className
      )}
    >
      <img 
        src={iconSrc.src || iconSrc} 
        alt={`${store === "google" ? "Google Play" : "App Store"} icon`}
        className="w-6 h-6 object-contain"
      />
      <span className="leading-tight no-underline">{buttonText}</span>
    </a>
  );
}