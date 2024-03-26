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

const DropdownSelect = ({ children, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="d-flex gap-2 align-items-center rounded-2 p-2 bg-white"
      style={{
        border: "1px solid #dee2e6",
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns=%27http://www.w3.org/2000/svg%27 viewBox=%270 0 16 16%27%3e%3cpath fill=%27none%27 stroke=%27%23343a40%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27 stroke-width=%272%27 d=%27m2 5 6 6 6-6%27/%3e%3c/svg%3e"`,
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

const [color, setColor] = useState(props.color ?? colors[0]);
const [showColorDropdown, setShowColorDropdown] = useState(false);

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

          <div
            className="form-check form-switch mb-3"
            data-bs-theme={props.theme === "dark" ? "dark" : "light"}
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
            data-bs-theme={props.theme === "dark" ? "dark" : "light"}
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
          <div className="d-flex flex-column gap-3 mb-3">
            <Heading>Fonts</Heading>
            <div className="form-group">
              <label htmlFor="primary-font">Primary</label>
              <select
                id="primary-font"
                name="primary-font"
                class="form-select"
                style={{ fontFamily: `"${font}"` }}
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
                <option value="Lato" style={{ fontFamily: "Lato, sans-serif" }}>
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
              <div className="form-group">
                <label htmlFor="accent-font">Accent</label>
                <select
                  style={{ fontFamily: `"${accentFont}"` }}
                  id="accent-font"
                  name="accent-font"
                  class="form-select"
                  value={accentFont}
                  onChange={(e) => setAccentFont(e.target.value)}
                >
                  <option
                    value="Pixelify Sans"
                    style={{
                      fontFamily: "var(--accent-font-family), sans-serif",
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
                    className="d-flex flex-wrap gap-2 rounded-2 p-2 bg-white shadow-sm mt-2"
                    style={{ border: "1px solid #dee2e6" }}
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
                        }}
                      ></div>
                    ))}
                  </div>
                )}
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
