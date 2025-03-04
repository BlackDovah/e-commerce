import { memo } from "react";
import { Button, Image } from "@mantine/core";

interface LanguageToggleProps {
  dir: "ltr" | "rtl";
  toggleLanguage: () => void;
  t: (key: string) => string;
}

export const LanguageToggle = memo(
  ({ dir, toggleLanguage, t }: LanguageToggleProps) => (
    <Button
      className={`flex ${dir === "ltr" ? "ml-auto" : "mr-auto"}`}
      variant="default"
      onClick={toggleLanguage}
    >
      {dir === "ltr" ? (
        <>
          <Image
            src="/images/EgyptFlag.png"
            alt="logo"
            className="aspect-square object-contain"
            fit="contain"
          />
          <span>{t("languageButton")}</span>
        </>
      ) : (
        <>
          <Image
            src="/images/USAFlag.png"
            alt="logo"
            className="aspect-square object-contain"
            fit="contain"
          />
          <span>{t("languageButton")}</span>
        </>
      )}
    </Button>
  ),
);
