"use client";

import React from "react";
import { ArrowUp, Square } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AttachmentIcon, ToolIcon } from "@/components/icons/composer-icons";

interface ComposerToolbarProps {
  onFileUpload?: () => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  hasText: boolean;
  hasFiles: boolean;
  hasSelectedTool: boolean;
  isLoading: boolean;
  onStop?: () => void;
  showFileUpload?: boolean;
  showTools?: boolean;
  onToggleSlashCommandDropdown?: () => void;
  isSlashCommandDropdownOpen?: boolean;
}

export const ComposerToolbar: React.FC<ComposerToolbarProps> = ({
  onFileUpload,
  onSubmit,
  hasText,
  hasFiles,
  hasSelectedTool,
  isLoading,
  onStop,
  showFileUpload = true,
  showTools = true,
  onToggleSlashCommandDropdown,
  isSlashCommandDropdownOpen = false,
}) => {
  const handleSubmit = () => {
    if (isLoading) {
      onStop?.();
    } else {
      onSubmit();
    }
  };

  const isSubmitDisabled =
    !isLoading && !hasText && !hasFiles && !hasSelectedTool;

  return (
    <div className="flex items-center justify-between px-2 pt-1">
      <div className="flex items-center gap-1">
        {/* File Upload Button */}
        {showFileUpload && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={cn(
              "h-9 w-9 rounded-full bg-zinc-700 text-zinc-400 hover:bg-zinc-600/90 hover:text-zinc-200",
              isLoading && "cursor-not-allowed opacity-50"
            )}
            disabled={isLoading}
            onClick={onFileUpload}
            title="Attach files"
          >
            <AttachmentIcon className="h-5 w-5 min-h-[20px] min-w-[20px]" />
          </Button>
        )}

        {/* Tools Button */}
        {showTools && onToggleSlashCommandDropdown && (
          <Button
            type="button"
            size="icon"
            variant="ghost"
            className={cn(
              "h-9 w-9 rounded-full bg-zinc-700 text-zinc-400 hover:bg-zinc-600/90 hover:text-zinc-200",
              isLoading && "cursor-not-allowed opacity-50",
              isSlashCommandDropdownOpen &&
                "bg-primary/20 text-primary hover:bg-primary/30 hover:text-primary"
            )}
            disabled={isLoading}
            onClick={onToggleSlashCommandDropdown}
            title="Browse tools (press /)"
          >
            <ToolIcon className="h-[20px] w-[20px] min-h-[20px] min-w-[20px]" />
          </Button>
        )}
      </div>

      {/* Submit/Stop Button */}
      <div className="flex items-center gap-2">
        <Button
          type="button"
          size="icon"
          className={cn(
            "h-9 w-9 rounded-full",
            isLoading
              ? "bg-zinc-700 hover:bg-zinc-600"
              : hasText || hasFiles || hasSelectedTool
              ? "bg-primary hover:bg-primary/90 text-primary-foreground"
              : "bg-zinc-700 text-zinc-400 hover:bg-zinc-600"
          )}
          disabled={isSubmitDisabled}
          onClick={handleSubmit}
          title={isLoading ? "Stop generation" : "Send message (Enter)"}
        >
          {isLoading ? (
            <Square className="h-4 w-4" fill="currentColor" />
          ) : (
            <ArrowUp className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
