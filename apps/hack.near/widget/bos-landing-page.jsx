const fontUrl = `https://ipfs.io/ipfs/bafkreicrs3gh7f77yhpw4xiejx35cd56jcczuhvqbwkn77g2ztkrjejopa`;

const className = "image-container";

const css = `
@font-face {
    font-family: "Pixter";
    src: url("${fontUrl}");
}

a, a:focus, a:visited, a:hover {
  color: white !important;
}

.apps {
  margin-top: 32px;
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.flex {
  display: flex;
  align-items: center;
}

.flex-right {
  padding-left: 16px;
  > p {
    margin-bottom: 2px;
  }
  > .subtle {
    font-size: 0.8rem;
  }
}
.gray {
  color: #888 !important;
}

.image-parent {
  position: relative;
  width: 100px;
  height: 100px;
  > .shadow {
    width: 80%;
    height: 80%;
    box-shadow: 0 0 32px rgba(255, 255, 255, 1) !important;
    position: absolute;
    top: 10%;
    left: 10%;
    z-index: 1;
  }
  > .eth-logo {
    z-index: 3;
    position: absolute;
    bottom: -10px;
    right: -10px;
    > img {

    width: 40px;
    height: 40px;
    }
  }
}

.image-container {
  z-index: 2;
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
 clip-path: polygon(
    0 10%,
    10% 10%,
    10% 0,
    90% 0,
    90% 10%,
    100% 10%,
    100% 90%,
    90% 90%,
    90% 100%,
    10% 100%,
    10% 90%,
    0% 90%,
    0% 10%
  );
 > img {
  height: 100%;
  object-fit: contain;
  overflow: hidden;
  background: white;
 }
}

.header {
    position: relative;
    display: flex;
    overflow: hidden;
    width: 100%;
    filter: contrast(1.2);
    > div {
        padding: 32px;
        h1 {
        font-size: 3rem;
        }
        h2 {
            color: #ddd;
        }
        > div {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            height: 100%;
        }
    }
}

.header-left {
    background: linear-gradient(253.16deg, #4D1CB6 1.53%, #AC3A7F 86.25%);
    width: 55%;
    height: 260px;
  transform-origin: 100% 0;
  transform: skew(-10deg);
  border-right: 4px solid black;
}

.header-right {
    margin-left: -100px;
    background: linear-gradient(255.45deg, #7D14AF 12.67%, #00D1FF 87.81%);
    width: calc(45% + 100px);
    height: 260px;
}

.noise {
    mix-blend-mode: soft-light;
    position: absolute;
    z-index: 1;
    opacity: 0.5;
  width: 100vw;
  height: 260px;
  background: url('https://cloudflare-ipfs.com/ipfs/bafybeib7kr66dgccanis5n3q5fhmwg2ff42n2csy6peoge4buylwzkj3qa');
 }

 .header-content-left {
     position: absolute;
     z-index: 2;
     height: 260px;
 }
 .header-content-right {
    text-align: right;
     position: absolute;
     height: 260px;
     right: 0;
     z-index: 2;
 }

 .main {
     padding: 32px;
     p {
         color: #ddd;
     }
 }

 footer {
  padding-top: 2rem;
  height: 2rem;
}

footer a, span {
  color: rgba(255, 255, 255, 0.2);
}


@media only screen and (max-width: 700px) {
  .header {
    flex-direction: column;
  }
  .header-left {
    transform: skew(0);
  }
  .header-left, .header-right {
    width: 100%;
    margin-left: 0;
    border: none;
  }
  .header-content-right {
    top: 260px;
  }
  .noise {
    height: 520px;
  }
}
`;

const editProfileButton = (
  <div>
    <a className="btn btn-success" href="#/hack.near/widget/ProfileEditor">
      Edit Profile
    </a>
  </div>
);

if (!state.theme) {
  State.update({
    theme: styled.div`
    font-family: Pixter;
    background: black;
    color: white;
    ${css}
`,
  });
}
const Theme = state.theme;

return (
  <Theme>
    <div class="header">
      <div class="header-left"></div>
      <div class="header-content-left">
        <div>
          <div>
            <h1>NEAR is a bOS</h1>
            <h2>&#60;Blockchain OS&#62;</h2>
          </div>
          <div>
            <a href="https://docs.bos.gg" target="_blank">
              <h3>Read Docs -&#62;</h3>
            </a>
          </div>
        </div>
      </div>
      <div class="header-right"></div>
      <div class="header-content-right">
        <div>
          <div>
            <h1>Together</h1>
            <h2>&#60;LEARN HOW&#62;</h2>
          </div>
          <div>
            <a href="https://neardevgov.org" target="_blank">
              <h3>Join Groups -&#62;</h3>
            </a>
          </div>
        </div>
      </div>
      <div class="noise"></div>
      <div class="noise"></div>
    </div>

    <div class="main">
      <h3>bOS Profile</h3>
      <p class="gray">Connect. Collab. Coordinate.</p>
      <div>
        <Widget src="hack.near/widget/Profile" />
        <div className="m-2">{editProfileButton}</div>
      </div>
      <br />
      <div className="mt-2">
        <h3>Explore</h3>
        <div className="m-2">
          <Widget src="p516entropy.near/widget/PostsFuzzySearch" />
        </div>
        <div className="mb-2">
          <Widget
            src="mob.near/widget/People"
            props={{
              limit: 10,
              term: "bOS",
              boostedTag: "bos",
              onChange: ({ result: components, term }) => {
                console.log(components);
                State.update({ components, term });
              },
            }}
          />
        </div>
        {state.components && state.components.length > 0 && (
          <div class="apps">
            {state.components.map((component, i) => (
              <div key={i} class="widget">
                <div class="flex">
                  <a href={`#/${component.widgetSrc}`} target="_blank">
                    <div class="image-parent">
                      <Widget
                        src="mob.near/widget/WidgetImage"
                        props={{
                          accountId: component.accountId,
                          widgetName: component.widgetName,
                          alt: component.widgetName,
                          className,
                          style: {},
                          fallbackUrl:
                            "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
                        }}
                      />
                      <div class="shadow"></div>
                      <div class="eth-logo">
                        <img
                          src={
                            "https://cloudflare-ipfs.com/ipfs/bafkreibkkypb3zybzlwfotwa6tdmelalfnfucmvgzzeqwge4e75mkpq6dq"
                          }
                        />
                      </div>
                    </div>
                  </a>
                  <div class="flex-right">
                    <p>{component.widgetName}</p>
                    <p class="subtle gray">Ethereum</p>
                  </div>
                </div>
                <p>{component.description}</p>

                <a
                  href={`#/mob.near/widget/WidgetSource?src=${component.widgetSrc}`}
                  target="_blank"
                >
                  <i className="bi bi-file-earmark-code me-1"></i>Source
                </a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>

    <div class="footer">
      <div className="text-center">
        <a href="/#/thebos.near/widget/Terms">Terms of Use</a> <span>|</span>{" "}
        <a href="/#/thebos.near/widget/Privacy">Privacy Policy</a>
      </div>
    </div>
  </Theme>
);
