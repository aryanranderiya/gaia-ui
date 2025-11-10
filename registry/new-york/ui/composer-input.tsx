"use client";

import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { SlashCommandDropdown } from "./slash-command-dropdown";

export interface Tool {
  name: string;
  category: string;
  description?: string;
  icon?: React.ReactNode;
}

export interface SlashCommandMatch {
  tool: Tool;
  score: number;
}

interface ComposerInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement>) => void;
  onKeyDown: React.KeyboardEventHandler<HTMLInputElement>;
  currentHeight: number;
  onHeightChange: (height: number) => void;
  inputRef: React.RefObject<HTMLTextAreaElement | null>;
  placeholder?: string;
  disabled?: boolean;
  tools?: Tool[];
  onSlashCommandSelect?: (toolName: string, toolCategory: string) => void;
}

export interface ComposerInputRef {
  toggleSlashCommandDropdown: () => void;
  isSlashCommandDropdownOpen: () => boolean;
}

export const ComposerInput = React.forwardRef<
  ComposerInputRef,
  ComposerInputProps
>(
  (
    {
      value,
      onValueChange,
      onSubmit,
      onKeyDown,
      currentHeight,
      onHeightChange,
      inputRef,
      placeholder = "What can I do for you today?",
      disabled = false,
      tools = [],
      onSlashCommandSelect,
    },
    ref
  ) => {
    const [slashCommandState, setSlashCommandState] = useState({
      isActive: false,
      matches: [] as SlashCommandMatch[],
      selectedIndex: 0,
      commandStart: -1,
      commandEnd: -1,
      openedViaButton: false,
    });

    // Detect slash commands
    const detectSlashCommand = useCallback(
      (text: string, cursorPosition: number) => {
        // Find the last slash before cursor
        const textBeforeCursor = text.substring(0, cursorPosition);
        const lastSlashIndex = textBeforeCursor.lastIndexOf("/");

        if (lastSlashIndex === -1) {
          return { isSlashCommand: false, matches: [] };
        }

        // Get the query after the slash
        const query = textBeforeCursor
          .substring(lastSlashIndex + 1)
          .toLowerCase();

        // Check if there's a space before the slash (or it's at the start)
        const charBeforeSlash = textBeforeCursor.charAt(lastSlashIndex - 1);
        if (
          lastSlashIndex > 0 &&
          charBeforeSlash !== " " &&
          charBeforeSlash !== "\n"
        ) {
          return { isSlashCommand: false, matches: [] };
        }

        // Filter tools based on query
        const matches = tools
          .filter(
            (tool) =>
              tool.name.toLowerCase().includes(query) ||
              tool.category.toLowerCase().includes(query) ||
              (tool.description &&
                tool.description.toLowerCase().includes(query))
          )
          .map((tool) => ({
            tool,
            score: 1, // Simple scoring
          }))
          .sort((a, b) => b.score - a.score);

        return {
          isSlashCommand: matches.length > 0,
          matches,
          commandStart: lastSlashIndex,
          commandEnd: cursorPosition,
        };
      },
      [tools]
    );

    // Update slash command detection
    const updateSlashCommandDetection = useCallback(
      (text: string, cursorPosition: number) => {
        const detection = detectSlashCommand(text, cursorPosition);

        if (detection.isSlashCommand && detection.matches.length > 0) {
          setSlashCommandState({
            isActive: true,
            matches: detection.matches,
            selectedIndex: 0,
            commandStart: detection.commandStart,
            commandEnd: detection.commandEnd,
            openedViaButton: false,
          });
        } else {
          setSlashCommandState((prev) => ({
            ...prev,
            isActive: prev.openedViaButton ? prev.isActive : false,
            matches: prev.openedViaButton ? prev.matches : [],
          }));
        }
      },
      [detectSlashCommand]
    );

    // Expose methods to parent
    useImperativeHandle(
      ref,
      () => ({
        toggleSlashCommandDropdown: () => {
          if (slashCommandState.isActive) {
            setSlashCommandState((prev) => ({
              ...prev,
              isActive: false,
              openedViaButton: false,
            }));
          } else {
            // Show all tools
            const allMatches = tools.map((tool) => ({ tool, score: 1 }));
            setSlashCommandState({
              isActive: true,
              matches: allMatches,
              selectedIndex: 0,
              commandStart: 0,
              commandEnd: 0,
              openedViaButton: true,
            });
          }
        },
        isSlashCommandDropdownOpen: () => slashCommandState.isActive,
      }),
      [slashCommandState.isActive, tools]
    );

    const handleSlashCommandSelect = useCallback(
      (match: SlashCommandMatch) => {
        // Remove the slash command
        const textBeforeCommand = value.substring(
          0,
          slashCommandState.commandStart
        );
        const textAfterCommand = value.substring(slashCommandState.commandEnd);
        const newText = textBeforeCommand + textAfterCommand;

        onValueChange(newText);
        setSlashCommandState((prev) => ({
          ...prev,
          isActive: false,
          openedViaButton: false,
        }));

        onSlashCommandSelect?.(match.tool.name, match.tool.category);

        // Focus input
        requestAnimationFrame(() => {
          if (inputRef.current) {
            const newCursorPos = slashCommandState.commandStart;
            inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
            inputRef.current.focus();
          }
        });
      },
      [value, slashCommandState, onValueChange, onSlashCommandSelect, inputRef]
    );

    const handleSlashCommandKeyDown = useCallback(
      (e: React.KeyboardEvent) => {
        if (!slashCommandState.isActive) return false;

        switch (e.key) {
          case "ArrowUp":
            e.preventDefault();
            setSlashCommandState((prev) => ({
              ...prev,
              selectedIndex: Math.max(0, prev.selectedIndex - 1),
            }));
            return true;

          case "ArrowDown":
            e.preventDefault();
            setSlashCommandState((prev) => ({
              ...prev,
              selectedIndex: Math.min(
                prev.matches.length - 1,
                prev.selectedIndex + 1
              ),
            }));
            return true;

          case "Enter":
          case "Tab":
            e.preventDefault();
            const selectedMatch =
              slashCommandState.matches[slashCommandState.selectedIndex];
            if (selectedMatch) {
              handleSlashCommandSelect(selectedMatch);
            }
            return true;

          case "Escape":
            e.preventDefault();
            setSlashCommandState((prev) => ({
              ...prev,
              isActive: false,
              openedViaButton: false,
            }));
            return true;

          default:
            return false;
        }
      },
      [slashCommandState, handleSlashCommandSelect]
    );

    const handleKeyDownWithSlashCommands: React.KeyboardEventHandler<HTMLInputElement> =
      useCallback(
        (e) => {
          const wasHandled = handleSlashCommandKeyDown(e);
          if (!wasHandled) {
            onKeyDown(e);
          }
        },
        [handleSlashCommandKeyDown, onKeyDown]
      );

    const handleTextChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text = e.target.value;
        onValueChange(text);

        // Update slash command detection
        if (inputRef.current) {
          const cursorPosition = inputRef.current.selectionStart || 0;
          updateSlashCommandDetection(text, cursorPosition);
        }
      },
      [onValueChange, updateSlashCommandDetection, inputRef]
    );

    const handleCursorPositionChange = useCallback(() => {
      requestAnimationFrame(() => {
        if (inputRef.current) {
          const cursorPosition = inputRef.current.selectionStart || 0;
          updateSlashCommandDetection(value, cursorPosition);
        }
      });
    }, [value, updateSlashCommandDetection, inputRef]);

    // Auto-resize textarea
    useEffect(() => {
      if (inputRef.current) {
        inputRef.current.style.height = "auto";
        const newHeight = Math.min(inputRef.current.scrollHeight, 200);
        inputRef.current.style.height = `${newHeight}px`;
        onHeightChange(newHeight);
      }
    }, [value, inputRef, onHeightChange]);

    // Close dropdown when clicking outside
    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as Element;
        if (
          !target.closest(".slash-command-dropdown") &&
          !target.closest("textarea") &&
          !inputRef.current?.contains(target)
        ) {
          setSlashCommandState((prev) => ({
            ...prev,
            isActive: false,
            openedViaButton: false,
          }));
        }
      };

      if (slashCommandState.isActive) {
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
      }
    }, [slashCommandState.isActive, inputRef]);

    return (
      <>
        <form onSubmit={onSubmit}>
          <textarea
            ref={inputRef}
            autoFocus
            className={cn(
              "w-full resize-none bg-transparent px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none",
              disabled && "cursor-not-allowed opacity-50"
            )}
            disabled={disabled}
            placeholder={placeholder}
            rows={1}
            value={value}
            onChange={handleTextChange}
            onKeyDown={handleKeyDownWithSlashCommands}
            onSelect={handleCursorPositionChange}
            onClick={handleCursorPositionChange}
            style={{ minHeight: "40px", maxHeight: "200px" }}
          />
        </form>

        {/* Slash Command Dropdown */}
        <SlashCommandDropdown
          matches={slashCommandState.matches}
          selectedIndex={slashCommandState.selectedIndex}
          onSelect={handleSlashCommandSelect}
          onClose={() =>
            setSlashCommandState((prev) => ({
              ...prev,
              isActive: false,
              openedViaButton: false,
            }))
          }
          position={{
            bottom: inputRef.current
              ? inputRef.current.getBoundingClientRect().top
              : 0,
            left: inputRef.current
              ? inputRef.current.getBoundingClientRect().left
              : 0,
            width: inputRef.current
              ? inputRef.current.getBoundingClientRect().width
              : 600,
          }}
          isVisible={slashCommandState.isActive}
          openedViaButton={slashCommandState.openedViaButton}
          selectedCategory="all"
          categories={[
            "all",
            ...Array.from(new Set(tools.map((t) => t.category))),
          ]}
          onCategoryChange={(category) => {
            // Filter matches by category if needed
            // This is a simplified version - GAIA's handles this more comprehensively
          }}
        />
      </>
    );
  }
);

ComposerInput.displayName = "ComposerInput";
