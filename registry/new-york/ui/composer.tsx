"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ComposerInput, ComposerInputRef } from "./composer-input";
import { ComposerToolbar } from "./composer-toolbar";

export interface FilePreview {
  id: string;
  name: string;
  type: string;
  url?: string;
  size?: number;
  isUploading?: boolean;
}

export interface ComposerProps {
  /** Current input text value */
  value?: string;
  /** Callback when input text changes */
  onValueChange?: (value: string) => void;
  /** Callback when user submits message */
  onSubmit?: (message: string, files?: FilePreview[]) => void;
  /** Placeholder text for the input */
  placeholder?: string;
  /** Whether the composer is in loading state */
  isLoading?: boolean;
  /** Callback to stop loading/generation */
  onStop?: () => void;
  /** Whether the composer is disabled */
  disabled?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Uploaded files */
  files?: FilePreview[];
  /** Callback when files are added */
  onFilesChange?: (files: FilePreview[]) => void;
  /** Maximum number of files allowed */
  maxFiles?: number;
  /** Whether to show the file upload button */
  showFileUpload?: boolean;
  /** Whether to show the tools button */
  showTools?: boolean;
  /** Available tools for slash commands */
  tools?: Array<{
    name: string;
    category: string;
    description?: string;
    icon?: React.ReactNode;
  }>;
  /** Callback when a tool is selected */
  onToolSelect?: (toolName: string, toolCategory: string) => void;
  /** Currently selected tool */
  selectedTool?: string | null;
  /** Callback to remove selected tool */
  onRemoveTool?: () => void;
}

export const Composer: React.FC<ComposerProps> = ({
  value = "",
  onValueChange,
  onSubmit,
  placeholder = "What can I do for you today?",
  isLoading = false,
  onStop,
  disabled = false,
  className,
  files = [],
  onFilesChange,
  maxFiles = 10,
  showFileUpload = true,
  showTools = true,
  tools = [],
  onToolSelect,
  selectedTool = null,
  onRemoveTool,
}) => {
  const [inputValue, setInputValue] = useState(value);
  const [currentHeight, setCurrentHeight] = useState<number>(24);
  const [uploadedFiles, setUploadedFiles] = useState<FilePreview[]>(files);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const composerInputRef = useRef<ComposerInputRef>(null);
  const [isSlashCommandDropdownOpen, setIsSlashCommandDropdownOpen] =
    useState(false);

  // Sync with controlled value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Sync files
  useEffect(() => {
    setUploadedFiles(files);
  }, [files]);

  const handleInputChange = useCallback(
    (text: string) => {
      setInputValue(text);
      onValueChange?.(text);
    },
    [onValueChange]
  );

  const handleFormSubmit = useCallback(
    (e?: React.FormEvent<HTMLFormElement>) => {
      if (e) e.preventDefault();

      const trimmedContent = inputValue.trim();

      // Don't submit if no content and no files and no selected tool
      if (!trimmedContent && uploadedFiles.length === 0 && !selectedTool) {
        return;
      }

      // Call onSubmit callback
      onSubmit?.(trimmedContent, uploadedFiles);

      // Clear input and files
      setInputValue("");
      setUploadedFiles([]);
      onValueChange?.("");
      onFilesChange?.([]);

      // Focus input
      inputRef.current?.focus();
    },
    [
      inputValue,
      uploadedFiles,
      selectedTool,
      onSubmit,
      onValueChange,
      onFilesChange,
    ]
  );

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> =
    useCallback(
      (event) => {
        if (event.key === "Enter" && !event.shiftKey && !isLoading) {
          event.preventDefault();
          handleFormSubmit();
        }

        // Handle Escape key to remove selected tool
        if (event.key === "Escape" && selectedTool && onRemoveTool) {
          event.preventDefault();
          onRemoveTool();
        }
      },
      [isLoading, handleFormSubmit, selectedTool, onRemoveTool]
    );

  const handleFileUpload = useCallback(() => {
    // Create file input element
    const input = document.createElement("input");
    input.type = "file";
    input.multiple = true;
    input.accept = "image/*,application/pdf,.doc,.docx,.txt";

    input.onchange = (e) => {
      const target = e.target as HTMLInputElement;
      const selectedFiles = Array.from(target.files || []);

      // Check max files limit
      if (uploadedFiles.length + selectedFiles.length > maxFiles) {
        alert(`Maximum ${maxFiles} files allowed`);
        return;
      }

      // Create file previews
      const newFiles: FilePreview[] = selectedFiles.map((file) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        type: file.type,
        size: file.size,
        url: URL.createObjectURL(file),
      }));

      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    };

    input.click();
  }, [uploadedFiles, maxFiles, onFilesChange]);

  const handleRemoveFile = useCallback(
    (fileId: string) => {
      const updatedFiles = uploadedFiles.filter((f) => f.id !== fileId);
      setUploadedFiles(updatedFiles);
      onFilesChange?.(updatedFiles);
    },
    [uploadedFiles, onFilesChange]
  );

  const handleSlashCommandSelect = useCallback(
    (toolName: string, toolCategory: string) => {
      onToolSelect?.(toolName, toolCategory);
    },
    [onToolSelect]
  );

  const handleToggleSlashCommandDropdown = useCallback(() => {
    // Focus the input first
    if (inputRef.current) {
      inputRef.current.focus();
    }

    composerInputRef.current?.toggleSlashCommandDropdown();
    const isOpen =
      composerInputRef.current?.isSlashCommandDropdownOpen() || false;
    setIsSlashCommandDropdownOpen(isOpen);
  }, []);

  return (
    <div className={cn("relative pb-1 min-w-[600px]", className)}>
      <div className="searchbar relative z-[2] rounded-3xl bg-zinc-800 px-1 pt-1 pb-2">
        {/* File Previews */}
        {uploadedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 px-3 pt-2 pb-1">
            {uploadedFiles.map((file) => (
              <div
                key={file.id}
                className="relative flex items-center gap-2 rounded-lg bg-zinc-700 px-3 py-2 text-sm"
              >
                <span className="text-zinc-300">{file.name}</span>
                <button
                  type="button"
                  onClick={() => handleRemoveFile(file.id)}
                  className="text-zinc-400 hover:text-zinc-200"
                  aria-label="Remove file"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Selected Tool Indicator */}
        {selectedTool && (
          <div className="flex items-center gap-2 px-3 pt-2 pb-1">
            <div className="flex items-center gap-2 rounded-lg bg-primary/20 px-3 py-2 text-sm text-primary">
              <span>Tool: {selectedTool}</span>
              <button
                type="button"
                onClick={onRemoveTool}
                className="hover:text-primary/80"
                aria-label="Remove tool"
              >
                ×
              </button>
            </div>
          </div>
        )}

        <ComposerInput
          ref={composerInputRef}
          value={inputValue}
          onValueChange={handleInputChange}
          onSubmit={handleFormSubmit}
          onKeyDown={handleKeyDown}
          currentHeight={currentHeight}
          onHeightChange={setCurrentHeight}
          inputRef={inputRef}
          placeholder={placeholder}
          disabled={disabled || isLoading}
          tools={tools}
          onSlashCommandSelect={handleSlashCommandSelect}
        />

        <ComposerToolbar
          onFileUpload={handleFileUpload}
          onSubmit={handleFormSubmit}
          hasText={inputValue.trim().length > 0}
          hasFiles={uploadedFiles.length > 0}
          hasSelectedTool={!!selectedTool}
          isLoading={isLoading}
          onStop={onStop}
          showFileUpload={showFileUpload}
          showTools={showTools}
          onToggleSlashCommandDropdown={handleToggleSlashCommandDropdown}
          isSlashCommandDropdownOpen={isSlashCommandDropdownOpen}
        />
      </div>
    </div>
  );
};
