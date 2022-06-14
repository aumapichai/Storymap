import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";
declare module "@mui/material" {
  // interface ButtonPropsVariantOverrides {
  //   dashed: true;
  //   white_outlined: true;
  //   whiteOutlined2: true;
  //   btnSignUp: true;
  // }
  // interface ButtonPropsColorOverrides {
  //   mine: true;
  // }
  // interface ButtonPropsSizeOverrides {
  //   xlarge: true;
  // }
  interface TypographyPropsVariantOverrides {
    titleMain: true;
    description: true;
    titleCard: true;
    descriptionCard: true;
    titleReason: true;
    contentReason: true;
  }
}
// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },

  typography: {
    fontFamily: "Prompt",
  },

  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "titleMain" },
          style: ({ theme }) => ({
            display: "block",
            margin: "0",
            fontFamily: "KanitRegular",

            fontSize: "24px",
            fontWeight: "600",
            color: "#525252",
            // padding: "15px 22px",
          }),
        },
        {
          props: { variant: "titleCard" },
          style: ({ theme }) => ({
            display: "block",
            margin: "0",
            fontFamily: "KanitLight",
            fontSize: "20px",
            lineHeight: "30px",
            color: "#707070",
            // padding: "15px 22px",
          }),
        },
        {
          props: { variant: "description" },
          style: ({ theme }) => ({
            display: "block",
            margin: "0",
            fontFamily: "KanitExtraLight",
            // fontWeight: "300",
            fontSize: "16px",
            lineHeight: "24px",
            color: "#383838",
            // padding: "15px 22px",
            textIndent: "24px",
            textAlign: "justify",
          }),
        },
        {
          props: { variant: "descriptionCard" },
          style: ({ theme }) => ({
            margin: "0",
            fontFamily: "KanitExtraLight",
            fontSize: "16px",
            lineHeight: "19px",
            color: "#383838",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            overflow: "hidden",
            display: "-webkit-box",
          }),
        },
        {
          props: { variant: "titleReason" },
          style: ({ theme }) => ({
            margin: "0 10px 10px 10px",
            fontFamily: "KanitRegular",
            fontSize: "17px",
            color: "#383838",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "1",
            overflow: "hidden",
            display: "-webkit-box",
            width: "85%",
            paddingTop: "10px",
          }),
        },
        {
          props: { variant: "contentReason" },
          style: ({ theme }) => ({
            margin: "0",
            fontFamily: "KanitLight",
            fontSize: "14px",
            lineHeight: "20px",
            color: "#383838",
            WebkitBoxOrient: "vertical",
            WebkitLineClamp: "2",
            overflow: "hidden",
            display: "-webkit-box",
            padding: "0 15px 0 15px",
          }),
        },
      ],
    },
  },
});

export default theme;
