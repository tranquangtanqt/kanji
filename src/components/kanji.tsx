"use client";

import * as React from "react";
import { joyoList } from "@/../data/joyo";
import { jinmeiyoList } from "@/../data/jinmeiyo";
import { extractViHvMeaning } from "@/lib/meaning";
import { KanjiStrokeAnimation } from "./kanji-animation";

interface Props {
  kanjiInfo: KanjiInfo | null;
  variantInfo: {
    aliases: string[];
  };
  graphData: BothGraphData | null;
  strokeAnimation: string | null;
  screen?: "mobile" | "desktop";
}

// Helper function to make the clip-path id unique
const makeSvgUnique = (svgContent: string, screen: string): string => {
  // Replace all occurrences of id="something" and href="#something" to make them unique
  return svgContent
    .replace(/id="(\w+)"/g, `id="$1-${screen}"`) // Update ids
    .replace(/href="#(\w+)"/g, `href="#$1-${screen}"`) // Update modern href references
    .replace(/xlink:href="#(\w+)"/g, `xlink:href="#$1-${screen}"`) // Update legacy xlink:href references
    .replace(/clip-path="url\(#(\w+)\)"/g, `clip-path="url(#$1-${screen})"`); // Update clip-path references
};

export const Kanji = ({
  kanjiInfo,
  variantInfo,
  graphData,
  strokeAnimation,
  screen,
}: Props) => {
  const composition = React.useMemo(
    () =>
      graphData?.noOutLinks?.links
        ?.reduce<string[]>((parts: string[], link: any) => {
          if (link.target === kanjiInfo?.id) {
            parts.push(String(link.source));
          }

          return parts;
        }, []) ?? [],
    [graphData?.noOutLinks?.links, kanjiInfo?.id],
  );

  return (
    <div className="min-h-[330px] relative size-full overflow-hidden grid grid-rows-[36px_100px_1fr] grid-cols-[125px_1fr]">
      <div>
        <h3 className="text-lg font-semibold">Kanji</h3>
      </div>
      <div className="p-2 w-full h-full overflow-hidden text-sm leading-6 row-span-3">
        {kanjiInfo && joyoList?.includes(kanjiInfo.id) && (
          <p>
            <strong>Kanji Jōyō</strong>
            {kanjiInfo?.jishoData?.taughtIn && (
              <span>
                , dạy ở <strong>{kanjiInfo?.jishoData?.taughtIn}</strong>
              </span>
            )}
          </p>
        )}
        {kanjiInfo && jinmeiyoList?.includes(kanjiInfo.id) && (
          <p>Kanji Jinmeiyō, dùng trong tên riêng</p>
        )}

        {kanjiInfo?.jishoData?.jlptLevel && (
          <p>
            Cấp độ JLPT: <strong>{kanjiInfo?.jishoData?.jlptLevel}</strong>
          </p>
        )}
        {kanjiInfo?.jishoData?.newspaperFrequencyRank && (
          <p>
            <strong>{kanjiInfo?.jishoData?.newspaperFrequencyRank}</strong> trong
            2500 kanji dùng nhiều nhất trên báo
          </p>
        )}
        {kanjiInfo?.jishoData?.strokeCount && (
          <p>
            Số nét: <strong>{kanjiInfo?.jishoData?.strokeCount}</strong>
          </p>
        )}
        {kanjiInfo?.jishoData?.meaning && (
          <>
            <p>
              Nghĩa:{" "}
              <strong>{extractViHvMeaning(kanjiInfo?.jishoData?.meaning)}</strong>
            </p>
          </>
        )}
        {kanjiInfo?.jishoData?.kunyomi && (
          <>
            <p>
              Kunyomi: <strong>{kanjiInfo.jishoData.kunyomi.join(", ")}</strong>
            </p>
          </>
        )}
        {kanjiInfo?.jishoData?.onyomi && (
          <>
            <p>
              Onyomi: <strong>{kanjiInfo.jishoData.onyomi.join(", ")}</strong>
            </p>
          </>
        )}

        {composition.length > 0 && (
          <>
            <p>
              Cấu tạo từ:
              {composition.map((comp: string) => (
                  <span key={comp}>{comp} </span>
                ))}
            </p>
          </>
        )}

        {variantInfo.aliases.length > 0 && (
          <p>
            Biến thể: <strong>{variantInfo.aliases.join(", ")}</strong>
          </p>
        )}
      </div>

      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden [grid-area:'main']">
        <h1 className="text-6xl leading-tight sm:text-5xl">{kanjiInfo?.id}</h1>
      </div>
      <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden">
        {strokeAnimation && (
          <KanjiStrokeAnimation
            svgContent={makeSvgUnique(strokeAnimation, screen ?? "unknown")}
            strokeCount={kanjiInfo?.jishoData?.strokeCount}
          />
        )}
      </div>
    </div>
  );
};
