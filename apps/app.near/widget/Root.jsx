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

  --post-stroke: rgba(0, 37, 73, 0.05);
  --post-bg: rgba(255, 255, 255, 0.25);
  --post-shadow: rgba(22, 22, 22, 0.15);

  .post {
    .dropdown-menu {
      border-radius: 12px;
      border: 1px solid var(--Slate-Light-Alpha-3, rgba(0, 37, 73, 0.05));
      background: var(--White-A-Over-9, rgba(255, 255, 255, 0.39));
      background-blend-mode: overlay;
      box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.10);
      backdrop-filter: blur(25px);

      .dropdown-item, a {
        color: #000 !important;
        &:hover {
          color: #000 !important;
        }
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

  --post-stroke: rgba(255, 255, 255, 0.2);
  --post-bg: rgba(255, 255, 255, 0.08);
  --post-shadow: rgba(0, 0, 0, 0.10);

  .post {
    .dropdown-menu {
      border-radius: 12px;
      border: 1px solid var(--White-A-Over-11, rgba(255, 255, 255, 0.59));
      background: var(--White-A-Over-10, rgba(255, 255, 255, 0.08));
      backdrop-filter: blur(25px);
      box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.10);
      background-blend-mode: overlay;

      .dropdown-item, a {
        color: #fff !important;
        &:hover {
          color: #000 !important;
        }
      }
    }
  }
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
`;

function Root({ children, theme }) {
  return <Theme theme={theme}>{children}</Theme>;
}

return { Root };
