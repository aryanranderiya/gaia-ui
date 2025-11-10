"use client";

import * as React from "react";
import { Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface FullscreenButtonProps {
  children: React.ReactNode;
}

export function FullscreenButton({ children }: FullscreenButtonProps) {
  return (
    <Dialog>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button
              size="icon"
              variant={"secondary"}
              className="min-h-6 min-w-6 transition-opacity hover:bg-white"
            >
              <Maximize2 className="h-3 w-3" />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>Open in Full Screen</TooltipContent>
      </Tooltip>
      <DialogContent className="max-w-[95vw] max-h-[95vh] h-[95vh] min-w-[95vw] overflow-auto">
        <div className="flex flex-wrap items-center justify-center gap-4 w-full h-full">
          {children}
        </div>
      </DialogContent>
    </Dialog>
  );
}
