import { useEffect, useState } from "react";
import { TextProps, Text } from "react-native";
import { useLanguage } from "../context/Language";
// @ts-ignore
import translate from "translate-google-api";

export const TranslateText = (props: TextProps) => {
  const { children, ...restProps } = props;
  const [text, setText] = useState(children as string);

  const { lang } = useLanguage();

  useEffect(() => {
    const f = async () => {
      if (lang === "en") {
        setText(children as string);
      } else {
        try {
          const result: string = await translate(children as string, {
            to: lang,
          });

          setText(result);
        } catch (e) {
          console.log(e);
          setText(children as string);
        }
      }
    };

    f();
  }, [lang, children]);

  return <Text {...restProps}>{text}</Text>;
};
