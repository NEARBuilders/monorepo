const LOGO =
  "https://ipfs.near.social/ipfs/bafkreigaraxq3prb5zalgrevdyojdsrqjqkmz4h6pudozsjmkym2lqoqsy";
const EMPTY_INBOX_URL =
  "https://ipfs.near.social/ipfs/bafkreibykf2ka2ww6bmu2fsh6xvx5yp7pkc4irg4jkejaggcl6bhpoht4q";
const WRITE_MESSAGE_URL =
  "https://ipfs.near.social/ipfs/bafkreigg36nl7b6nvmi43qjtka5by3bbrb4sdr7xnsl2qfm43fp67lbf6a";
const MORE_OPTIONS_URL =
  "https://ipfs.near.social/ipfs/bafkreig5brkbcdikyecfx22daixoo5osrtjqmjjimgupdjgt4ecdvsubaq";

const Messenger = styled.div`
    width:100%;
    height:100vh;
    background-color:#fff;
`;

const App = styled.div`
    display:flex;
    width:100%;
    height:100vh;
    background-color:#fafafa;
`;

const Chats = styled.div`
    display:flex;
    flex-direction:column;
    flex-grow:0;
    min-width:300px;
    border-right:1px solid #E5E5E5;
    padding:10px;
    background-color:#fff;
`;

const Wrapper = styled.div`
    width:100%;
    flex-grow:1;
    display:flex;
    align-items:center;
    justify-content:center;
    flex-direction:column;

    h1 {
        font-size:1rem;
        font-weight:bold;
        margin-top:10px;
    }

    p {
       max-width:200px;
       font-size:.7rem;
       text-align:center;
    }

    img {
        max-width:120px;
    } 
`;

const Body = styled.div`
    display:flex;
    overflow:hidden;
    border-radius:10px;
`;

const Sidebar = styled.div`
    width:50px;
    height:100vh;
    background-color:rgba(0,0,0,.85);
`;

const Header = styled.div`
    display:flex;
    align-items:center;
`;

const Search = styled.input`
    border:0;
    width:100%;
    background-color:#F0F2F5;
    border-radius:30px;
    margin-left:10px;
    padding:6px 15px;
    font-size:.8rem;
    color:#050505;
    outline-style:none;
    transition:all .2s;
    box-shadow:0 0 0 0px rgba(0,0,0,.02);

    :hover {
        transition:all .2s;
        box-shadow:0 0 0 3px rgba(0,0,0,.02);
    }

    :focus {
        transition:all .2s;
        box-shadow:0 0 0 3px rgba(0,0,0,.1);
    }

    ::placeholder {
        font-size:.8rem;
        color:#65676B;
    }
`;

const Button = styled.button`
    border:0;
    padding:5px 15px;
    border-radius:30px;
    font-size:.8rem;
    color:#fff;
    background-color:#2d5eb3;

    transition:all .2s;
    box-shadow:0 0 0 0px rgba(0,0,0,.02);

    :hover {
        transition:all .2s;
        box-shadow:0 0 0 3px rgba(0,0,0,.1);
    }
`;

const Toolbar = styled.div`
    display:flex;
    justify-content:flex-end;
    padding:7px 0;

    button {
        :not(:last-of-type) {
            margin-right:8px;
        }
    }
    
`;

const PrimaryActionButton = styled.button`
    display:flex;
    align-items:center;
    justify-content:center;
    border:0;
    width:35px;
    height:35px;
    border-radius:100%;
    background-color:#E4E6EB;
    padding:5px;

    transition:all .2s;
    box-shadow:0 0 0 0px rgba(0,0,0,.02);

    :hover {
        transition:all .2s;
        box-shadow:0 0 0 3px rgba(0,0,0,.05);
    }

    img {
        max-width:15px;
    }
`;

const SecondaryActionButton = styled.button`
    position:relative;
    margin:0 auto;
    border:0;
    padding:5px 15px;
    border-radius:30px;
    background-color:#E4E6EB;
    transition:all .2s;
    box-shadow:0 0 0 0px rgba(0,0,0,.02);
    font-size:.7rem;
    font-weight:bold;
    color:rgba(0,0,0,.3);

    :hover {
        transition:all .2s;
        box-shadow:0 0 0 3px rgba(0,0,0,.05);
        color:rgba(0,0,0,.5);
    }
`;

const Explore = styled.div`
    display:flex;
    flex-grow:1;
    align-items:center;
    justify-content:center;
    padding:20px;
`;

const Details = styled.div`
    width:100%;
    max-width:450px;

    > button {
        display:block;
        margin:30px auto 0;
    }
    
    h1 {
        font-weight:bold;
        font-size:1.7rem;
        text-align:center;
        margin-bottom:40px;
    }

    p {
        font-weight:bold;
        margin:0;
        margin-bottom:10px;
    }

    ul {
      padding:0;
      margin:0;
      list-style:none;

      li {
          border-top:1px solid rgba(0,0,0,.1);

          :last-of-type {
            border-bottom:1px solid rgba(0,0,0,.1);
          }
          
          padding:20px 0;
      }
    }
`;

const IconSection = styled.div`
    display:flex;
    align-items:center;
    button {
        margin-right:10px;
    }
`;

const Description = styled.div`
    h2 {
      font-size:1.1rem;
      font-weight:bold;
      margin:0;
    }
        
    p {
      padding:0;
      margin:0;
      font-weight:normal;
      font-size:.8rem;
      margin-left:45px;
    }
`;

return (
  <>
    <Body>
      <Sidebar></Sidebar>
      <Messenger>
        <App>
          <Chats>
            <Header>
              <img src={LOGO} style={{ width: "35px" }} />
              <Search type="text" placeholder={"Search a user"} />
            </Header>
            <Toolbar>
              <PrimaryActionButton>
                <img src={WRITE_MESSAGE_URL} />
              </PrimaryActionButton>
              <PrimaryActionButton>
                <img src={MORE_OPTIONS_URL} />
              </PrimaryActionButton>
            </Toolbar>
            <Wrapper>
              <img src={EMPTY_INBOX_URL} />
              <h1>Your inbox is empty</h1>
              <p>But don't worry, you can solve it by writing a message.</p>
              <Button>Start a conversation</Button>
            </Wrapper>
          </Chats>
          <Explore>
            <Details>
              <h1>Explore a new experience</h1>
              <p>Get started</p>
              <ul>
                <li>
                  <Description>
                    <IconSection>
                      <PrimaryActionButton>🤔</PrimaryActionButton>
                      <h2>How does it work?</h2>
                    </IconSection>
                    <p style={{ display: "none" }}>...</p>
                  </Description>
                </li>
                <li>
                  <Description>
                    <IconSection>
                      <PrimaryActionButton>🪄</PrimaryActionButton>
                      <h2>Why an Ethereum address is needed?</h2>
                    </IconSection>
                    <p style={{ display: "none" }}>...</p>
                  </Description>
                </li>
                <li>
                  <Description>
                    <IconSection>
                      <PrimaryActionButton>✉️</PrimaryActionButton>
                      <h2>How do I send a message?</h2>
                    </IconSection>
                    <p style={{ display: "none" }}>...</p>
                  </Description>
                </li>
              </ul>
              <SecondaryActionButton>See more</SecondaryActionButton>
            </Details>
          </Explore>
        </App>
      </Messenger>
    </Body>
  </>
);
