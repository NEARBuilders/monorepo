const creatorId = props.creatorId || "hack.near";

const { Button } = VM.require("buildhub.near/widget/components") || {
  Button: () => <></>,
};

const routes = props.routes ?? {
  main: {
    path: "hack.near/widget/page.index",
    blockHeight: "final",
    init: {
      name: "App",
    },
  },
  social: {
    path: "hack.near/widget/page.feed",
    blockHeight: "final",
    init: {
      name: "Discussion",
    },
  },
  docs: {
    path: "hack.near/widget/page.docs",
    blockHeight: "final",
    init: {
      name: "Guide",
    },
  },
};

const StyledNavbar = styled.div`
  width: 64px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 24px 48px;
  width: 100%;

  background-color: #0b0c14;
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
  margin-top: 3px;

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

const NavLink = ({ to, children }) => (
  <Link
    key={to}
    to={href({
      widgetSrc: `${creatorId}/widget/${appId}`,
      params: {
        page: to,
      },
    })}
  >
    {children}
  </Link>
);

const [showMenu, setShowMenu] = useState(false);
const toggleDropdown = () => setShowMenu(!showMenu);

const SignInOrConnect = () => (
  <>
    {context.accountId ? (
      <Widget
        src="hack.near/widget/ConnectButton"
        props={{ accountId: "every.near" }}
      />
    ) : (
      <Button>Signed Out</Button>
    )}
  </>
);

const Navbar = ({ page, ...props }) => (
  <StyledNavbar>
    <div className="d-flex align-items-center justify-content-between w-100">
      <DesktopNavigation className="container-xl">
        <Link
          style={{ flex: 1 }}
          to={href({
            widgetSrc: "hack.near/widget/app",
            params: {
              page: "main",
            },
          })}
        >
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: props.image,
              style: { width: "39px" },
              className: "me-3",
              fallbackUrl:
                "https://builders.mypinata.cloud/ipfs/QmTyDir9Myoid84HVgUDLwirMdb7CkD7GxvGhrBPo6ruLE",
            }}
          />
        </Link>
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
            widgetSrc: "hack.near/widget/app",
            params: {
              page: "main",
            },
          })}
        >
          <img
            style={{ width: 85, objectFit: "cover" }}
            src="https://ipfs.near.social/ipfs/bafkreihbwho3qfvnu4yss3eh5jrx6uxhrlzdgtdjyzyjrpa6odro6wdxya"
            alt="Build DAO"
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
