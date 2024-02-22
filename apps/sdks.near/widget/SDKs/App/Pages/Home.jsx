const PACKAGE_ICON = "https://ipfs.near.social/ipfs/bafkreihkhr5ow2iws3b7j3fdizbmndfzeqa3eptwqcnll2s6i5nrxfpfjm";

const WIDGET_OWNER = "sdks.near";

const libraries = VM.require(`${WIDGET_OWNER}/widget/Manifest`)["libs"] || [];

State.init({
  searchTerm: "",
  libraries: [],
});

if (libraries && state.libraries.length == 0 && !state.searchTerm) {
  State.update({
    libraries: Object.keys(libraries),
  });
}

const Box = styled.div`
    z-index:0;
    position:relative;
    width:100%;
    background-color:#fff;
`;

const Shape = styled.div`
    @keyframes colorize {
        50% {
            transform: translateX(15%);
        }
        100% {
            filter: blur(60px) hue-rotate(180deg);transform: translateX(-15%);
        }
    }

    position:absolute;
    z-index:-1;
    opacity:.6;
    top:20px;
    left:0;
    right:0;
    margin:auto;
    width:400px;
    height:400px;
    transform:rotate(30deg);
    filter:blur(200px);
    animation-name:colorize;
    animation-duration:15s;
    animation-iteration-count:infinite;
    animation-fill-mode:both;
    animation-direction: alternate;
`;

const Content = styled.div`
    z-index:2;
    max-width:1080px;
    margin:0 auto;
`;

const Header = styled.div`
    z-index:4;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px;

    ul {
        display:flex;
        flex-grow:1;
        padding:0;
        margin:0;
        list-style:none;
        align-items:center;
        justify-content:center;

        li {
            :not(:last-of-type) {
                margin-right:40px;
            }
        }
    }
`;

const Jumbotron = styled.div`
    width:100%;
    text-align:center;
    z-index:999999;
    margin-top:50px;

    * {
        z-index:999999;
    }

    p {
        font-size:3rem;
        font-weight:bold;
        text-align:center;
        margin:0;

        + p {
            font-size:1.5rem;
            font-weight:normal;
            margin: .5rem 0 1.3rem;
        }
    }

    .actions {
        display:flex;

        .secondary {
            margin-right:20px;
        }

        .btn-outline-primary {
            padding: 0 2rem;
            margin-top:1rem;
            border:0;
        }
    }

`;

const Search = styled.input`
    border:0;
    width:100%;
    max-width:500px;
    padding:10px 20px;
    border-radius:5px;
    margin-top:15px;
    border:3px solid rgba(0,0,0,.05);
    background-color:#fafafa;
    font-size:1.3rem;
    font-weight:bold;
    outline-style:none;

    ::placeholder {
        font-size:1.3rem;
        font-weight:bold;
        color:rgba(0,0,0,.1);
    }
`;

const Libraries = styled.div`
    display:flex;
    flex-wrap:wrap;
    z-index:999999;
    justify-content:space-between;
    max-width:750px;
    margin:40px auto 100px;
    padding:0 20px;
`;

const Library = styled.div`
    width:350px;
    border-radius:15px;
    background-color:#f2f2f2;
    border:3px solid rgba(0,0,0,.05);
    margin-bottom:20px;
    padding:15px;
    text-align:left;
    align-self:flex-start;

    h2 {
        font-weight:bold;
        font-size:1.2rem;
        padding:0;
        margin:0;
    }

    ul {
        padding: 0;
        margin:0;
        list-style:none;

        li {
            padding-top:20px;
            font-size:.8rem;
            
            :not(:last-of-type) {
                border-bottom:1px solid rgba(0,0,0,.05);
                padding-bottom:20px;
            }
        }
    }
`;

const QuickStart = styled.div`
    width:100%;
    height:80px;
    border-radius:10px;
    background-color:#1E1E1E;
    margin-top:15px;
    color:#fff;
    padding:10px;
    font-size:.7rem;

    border-left:13px solid rgba(0,0,0,.6);

    .type {
        color:#5396CD;
    }

    .variable {
        color:#C3C4C4;
    }

    .function {
        color:#477CA8;
    }

    .class {
        color:#349A8B;
    }

    .brackets {
        color:#caab07;
    }

    .string {
        color:#C28972;
    }
`;

const getLibraryDependenciesString = (library) => {
  const dependencies = libraries[library];

  if (Array.isArray(dependencies)) {
    return dependencies
      .map((dependency) => dependency.split(".").pop())
      .join(", ");
  }

  if (typeof dependencies == "string") {
    return dependencies.split(".").pop();
  }

  if (typeof dependencies == "object") {
    let content = Object.keys(dependencies)
      .map((module) =>
        dependencies[module]
          .map((dependency) => dependency.split(".").pop())
          .join(", ")
      )
      .join(", ");
    return content.length >= 30 ? content.substring(0, 30) + "..." : content;
  }
};

const getLibraryDependencies = (library) => {
  const dependencies = libraries[library];

  if (Array.isArray(dependencies)) {
    return dependencies.map((dependency) => dependency.split(".").pop());
  }

  if (typeof dependencies == "string") {
    return [dependencies.split(".").pop()];
  }

  if (typeof dependencies == "object") {
    return Object.keys(dependencies)
      .map((module) =>
        `${module.toUpperCase()}: ` + dependencies[module]
          .map((dependency) => dependency.split(".").pop()).join(', ')
      );
  }
};

let views = {
  home: (
    <>
      <Box>
        <Shape
          style={{
            left: "-20%",
            backgroundColor: "#B3E0F9",
          }}
        />
        <Shape
          style={{
            right: "-20%",
            transform: "rotate(50deg)",
            backgroundColor: "#B9CCF8",
          }}
        />
        <Content>
          <Jumbotron>
            <p>Explore BOS Libraries.</p>
            <Search
              type="text"
              placeholder="Lens Protocol, Ethereum, NEAR..."
              onKeyUp={(e) => {
                const searchTerm = e.target.value;

                if (!searchTerm) {
                  State.update({
                    libraries: Object.keys(libraries),
                    searchTerm,
                  });
                  return;
                }

                State.update({
                  libraries: Object.keys(libraries).filter((library) =>
                    library.includes(searchTerm)
                  ),
                  searchTerm,
                });
              }}
            />
            <Libraries>
              {state.libraries.map((library) => (
                <Library>
                  <h2>{library}</h2>
                  <QuickStart>
                    <span class="type">const</span>{" "}
                    <span class="variable">$</span> ={" "}
                    <span class="class">VM</span>{""}<span class="variable">.</span><span class="function">require</span><span class="brackets">(</span>
                    <span class="string">"sdks.near/widget/Loader"</span><span class="brackets">)</span>;
                    <br />
                    <span class="type">const</span> <span class="brackets">{"{"}</span>{" "}
                    <span class="class">
                      {getLibraryDependenciesString(library)}
                    </span>{" "}
                    <span class="brackets">{"}"}</span> = <span class="variable">$</span><span class="brackets">(</span><span class="string">"@sdks/{library}"</span><span class="brackets">)</span>;
                    <br />
                  </QuickStart>
                  <ul>
                      {getLibraryDependencies(library).map((dependency) => <li>
                          <span><img src={PACKAGE_ICON} style={{maxWidth: "25px", marginRight: "10px"}} /></span>{dependency}
                      </li>)}
                  </ul>
                </Library>
              ))}
            </Libraries>
          </Jumbotron>
        </Content>
      </Box>
    </>
  ),
};

return <>{state.init ? views["app"] : views["home"]}</>;
