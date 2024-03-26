const { Button } = VM.require("app.near/widget/Components") || {
  Button: () => <></>,
};

const accountId = props.accountId;
const profile = Social.getr(`${accountId}/profile`);

const [theme, setTheme] = useState(
  profile.profileTheme === "dark" ?? props.theme
);
const [profileLayout, setProfileLayout] = useState(
  props.profileLayout === "pixel"
);
const [font, setFont] = useState(profile.profileFont);
const [accentFont, setAccentFont] = useState(profile.profileAccentFont);
const [backgroundStyle, setBackgroundStyle] = useState(
  profile.profileBackground ?? "plain"
);

const ModalRoot = styled.div`
  .DialogOverlay {
    background-color: rgba(15, 15, 15, 0.5);
    position: fixed;
    inset: 0;
    z-index: 5;
    animation: overlayShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }

  .DialogContent {
    background-color: var(--bg);
    color: var(--color);
    border-radius: 1rem;
    box-shadow:
      hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
      hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
    position: fixed;
    top: 50%;
    left: 50%;
    overflow: auto;
    z-index: 1001;
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .DialogContent:focus {
    outline: none;
  }

  .DialogTitle {
    margin: 0;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    font-weight: 500;
    font-size: 17px;

    i {
      font-size: 22px;
    }
  }

  .DialogDescription {
    margin: 10px 0 20px;
    font-size: 15px;
    line-height: 1.5;
  }

  @keyframes overlayShow {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes contentShow {
    from {
      opacity: 0;
      transform: translate(-50%, -48%) scale(0.96);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
  }
`;

const Heading = styled.h3`
  margin: 0;
  font-family: InterVariable, sans-serif;
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: 140%; /* 28px */
`;

const DropdownSelect = ({ children, onClick, theme }) => {
  return (
    <div
      onClick={onClick}
      className="d-flex gap-2 align-items-center rounded-2 p-2"
      style={{
        backgroundColor: theme === "dark" ? "#212529" : "white",
        border: `1px solid ${theme === "dark" ? "#495057" : "#dee2e6"}`,
        backgroundImage:
          theme === "dark"
            ? `url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23dee2e6%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e")`
            : `url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e")`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right .75rem center",
        backgroundSize: "16px 12px",
        cursor: "pointer",
      }}
    >
      {children}
    </div>
  );
};

const colors = [
  {
    label: "Tomato",
    value: "#E54D2E",
  },
  { label: "Red", value: "#E5484D" },
  {
    label: "Crimson",
    value: "#E93D82",
  },
  {
    label: "Pink",
    value: "#D6409F",
  },
  { label: "Plum", value: "#AB4ABA" },
  {
    label: "Purple",
    value: "#8E4EC6",
  },
  {
    label: "Violet",
    value: "#6E56CF",
  },
  {
    label: "Indigo",
    value: "#3E63DD",
  },
  {
    label: "Blue",
    value: "#0091FF",
  },
  {
    label: "Sky",
    value: "#68DDFD",
  },
  {
    label: "Cyan",
    value: "#05A2C2",
  },
  {
    label: "Teal",
    value: "#12A594",
  },
  {
    label: "Green",
    value: "#30A46C",
  },
  {
    label: "Grass",
    value: "#46A758",
  },
  {
    label: "Mint",
    value: "#70E1C8",
  },
  {
    label: "Lime",
    value: "#99D52A",
  },
  {
    label: "Yellow",
    value: "#F5D90A",
  },
  {
    label: "Amber",
    value: "#FFB224",
  },
  {
    label: "Orange",
    value: "#F76808",
  },
  {
    label: "Gold",
    value: "#978365",
  },
  {
    label: "Bronze",
    value: "#A18072",
  },
  {
    label: "Olive",
    value: "#8B918A",
  },
];

const [color, setColor] = useState(
  colors.filter((color) => color.value === props.activeColor)[0] ?? colors[0]
);
const [showColorDropdown, setShowColorDropdown] = useState(false);

const [name, setName] = useState(profile.name ?? "");
const [description, setDescription] = useState(profile.description ?? "");
const [twitter, setTwitter] = useState(profile.linktree.twitter ?? "");
const [github, setGithub] = useState(profile.linktree.github ?? "");
const [telegram, setTelegram] = useState(profile.linktree.telegram ?? "");
const [website, setWebsite] = useState(profile.linktree.website ?? "");
const [image, setImage] = useState(profile.image ?? {});
const [backgroundImage, setBackgroundImage] = useState(
  profile.backgroundImage ?? {}
);

const onNameChange = useCallback((e) => {
  setName(e.target.value);
}, []);

const onDescriptionChange = useCallback((e) => {
  setDescription(e.target.value);
}, []);

const onTwitterChange = useCallback((e) => {
  setTwitter(e.target.value);
}, []);

const onGithubChange = useCallback((e) => {
  setGithub(e.target.value);
}, []);

const onTelegramChange = useCallback((e) => {
  setTelegram(e.target.value);
}, []);

const onWebsiteChange = useCallback((e) => {
  setWebsite(e.target.value);
}, []);

const ProfileImageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 4px;

  img {
    width: 64px;
    height: 64px;
    object-fit: cover;
    border-radius: 1rem;
  }

  .text-white {
    color: var(--color) !important;
    border: 1px solid var(--stroke);
    padding: 8px 12px;
    border-radius: 8px;
    transition: all 300ms;

    &:hover {
      opacity: 0.8;
    }
  }
`;

return (
  <ModalRoot>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.trigger ?? <Button>Edit Profile</Button>}
      </Dialog.Trigger>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">
          <Heading>Edit profile</Heading>
          <Dialog.Close asChild>
            <Button variant="transparent">
              <i className="bi bi-x"></i>
            </Button>
          </Dialog.Close>
        </Dialog.Title>
        <Dialog.Description className="DialogDescription">
          <p>Make changes to your profile here. Click save when you're done.</p>
          <ul
            class="nav nav-tabs"
            id="myTab"
            role="tablist"
            data-bs-theme={props.theme}
          >
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target="#profile-tab-pane"
                type="button"
                role="tab"
                aria-controls="profile-tab-pane"
                aria-selected="true"
              >
                Profile Info
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="theme-tab"
                data-bs-toggle="tab"
                data-bs-target="#theme-tab-pane"
                type="button"
                role="tab"
                aria-controls="theme-tab-pane"
                aria-selected="false"
              >
                Theme
              </button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div
              class="tab-pane fade show active"
              id="profile-tab-pane"
              role="tabpanel"
              aria-labelledby="profile-tab"
              tabindex="0"
            >
              <div
                className="d-flex flex-column gap-3 mt-3"
                data-bs-theme={props.theme}
              >
                <ProfileImageContainer className="d-flex flex-column gap-1">
                  <label>Profile Image</label>
                  <div className="d-flex align-items-center gap-1">
                    <Widget
                      src="buildhub.near/widget/components.profile.ImageUploader"
                      loading=""
                      props={{
                        image: profile.image,
                        setImage: setImage,
                      }}
                    />
                  </div>
                </ProfileImageContainer>
                <ProfileImageContainer className="d-flex flex-column gap-1">
                  <label>Background Image</label>
                  <div className="d-flex align-items-center gap-1">
                    <Widget
                      src="buildhub.near/widget/components.profile.ImageUploader"
                      loading=""
                      props={{
                        image: profile.backgroundImage,
                        setImage: setBackgroundImage,
                      }}
                    />
                  </div>
                </ProfileImageContainer>
                <div className="form-group">
                  <label>Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={onNameChange}
                    placeholder="Enter your name"
                  />
                </div>
                <div className="form-group">
                  <label>Description</label>
                  <textarea
                    type="text"
                    className="form-control"
                    value={description}
                    onChange={onDescriptionChange}
                    placeholder="Markdown Supported"
                  />
                </div>
                <div className="form-group">
                  <label>Twitter</label>
                  <input
                    type="text"
                    value={twitter}
                    onChange={onTwitterChange}
                    placeholder="Enter your X/Twitter handle"
                  />
                </div>
                <div className="form-group">
                  <label>GitHub</label>
                  <input
                    type="text"
                    value={github}
                    onChange={onGithubChange}
                    placeholder="Enter your GitHub handle"
                  />
                </div>
                <div className="form-group">
                  <label>Telegram</label>
                  <input
                    type="text"
                    value={telegram}
                    onChange={onTelegramChange}
                    placeholder="Enter your Telegram handle"
                  />
                </div>
                <div className="form-group">
                  <label>Website</label>
                  <input
                    type="text"
                    value={website}
                    onChange={onWebsiteChange}
                    placeholder="Enter your website URL"
                  />
                </div>
              </div>
            </div>
            <div
              class="tab-pane fade"
              id="theme-tab-pane"
              role="tabpanel"
              aria-labelledby="theme-tab"
              tabindex="0"
            >
              <div
                className="form-check form-switch my-3"
                data-bs-theme={props.theme}
              >
                <input
                  class="form-check-input"
                  checked={theme}
                  onChange={(e) => setTheme(e.target.checked)}
                  type="checkbox"
                  id="darktheme"
                />
                <label class="form-check-label" for="darktheme">
                  Dark Theme
                </label>
              </div>
              <div
                className="form-check form-switch mb-3"
                data-bs-theme={props.theme}
              >
                <input
                  class="form-check-input"
                  checked={profileLayout}
                  onChange={(e) => setProfileLayout(e.target.checked)}
                  type="checkbox"
                  id="darktheme"
                />
                <label class="form-check-label" for="darktheme">
                  Pixel Layout
                </label>
              </div>
              {!profileLayout && (
                <div className="form-group mb-3" data-bs-theme={props.theme}>
                  <label htmlFor="background-style">Background Style</label>
                  <select
                    id="background-style"
                    name="background-style"
                    class="form-select"
                    value={backgroundStyle}
                    onChange={(e) => setBackgroundStyle(e.target.value)}
                  >
                    <option value="plain">Plain</option>
                    <option value="half">Half gradient</option>
                    <option value="full">Full gradient</option>
                  </select>
                </div>
              )}
              <div className="d-flex flex-column gap-3 mb-3">
                <Heading>Fonts</Heading>
                <div className="form-group" data-bs-theme={props.theme}>
                  <label htmlFor="primary-font">Primary</label>
                  <select
                    id="primary-font"
                    name="primary-font"
                    class="form-select"
                    style={{ fontFamily: `"${font}", sans-serif` }}
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                  >
                    <option
                      value="InterVariable"
                      style={{ fontFamily: "InterVariable, sans-serif" }}
                    >
                      Inter
                    </option>
                    <option
                      value="Poppins"
                      style={{ fontFamily: "Poppins, sans-serif" }}
                    >
                      Poppins
                    </option>
                    <option
                      value="Lato"
                      style={{ fontFamily: "Lato, sans-serif" }}
                    >
                      Lato
                    </option>
                    <option
                      value="Raleway"
                      style={{ fontFamily: "Raleway, sans-serif" }}
                    >
                      Raleway
                    </option>
                  </select>
                </div>
                {profileLayout && (
                  <div className="form-group" data-bs-theme={props.theme}>
                    <label htmlFor="accent-font">Accent</label>
                    <select
                      style={{ fontFamily: `"${accentFont}", sans-serif` }}
                      id="accent-font"
                      name="accent-font"
                      class="form-select"
                      value={accentFont}
                      onChange={(e) => setAccentFont(e.target.value)}
                    >
                      <option
                        value="Pixelify Sans"
                        style={{
                          fontFamily: "Pixelify Sans, sans-serif",
                        }}
                      >
                        Pixelify Sans
                      </option>
                      <option
                        value="Press Start 2P"
                        style={{ fontFamily: '"Press Start 2P", sans-serif' }}
                      >
                        Press Start
                      </option>
                      <option
                        value="Silkscreen"
                        style={{ fontFamily: "Silkscreen, sans-serif" }}
                      >
                        Silkscreen
                      </option>
                    </select>
                  </div>
                )}
              </div>
              <div className="d-flex flex-column gap-3 mb-3">
                <Heading>Theme Color</Heading>
                <div>
                  <label>Primary Color</label>
                  <div>
                    <DropdownSelect
                      theme={props.theme}
                      onClick={() => setShowColorDropdown(!showColorDropdown)}
                    >
                      <div
                        style={{
                          width: 24,
                          height: 24,
                          borderRadius: 8,
                          background: color.value,
                        }}
                      ></div>
                      {color.label}
                    </DropdownSelect>
                    {showColorDropdown && (
                      <div
                        className="d-flex flex-wrap gap-2 rounded-2 p-2 shadow-sm mt-2"
                        style={{
                          border: `1px solid ${props.theme === "dark" ? "#495057" : "#dee2e6"}`,
                          background:
                            props.theme === "dark" ? "#212529" : "#fff",
                        }}
                      >
                        {colors.map((color) => (
                          <div
                            key={color.label}
                            onClick={() => {
                              setColor(color);
                              setShowColorDropdown(!showColorDropdown);
                            }}
                            style={{
                              width: 24,
                              height: 24,
                              borderRadius: 8,
                              background: color.value,
                              cursor: "pointer",
                              border:
                                props.activeColor === color.value &&
                                `2px solid ${props.theme === "dark" ? "white" : "black"}`,
                            }}
                          ></div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Dialog.Description>
        <Dialog.Close asChild>
          <Button variant="transparent" className="me-1">
            Close
          </Button>
        </Dialog.Close>

        <Button
          variant="primary"
          onClick={() => {
            Social.set({
              profile: {
                profileTheme: theme ? "dark" : "light",
                profileLayout: profileLayout ? "pixel" : "modern",
                profileFont: font,
                profileAccentFont: accentFont,
                profileActiveColor: color.value,
                profileBackground: backgroundStyle,
                name,
                image: image,
                backgroundImage: backgroundImage,
                description,
                linktree: {
                  twitter,
                  github,
                  telegram,
                  website,
                },
              },
            });
          }}
        >
          Save Changes
        </Button>
      </Dialog.Content>
    </Dialog.Root>
  </ModalRoot>
);
