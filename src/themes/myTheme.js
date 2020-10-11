import { createMuiTheme } from "@material-ui/core/styles"

export const baseColor = {
  black: `#000`,
  white: `#fff`,
  darkBlue: `#222831`,
  blue: `#30475e`,
  tan: `#c1a57b`,
  offWhite: `#ececec`,
  buttonPrimary: `#3282b8`,
  buttonPrimaryHover: `#0f4c75`,
  buttonSecondary: `#7ea04d`,
  buttonSecondaryHover: `#335d2d`,
  buttonTertiary: `#b22222`,
  buttonTertiaryHover: `#7c0a02`,
}

export const myFonts = {
  roboto: {
    fontFamily: `Roboto, sans-serif`,
  },
  montserratBold: {
    fontFamily: `Montserrat, Arial, sans-serif`,
  },
}

export const myTheme = createMuiTheme({
  overrides: {
    MuiButton: {
      root: {
        backgroundColor: `${baseColor.buttonPrimary}!important`,
        color: `${baseColor.white}!important`,
        "&:hover": {
          backgroundColor: `${baseColor.buttonPrimaryHover}!important`,
          color: `${baseColor.offWhite}!important`,
        },
      },
      label: {
        color: `${baseColor.white}!important`,
        "&:hover": {
          color: `${baseColor.offWhite}!important`,
        },
      },
    },
    MuiCard: {
      root: {
        backgroundColor: baseColor.offWhite,
        margin: `1rem`,
        padding: `1rem`,
        width: `25%`,
      },
    },
  },
})
