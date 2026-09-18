export const LANGUAGE_TO_FLAG = {
  english: "gb",
  spanish: "es",
  french: "fr",
  german: "de",
  mandarin: "cn",
  japanese: "jp",
  korean: "kr",
  hindi: "in",
  russian: "ru",
  portuguese: "pt",
  arabic: "sa",
  italian: "it",
  turkish: "tr",
  dutch: "nl",
};

export function getLanguageFlag(language, size = "h-3") {
  if (!language) return null;

  const countryCode = LANGUAGE_TO_FLAG[language.toLowerCase()];
  if (!countryCode) return null;

  return (
    <img
      src={`https://flagcdn.com/24x18/${countryCode}.png`}
      alt={`${language} flag`}
      className={`${size} w-auto inline-block rounded-[2px]`}
    />
  );
}