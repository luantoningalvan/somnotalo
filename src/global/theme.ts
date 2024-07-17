import {
  extendTheme,
  withDefaultColorScheme,
  ThemeOverride,
  theme as baseTheme,
} from "@chakra-ui/react";

const baseStyle: ThemeOverride = {
  config: {
    initialColorMode: "dark",
    useSystemColorMode: false,
  },
  fonts: {
    body: "Poppins",
    heading: "Poppins",
    mono: "Poppins",
  },
  styles: {
    global: {
      body: {
        bg: "#10101d",
        color: "gray.50",
      },
    },
  },
  colors: {
    gray: {
      ...baseTheme.colors.gray,
      700: "#191926",
    },
  },
};

export const theme = extendTheme(
  baseStyle,
  withDefaultColorScheme({ colorScheme: "blue" })
);
