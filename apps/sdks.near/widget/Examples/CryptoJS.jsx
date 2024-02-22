const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependency, CryptoJS } = $("@sdks/crypto-js");

let crypto = CryptoJS(State, state);

const [text, setText] = useState("");
const [hashedText, setHashedText] = useState("");

const Wrapper = styled.div`
    width:100%;
    height:100vh;
    background-color:rgba(0,0,0,.02);
    display:flex;
    align-items:center;
    justify-content:center;
`;

const Box = styled.div`
    width:100%;
    max-width:400px;
    background-color:rgba(255,255,255,.7);
    border-radius:20px;
    border: 3px solid rgba(0,0,0,.2);
    padding:15px;
`;

const Input = styled.input`
    width:100%;
    height:50px;
    border: 2px solid rgba(0,0,0,.1);
    border-radius:10px;
    color:#000;
    padding:10px;
    font-size:.8rem;
    outline-style:none;

    ::placeholder {
        color:#000;
        font-size:.8rem;
    }
`;

const Result = styled.div`
    width:100%;
    height:100px;
    border-radius:10px;
    background-color:rgba(0,0,0,.03);
    margin-top:15px;
    border: 1px solid rgba(0,0,0,.05);
    padding: 10px;
    font-size:.8rem;
    font-weight:bold;
    color:rgba(0,0,0,.3);
`;

const Title = styled.h1`
    font-weight:bold;
    font-size:1.2rem;
    margin-bottom:20px;
`;

const Button = styled.button`
    width:100%;
    height: 60px;
    border-radius:10px;
    margin-top:15px;
    border:0;
    border:1px solid rgba(0,0,0,.05);
    background-color:#0E6EFD;
    color:#fff;
    font-weight:bold;
`;

return (
  <>
    <ExternalDependency adapter={crypto} />
    <Wrapper>
      <Box>
        <Title>CryptoJS - MD5</Title>
        <Input
          type="text"
          placeholder="Enter here the text to hash"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <Button
          onClick={() =>
            crypto.md5(text).then((result) => setHashedText(result))
          }
        >
          Hash it!
        </Button>
        <Result>{hashedText || "The hashed text will appear here"}</Result>
      </Box>
    </Wrapper>
  </>
);
