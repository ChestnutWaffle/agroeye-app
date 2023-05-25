import { createContext, useContext, useState } from "react";

export const defaultLang = "en";

export const LanguageContext = createContext<{
  lang: string;
  updateLanguage: (lang: string) => void;
}>({
  lang: defaultLang,
  updateLanguage: (lang) => {},
});

export const LanguageProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [lang, setLang] = useState(defaultLang);

  const updateLanguage = (lang: string) => {
    setLang(lang);
  };

  const value = { lang, updateLanguage };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);
