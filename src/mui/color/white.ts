import { createTheme, alpha, getContrastRatio } from "@mui/material/styles";

// Augment the palette to include a white color
declare module "@mui/material/styles" {
  interface Palette {
    white: Palette["primary"];
  }

  interface PaletteOptions {
    white?: PaletteOptions["primary"];
  }
}

// Update the Button's color options to include a white option
declare module "@mui/material/Button" {
  interface ButtonPropsColorOverrides {
    white: true;
  }
}

const whiteBase = "#ffffff";
const whiteMain = alpha(whiteBase, 0.7);

export const themeWhite = createTheme({
  palette: {
    white: {
      main: whiteMain,
      light: alpha(whiteBase, 0.5),
      dark: alpha(whiteBase, 0.9),
      contrastText: getContrastRatio(whiteMain, "#fff") > 4.5 ? "#fff" : "#111",
    },
  },
});
