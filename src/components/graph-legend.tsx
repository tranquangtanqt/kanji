"use client";

import * as React from "react";
import { InfoIcon } from "lucide-react";
import {
  NODE_SELECTED,
  NODE_JOYO,
  NODE_JINMEIYO,
  NODE_OTHER,
} from "@/lib/graph-colors";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

interface Props {
  showOutLinks: boolean;
  showParticles: boolean;
}

const NODE_LEGEND = [
  { label: "Kanji đang chọn", color: NODE_SELECTED },
  { label: "Kanji Joyo", color: NODE_JOYO },
  { label: "Kanji Jinmeiyo", color: NODE_JINMEIYO },
  { label: "Khác", color: NODE_OTHER },
];

export const GraphLegend: React.FC<Props> = ({
  showOutLinks,
  showParticles,
}) => {
  return (
    <div className="absolute bottom-16 left-4 z-50 md:bottom-4">
      <Popover>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              size="icon"
              className="!bg-background hover:!bg-muted dark:!bg-background dark:hover:!bg-muted"
              aria-label="Mở chú giải sơ đồ"
            >
              <InfoIcon className="size-4" />
            </Button>
          }
        />
        <PopoverContent align="start" side="top" className="w-72 space-y-3">
          <div>
            <p className="text-sm font-semibold">Màu nút</p>
            <div className="mt-2 space-y-1.5">
              {NODE_LEGEND.map((entry) => (
                <div
                  key={entry.label}
                  className="flex items-center gap-2 text-xs"
                >
                  <span
                    className="inline-block size-3 rounded-full border border-foreground/70"
                    style={{ backgroundColor: entry.color }}
                  />
                  <span>{entry.label}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold">Liên kết</p>
            <div className="mt-2 space-y-1.5 text-xs">
              <div className="flex items-center gap-2">
                <svg width="24" height="10" viewBox="0 0 24 10" aria-hidden>
                  <line
                    x1="1"
                    y1="5"
                    x2="18"
                    y2="5"
                    stroke="currentColor"
                    strokeWidth="1.2"
                  />
                  <path d="M18 2 L23 5 L18 8 Z" fill="currentColor" />
                </svg>
                <span>Mũi tên thể hiện chiều liên kết</span>
              </div>
              <p>Âm Onyomi chung được hiển thị dưới dạng chữ trên liên kết (nếu có).</p>
              <p>
                {showOutLinks
                  ? "Liên kết đi ra đang hiển thị."
                  : "Liên kết đi ra đang ẩn."}
              </p>
              <p>
                {showParticles
                  ? "Hạt mũi tên đang bật."
                  : "Hạt mũi tên đang tắt."}
              </p>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
