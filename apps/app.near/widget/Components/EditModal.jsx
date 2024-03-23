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
    transform: translate(-50%, -50%);
    width: 90vw;
    max-width: 450px;
    max-height: 85vh;
    z-index: 5;
    padding: 25px;
    animation: contentShow 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  .DialogContent:focus {
    outline: none;
  }

  .DialogTitle {
    margin: 0;
    font-weight: 500;
    font-size: 17px;
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

return (
  <ModalRoot>
    <Dialog.Root>
      <Dialog.Trigger asChild>
        {props.trigger ?? <Button>Edit Profile</Button>}
      </Dialog.Trigger>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent">
        <Dialog.Title className="DialogTitle">Edit profile</Dialog.Title>
        <Dialog.Description className="DialogDescription">
          <p>Make changes to your profile here. Click save when you're done.</p>
          <div>
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
          </div>
        </Dialog.Description>
        <Dialog.Close asChild>
          <Button variant="transparent" className="me-1">
            Close
          </Button>
        </Dialog.Close>

        <Button
          varaint="primary"
          onClick={() => {
            Social.set({
              profile: {
                profileTheme: theme ? "dark" : "light",
                profileLayout: profileLayout ? "pixel" : "modern",
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
