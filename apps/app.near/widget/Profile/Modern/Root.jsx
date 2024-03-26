const LightTheme = `
  --profile-stroke: #F8F8F8;

  --stroke:rgba(1, 33, 57, 0.13);

  --active-color: #E93D82;

  --color: #000;
  --color-muted: #6F6F6F;

  --button-outline-bg: #fff;
  --button-outline-stroke: rgba(0, 26, 51, 0.16);
  --button-outline-color: #11181c;
  --button-outline-hover-bg: rgba(0, 0, 0, 0.02);

  --button-primary-bg: #000;
  --button-primary-stroke: rgba(0, 0, 0, 1);
  --button-primary-color: #fff;
  --button-primary-hover-bg: rgba(0, 0, 0, 0.8);

  --hashtag-stroke: #F9E68C;
  --hashtag-bg: #FFFCE8;
  --hashtag-color: #946800;
  
  --bg: #fff;
  --bg-hover: rgba(0, 0, 0, 0.2);
  --bg-1: #151515;
  --pre: rgba(0, 0, 0, 0.9);

  --post-stroke: rgba(0, 37, 73, 0.05);
  --post-bg: rgba(255, 255, 255, 0.25);
  --post-shadow: rgba(22, 22, 22, 0.15);

  .post {
    transition: background-color 300ms;
    .expand-post {
      background-image: linear-gradient(
        to bottom,
        rgba(0, 0, 0, 0),
        rgba(0, 0, 0, 1) 25%
      );
    }

    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      .expand-post {
        background-image: linear-gradient(
          to bottom,
          rgba(0, 0, 0, 0),
          rgba(0, 0, 0, 1) 25%
        );
      }
    }

    .dropdown-menu {
      border-radius: 12px;
      border: 1px solid var(--Slate-Light-Alpha-3, rgba(0, 37, 73, 0.05));
      background: var(--White-A-Over-9, rgba(255, 255, 255, 0.39));
      background-blend-mode: overlay;
      box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.10);
      backdrop-filter: blur(25px);

      .dropdown-item, a {
        color: #000 !important;
        transition: all 300ms;
        &:hover {
          color: #000 !important;
        }
      }

      .dropdown-item:hover {
        background-color: rgba(0, 0, 0, 0.2);
      }
    }
  }
`;

const DarkTheme = `
  --profile-stroke: #161616;

  --stroke:#232323;

  --active-color: #E93D82;

  --color: #FFFFFFEB;
  --color-muted: #A0A0A0;

  --button-outline-bg: #000;
  --button-outline-stroke: #EDEDED;
  --button-outline-color: #FFFFFF;
  --button-outline-hover-bg: rgba(255, 255, 255, 0.2);

  --button-primary-bg: #FFFFFF;
  --button-primary-stroke: #FFFFFF;
  --button-primary-color: #000;
  --button-primary-hover-bg: rgba(255, 255, 255, 0.8);

  --hashtag-stroke: #F0C000;
  --hashtag-bg: #221A00;
  --hashtag-color: #F0C000;

  --bg: #000;
  --bg-hover: rgba(255, 255, 255, 0.2);
  --bg-1: #151515;

  --post-stroke: rgba(255, 255, 255, 0.2);
  --post-bg: rgba(255, 255, 255, 0.08);
  --post-shadow: rgba(0, 0, 0, 0.10);

  .post {
    transition: background-color 300ms;
    .expand-post {
      background-image: linear-gradient(
        to bottom,
        rgba(16, 16, 16, 0),
        rgba(16, 16, 16, 1) 25%
      ) !important;
    }
    
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
      .expand-post {
        background-image: linear-gradient(
          to bottom,
          rgba(12, 12, 12, 0),
        rgba(12, 12, 12, 1) 25%
        ) !important;
      }
    }
    
    .dropdown-menu {
      border-radius: 12px;
      border: 1px solid var(--White-A-Over-11, rgba(255, 255, 255, 0.2));
      background: var(--White-A-Over-10, rgba(255, 255, 255, 0.08));
      backdrop-filter: blur(25px);
      box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.10);
      background-blend-mode: overlay;

      .dropdown-item, a {
        color: #fff !important;
        transition: all 300ms;
        &:hover {
          color: #fff !important;          
        }
      }

      .dropdown-item:hover {
        background-color: rgba(255, 255, 255, 0.2);
      }
    }
  }
`;

const Theme = styled.div`
  box-sizing: border-box;
  ${(props) => (props.theme === "dark" ? DarkTheme : LightTheme)}
  --active-color: ${(props) => props.activeColor};
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

  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE0tDMPKzSQ.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE0tMMPKzSQ.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiAyp8kv8JHgFVrJJLmE0tCMPI.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1pVFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1pVGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmv1pVF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21lVFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21lVGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm21lVF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLucXtAKPY.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLufntAKPY.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrJJLucHtA.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hVFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hVGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmg1hVF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19VFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19VGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmr19VF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15VFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15VGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLmy15VF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111VFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111VGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm111VF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xVFteOcEg.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xVGdeOcEg.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiDyp8kv8JHgFVrJJLm81xVF9eO.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTucXtAKPY.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTufntAKPY.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiGyp8kv8JHgFVrLPTucHtA.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 200;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLFj_Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDz8Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJbecmNE.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJnecmNE.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecg.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 500;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLGT9Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 600;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLCz7Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 800;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLDD4Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* devanagari */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z11lFc-K.woff2)
      format("woff2");
    unicode-range: U+0900-097F, U+1CD0-1CF9, U+200C-200D, U+20A8, U+20B9, U+20F0,
      U+25CC, U+A830-A839, U+A8E0-A8FF, U+11B00-11B09;
  }
  /* latin-ext */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1JlFc-K.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Poppins";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLBT5Z1xlFQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u-w4BMUTPHjxsIPx-mPCLQ7A.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u-w4BMUTPHjxsIPx-oPCI.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2_FQft1dw.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI9w2_Gwft.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxsAUi-qJCY.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHjxsAXC-q.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wq_FQft1dw.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI5wq_Gwft.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI3wi_FQft1dw.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: italic;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u_w4BMUTPHjxsI3wi_Gwft.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30AUi-qJCY.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 100;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u8w4BMUTPHh30AXC-q.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USSwaPGR_p.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 300;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh7USSwiPGQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXjeu.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 400;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wXg.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwaPGR_p.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 700;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwiPGQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* latin-ext */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50XSwaPGR_p.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Lato";
    font-style: normal;
    font-weight: 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh50XSwiPGQ.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  /* cyrillic-ext */
  @font-face {
    font-family: "Raleway";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptsg8zYS_SKggPNyCg4QIFqPfE.woff2)
      format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Raleway";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptsg8zYS_SKggPNyCg4SYFqPfE.woff2)
      format("woff2");
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: "Raleway";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptsg8zYS_SKggPNyCg4QoFqPfE.woff2)
      format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
      U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323,
      U+0329, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Raleway";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptsg8zYS_SKggPNyCg4Q4FqPfE.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Raleway";
    font-style: italic;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptsg8zYS_SKggPNyCg4TYFq.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }
  /* cyrillic-ext */
  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptug8zYS_SKggPNyCAIT5lu.woff2)
      format("woff2");
    unicode-range: U+0460-052F, U+1C80-1C88, U+20B4, U+2DE0-2DFF, U+A640-A69F,
      U+FE2E-FE2F;
  }
  /* cyrillic */
  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptug8zYS_SKggPNyCkIT5lu.woff2)
      format("woff2");
    unicode-range: U+0301, U+0400-045F, U+0490-0491, U+04B0-04B1, U+2116;
  }
  /* vietnamese */
  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptug8zYS_SKggPNyCIIT5lu.woff2)
      format("woff2");
    unicode-range: U+0102-0103, U+0110-0111, U+0128-0129, U+0168-0169,
      U+01A0-01A1, U+01AF-01B0, U+0300-0301, U+0303-0304, U+0308-0309, U+0323,
      U+0329, U+1EA0-1EF9, U+20AB;
  }
  /* latin-ext */
  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptug8zYS_SKggPNyCMIT5lu.woff2)
      format("woff2");
    unicode-range: U+0100-02AF, U+0304, U+0308, U+0329, U+1E00-1E9F, U+1EF2-1EFF,
      U+2020, U+20A0-20AB, U+20AD-20C0, U+2113, U+2C60-2C7F, U+A720-A7FF;
  }
  /* latin */
  @font-face {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 100 900;
    font-display: swap;
    src: url(https://fonts.gstatic.com/s/raleway/v29/1Ptug8zYS_SKggPNyC0ITw.woff2)
      format("woff2");
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA,
      U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
      U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
  }

  --font-family: ${(props) => {
    switch (props.font) {
      case "InterVariable":
        return "InterVariable";
      case "Poppins":
        return "Poppins, InterVariable";
      case "Lato":
        return "Lato, InterVariable";
      case "Raleway":
        return "Raleway, InterVariable";
      default:
        return "InterVariable";
    }
  }};

  font-family: var(--font-family), sans-serif;
`;

function Root({ children, theme, font, activeColor }) {
  return (
    <Theme theme={theme} font={font} activeColor={activeColor}>
      {children}
    </Theme>
  );
}

return { Root };
