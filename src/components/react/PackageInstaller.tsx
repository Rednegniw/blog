import { useState, useEffect } from "react";
import { Copy, Check } from "lucide-react";
import { cn } from "@/functions";

type PackageManager = "npm" | "pnpm" | "yarn" | "bun";

const COOKIE_NAME = "preferred-package-manager";

interface PackageInstallerProps {
  packages: string;
}

const PackageInstaller = ({ packages }: PackageInstallerProps) => {
  const [packageManager, setPackageManager] = useState<PackageManager>("npm");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Load preference from cookie on mount
    const savedPreference = getCookie(COOKIE_NAME);
    if (savedPreference && isValidPackageManager(savedPreference)) {
      setPackageManager(savedPreference as PackageManager);
    }
  }, []);

  const isValidPackageManager = (value: string): boolean => {
    return ["npm", "pnpm", "yarn", "bun"].includes(value);
  };

  const getCookie = (name: string): string | null => {
    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [cookieName, cookieValue] = cookie.trim().split("=");
      if (cookieName === name) {
        return cookieValue;
      }
    }
    return null;
  };

  const setCookie = (name: string, value: string, days = 365): void => {
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/;SameSite=Strict`;
  };

  const handlePackageManagerChange = (pm: PackageManager) => {
    setPackageManager(pm);
    setCookie(COOKIE_NAME, pm);
  };

  const getInstallCommand = (): string => {
    switch (packageManager) {
      case "npm":
        return `npm install`;
      case "pnpm":
        return `pnpm add`;
      case "yarn":
        return `yarn add`;
      case "bun":
        return `bun add`;
      default:
        return `npm install`;
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(getInstallCommand());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div className="my-4 rounded-xl bg-gray-900 border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="flex flex-nowrap">
        {(["npm", "pnpm", "yarn", "bun"] as const).map((pm) => (
          <button
            key={pm}
            onClick={() => handlePackageManagerChange(pm)}
            className={cn(
              "px-4 cursor-pointer py-2 text-sm font-medium text-white",
              pm === packageManager && "bg-gray-800 dark:bg-gray-700" 
            )}
          >
            {pm}
          </button>
        ))}
      </div>
      <div className="flex items-center justify-between p-4 overflow-hidden dark:bg-gray-800">
        <div className="flex items-center gap-2 flex-nowrap">
          <span className="text-sm text-orange-400 font-mono shrink-0">
            {getInstallCommand()}
          </span>
          <span className="text-sm text-white font-mono shrink-0">{packages}</span>
        </div>
        <button
          onClick={copyToClipboard}
          aria-label="Copy to clipboard"
          className="p-2 bg-gray-900 border border-gray-500 dark:border-gray-700 rounded-md text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
        >
          {copied ? (
            <span className="text-green-500">
              <Check size={20} />
            </span>
          ) : (
            <span>
              <Copy size={20} />
            </span>
          )}
        </button>
      </div>
    </div>
  );
};

export default PackageInstaller;
