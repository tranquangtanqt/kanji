/**
 * Kanji data stores meanings as `"<english> |(vi) <vietnamese> |(hv) <han-viet>"`.
 * Extracts the Vietnamese / Hán Việt portion for display, falling back to the
 * original english meaning when no translation markers are present.
 */
export function extractViHvMeaning(meaning?: string | null): string {
  if (!meaning) return "";

  const parts = meaning.split("|").map((part) => part.trim());
  const vi = parts
    .find((part) => part.startsWith("(vi)"))
    ?.replace(/^\(vi\)\s*/, "");
  const hv = parts
    .find((part) => part.startsWith("(hv)"))
    ?.replace(/^\(hv\)\s*/, "");

  if (vi && hv) return `${vi} (${hv})`;
  if (vi) return vi;
  if (hv) return hv;
  return parts[0] ?? meaning;
}
