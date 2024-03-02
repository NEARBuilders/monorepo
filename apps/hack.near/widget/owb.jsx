const [path, setPath] = useState("");
const isValid = path.trim() !== "";

const BrowserUI = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  align-items: center;
  padding: 8px;
  justify-content: space-between;
  background-color: #fff;
`;

const ActionButton = styled.button`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  margin-right: 8px;
  border: none;
  background-color: transparent;
  cursor: pointer;

  .bi-gear {
    display: block;
  }

  .bi-gear-fill {
    display: none; // Hide filled icon by default
  }

  &:hover {
    .bi-gear {
      display: none; // Hide the outlined icon on hover
    }

    .bi-gear-fill {
      display: block; // Show filled icon on hover
    }
  }
`;

const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  position: relative;
  flex-grow: 1;
  margin-right: 8px;
`;

const SearchBar = styled.input`
  flex-grow: 1;
  padding: 3px;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 12px;
  padding-left: 30px;
`;

const ActionIcons = styled.div`
  display: flex;
  align-items: center;
  gap: 3px;
`;

const IconContainer = styled.div`
  position: absolute;
    margin-left: 10px;

  margin-right: 10px;
  top: 50%;
  transform: translateY(-50%);
  color: ${(props) => (props.isValid ? "#198754" : "#6c757d")};
  display: flex;
  align-items: center;
`;

const Logo = styled.div`
  margin: 8px;
  margin-right: 15px;

  img {
    height: 23px;
    width: auto;
  }
`;

const valid = Social.get(path) !== undefined;

return (
  <BrowserUI>
    <Toolbar>
      <Logo>
        <img src="https://builders.mypinata.cloud/ipfs/QmYfcQG2phnosfTa4WT7BP2Dc6dd9ZumatiGnEwfX7rWzf" />
      </Logo>
      <SearchContainer>
        <IconContainer>
          {exists ? (
            <i className="bi bi-check-lg"></i>
          ) : (
            <i className="bi bi-search"></i>
          )}
        </IconContainer>
        <SearchBar
          type="text"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              setPath(e.target.value);
            }
          }}
        />
      </SearchContainer>
      <ActionIcons>
        <ActionButton
          onMouseEnter={() => setHoverSettings(true)}
          onMouseLeave={() => setHoverSettings(false)}
        >
          <i className="bi bi-gear"></i>
          <i className="bi bi-gear-fill"></i>
        </ActionButton>
      </ActionIcons>
    </Toolbar>
    <Widget src={path || "hack.near/widget/thing"} />
  </BrowserUI>
);
