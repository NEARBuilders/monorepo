const $ = VM.require("sdks.near/widget/Loader");
const { ExternalDependency, Blockies } = $("@sdks/blockies");

Blockies = new Blockies(State, state);

const [blockie, setBlockie] = useState("");
const [onlyOnce, setOnlyOnce] = useState(true);

if (Blockies.isReady() && onlyOnce) {
  Blockies.create(context.accountId).then((blockie) => {
    setBlockie(blockie);
  });
  setOnlyOnce(false);
}

const Image = styled.img`
    width:24px;
    height:24px;
    border-radius:100%;
`;

const Profile = styled.div`
    display:inline-flex;
    align-items:center;
    max-width:150px;
    background-color:rgba(0,0,0,.8);
    padding:5px;
    border-radius:30px;
    box-shadow: 0 0 0 2px #7F7F7F;

    p {
        padding:0;
        margin:0;
        font-size:.8rem;
        color:rgba(255,255,255,.7);
        margin-left:10px;
    }
`;

return (
  <>
    <ExternalDependency adapter={Blockies} />
    <Profile>
      {blockie && <Image src={blockie} />}
      <p>{context.accountId}</p>
    </Profile>
  </>
);
