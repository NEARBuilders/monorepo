const { Button } = VM.require("events.efiz.near/widget/components") || {
  Button: () => <></>,
};

const StyledNavbar = styled.div`
  width: 64px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  width: 100%;

  border-bottom: 1px solid var(--stroke-color, rgba(255, 255, 255, 0.2));

  @media screen and (max-width: 768px) {
    padding: 24px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    width: 100%;

    a {
      display: flex;
    }
  }
`;

const DesktopNavigation = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const MobileNavigation = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`;

const { href } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const { param } = props;

const NavLink = ({ to, children }) => {
  if (param === "tab") {
    return (
      <Link
        key={to}
        to={href({
          widgetSrc: "events.efiz.near/widget/app",
          params: {
            page: "preview",
            tab: to,
          },
        })}
      >
        {children}
      </Link>
    );
  } else {
    return (
      <Link
        key={to}
        to={href({
          widgetSrc: "events.efiz.near/widget/app",
          params: {
            page: to,
          },
        })}
      >
        {children}
      </Link>
    );
  }
};

const [showMenu, setShowMenu] = useState(false);
const toggleDropdown = () => setShowMenu(!showMenu);

const SignInOrConnect = () => (
  <>
    {context.accountId ? (
      <Button>Signed in</Button>
    ) : (
      <Button>Signed out</Button>
    )}
  </>
);

const StyledDropdown = styled.div`
  .dropdown-toggle {
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--slate-dark-5);
    border-radius: 50px;
    outline: none;
    border: 0;
    width: 40px;
    height: 40px;

    &:after {
      display: none;
    }

    .menu {
      width: 18px;
      height: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;

      div {
        background-color: var(--slate-dark-11);
        height: 2px;
        width: 100%;
        border-radius: 30px;
      }
    }

    :hover {
      .menu {
        div {
          background-color: white;
        }
      }
    }
  }

  ul {
    background-color: var(--slate-dark-5);
    width: 100%;

    li {
      padding: 0 6px;
    }

    button,
    a {
      color: var(--slate-dark-11);
      display: flex;
      align-items: center;
      border-radius: 8px;
      padding: 12px;

      :hover,
      :focus {
        text-decoration: none;
        background-color: var(--slate-dark-1);
        color: white;

        svg {
          path {
            stroke: white;
          }
        }
      }

      svg {
        margin-right: 7px;
        path {
          stroke: var(--slate-dark-9);
        }
      }
    }
  }
`;

const Navbar = ({ page, param, routes, ...props }) => (
  <StyledNavbar>
    <div className="d-flex align-items-center justify-content-between w-100">
      <DesktopNavigation className="container-xl">
        <ButtonGroup style={{ flex: 1 }}>
          {routes &&
            (Object.keys(routes) || []).map((k) => {
              const route = routes[k];
              if (route.hide) {
                return null;
              }
              return (
                <NavLink to={k}>
                  <Button key={k} variant={page === k && "primary"}>
                    {route.init.icon && <i className={route.init.icon}></i>}
                    {route.init.name}
                  </Button>
                </NavLink>
              );
            })}
        </ButtonGroup>

        <div
          style={{
            flex: 1,
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <SignInOrConnect />
        </div>
      </DesktopNavigation>
      <MobileNavigation>
        <Link
          to={href({
            widgetSrc: "events.efiz.near/widget/app",
            params: {
              [param]: "home",
            },
          })}
        >
          <img
            style={{ width: 85, objectFit: "cover" }}
            src="https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya"
            alt="Build DAO Logo"
          />
        </Link>
        <Button
          type="icon"
          variant="outline"
          className="rounded-2"
          onClick={toggleDropdown}
        >
          <i style={{ fontSize: 24 }} className="bi bi-list"></i>
        </Button>
      </MobileNavigation>
    </div>
    <MobileNavigation>
      {showMenu && (
        <div className="text-white w-100 d-flex flex-column gap-3 mt-3">
          <ButtonGroup className="align-items-stretch">
            {routes &&
              (Object.keys(routes) || []).map((k) => {
                const route = routes[k];
                if (route.hide) {
                  return null;
                }
                return (
                  <NavLink to={k} style={{ textDecoration: "none" }}>
                    <Button
                      key={k}
                      variant={page === k && "primary"}
                      className="w-100"
                      onClick={() => setShowMenu(false)}
                    >
                      {route.init.icon && <i className={route.init.icon}></i>}
                      {route.init.name}
                    </Button>
                  </NavLink>
                );
              })}
          </ButtonGroup>
          <div className="d-flex w-100 align-items-center gap-3 justify-content-center">
            <SignInOrConnect />
          </div>
        </div>
      )}
    </MobileNavigation>
  </StyledNavbar>
);

return <Navbar page={props.page} routes={props.routes} {...props} />;
