const LightTheme = `
  --bg: #E6EDFE;
  --color: #101D46;
  --color-muted: rgba(0, 14, 24, 0.59);

  --profile-stroke: #E6EDFE;
  --bg1: rgba(255, 255, 255, 0.45);
  --bg1-hover: rgba(225, 225, 225, 0.45);
  --stroke: rgba(2, 60, 235, 0.15);
  --shadow: rgba(0, 0, 0, 0.1);

  --hashtag-stroke: #F9E68C;
  --hashtag-bg: #FFFCE8;
  --hashtag-color: #946800;

  --active-color: #D31E66;
`;

const DarkTheme = `
  --bg: black;
  --color: white;
`;

const Theme = styled.div`
  box-sizing: border-box;
  ${(props) => (props.theme === "dark" ? DarkTheme : LightTheme)}
  color: var(--color);
  background: var(--bg);

  /* Inter Font */
  @font-face {
    font-family: InterVariable;
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url("https://rsms.me/inter/font-files/InterVariable.woff2?v=4.0")
      format("woff2");
  }
  @font-face {
    font-family: InterVariable;
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url("https://rsms.me/inter/font-files/InterVariable-Italic.woff2?v=4.0")
      format("woff2");
  }

  /* cyrillic */
  @font-face {
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/pixelifysans/v1/CHylV-3HFUT7aC4iv1TxGDR9JnkEi1lR.woff2)
      format("woff2");
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* latin-ext */
  @font-face {
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/pixelifysans/v1/CHylV-3HFUT7aC4iv1TxGDR9JnMEi1lR.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Pixelify Sans";
    font-style: normal;
    font-weight: 400 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/pixelifysans/v1/CHylV-3HFUT7aC4iv1TxGDR9Jn0Eiw.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  font-family: "InterVariable", sans-serif;
`;

function Root({ children, theme }) {
  return <Theme theme={theme}>{children}</Theme>;
}

return { Root };
