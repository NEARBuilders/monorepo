const { generateUID } = VM.require("flowscience.near/widget/generateUID");
const [badgeSrc, setBadgeSrc] = useState("every.near");
const [badgeId, setBadgeId] = useState("builder");
const typeData = props.typeData || {};
const type = props.type || "";
const typeSrc = props.typeSrc || "every.near";
const buildEdges = props.buildEdges;
const thingId = props.thingId;
const blockHeight = props.blockHeight || "final";
const [accountIds, setAccountIds] = useState([
  `${context.accountId || "every.near"}`,
]);
const [inputValue, setInputValue] = useState("");

if (type !== "") {
  const parts = type.split("/");
  typeSrc = parts[0];
}

State.init({
  typeData,
  config: typeData,
  typeSrc,
  selectedType: type,
  thingId: generateUID(),
});

const handleAddAccountId = () => {
  if (inputValue.trim() !== "" && !accountIds.includes(inputValue)) {
    const newAccountIds = [...accountIds, inputValue];
    setAccountIds(newAccountIds);
    onResolverChange(newAccountIds);
    setInputValue("");
  }
};

const handleRemoveAccountId = (accountId) => {
  const newAccountIds = accountIds.filter((id) => id !== accountId);
  setAccountIds(newAccountIds);
  onResolverChange(newAccountIds);
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

const handleOnChange = (value) => {
  State.update({ typeData: { ...state.typeData, ...value } });
};

useEffect(() => {
  State.update({
    config: state.typeData,
  });
}, [state.typeData]);

const [badgeName, setBadgeName] = useState("Proof of Build");
const [description, setDescription] = useState("~ good builder vibes ~");
const [imageUrl, setImageUrl] = useState("");

const badge = Social.get(`${badgeSrc}/badge/${badgeId}`, "final");

let importedTypes = [];
const availableTypes = JSON.parse(props.availableTypes) || [
  "string",
  "boolean",
  "number",
  "date",
  "time",
  "tags",
  ...importedTypes,
];

// enable multiple options for default typeSrc - every.near, hyperfiles.near, ...others?

const types = Social.get(`${state.typeSrc}/type/**`, "final");
if (types !== null) {
  availableTypes =
    Object.keys(types)?.map((it) => `${state.typeSrc}/type/${it}`) || [];
}

const Label = styled.label`
`;

const Container = styled.div`
  margin: 20px 0;
`;

const FormContainer = styled.div`
  border: 1px solid #ccc;
  padding: 23px;
  margin: 19px;
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
`;

const Input = styled.input`
  flex: 1;
  max-width: 200px;
  margin-bottom: 10px;
  height: 30px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
  height: 30px;
`;

const Text = styled.p`
  display: inline-block;
  margin-right: 10px;
`;

const BadgeImage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  width: 100%; 

    img {
      width: 4rem !important;
      height: 4rem !important;
      border-radius: 50%;
      image-rendering: pixelated;
      object-fit: cover;
    }`;

const handleBadgeIdChange = (e) => {
  setBadgeId(e.target.value.toLowerCase());
};

const handleBadgeNameChange = (e) => {
  setBadgeName(e.target.value);
};
const handleDescriptionChange = (e) => {
  setDescription(e.target.value);
};
const handleAccountIdsChange = (e) => {
  setAccountIds(e.target.value);
};
const handleImageUrlChange = (e) => {
  setImageUrl(e.target.value);
};

const handleTypeChange = (e) => {
  State.update({ selectedType: e.target.value, typeData: {} });
};

const composeData = () => {
  const data = {
    badge: {
      [badgeId]: {
        metadata: {
          name: badgeName,
          description,
          image: {
            url: imageUrl,
          },
        },
        accounts: accountsObject,
        content: {
          schema: state.selectedType,
          schemaData: state.typeData,
        },
      },
    },
  };

  const accountsObject = accountIds.reduce((acc, accountId) => {
    acc[accountId] = "";
    return acc;
  }, {});

  if (Object.keys(accountsObject).length > 0) {
    data.badge[badgeId].accounts = accountsObject;
  } else {
    delete data.badge[badgeId].accounts;
  }

  return data;
};

function TypeSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      {availableTypes.map((it) => (
        <option value={it} key={it}>
          {it}
        </option>
      ))}
    </Select>
  );
}

function MultiSelect({ value, onChange }) {
  return (
    <Select value={value} onChange={onChange}>
      <option value={false}>single</option>
      <option value={true}>multi</option>
    </Select>
  );
}

const handleResolverTypeChange = (e) => {
  setResolverType(e.target.value);
};

const handleResolverDataChange = (newData) => {
  setResolverData(newData);
};

const serializedAccountsObject = JSON.stringify(
  accountIds.reduce((acc, accountId) => {
    acc[accountId] = "";
    return acc;
  }, {}),
  null,
  2
);

const markdownText = `
\`\`\`json
{
  "badge": {
    "${badgeId}": {
      "metadata": {
        "name": "${badgeName}",
        "description": "${description}",
        "image": {
          "url": "${imageUrl}"
        }
      },
      "accounts": ${serializedAccountsObject},
      "content": {
         "schema": "${state.selectedType}",
         "schemaData": "${state.typeData}",
         }
    }
  }
}`;

return (
  <Container>
    <FormContainer>
      <Text>
        <Row>
          <h3 className="m-1">Near Social Badge Creator</h3>
          <div className="m-2">
            <Widget src="james.near/widget/BuilderHat" props={{ accountId }} />
          </div>
        </Row>
        <h5 className="m-1">
          -- inspired by <a href="https://everything.dev">everything</a>,
          <a href="https://hyperfiles.org">Hyperfiles</a>,
          <a href="https://archetype.computer">Archetype</a>, and
          <a href="https://near.social/zavodil.near/widget/social-avatar-editor">
            NS Avatars
          </a>
        </h5>
        <p className="m-1 mt-2">
          <i>
            Below, you may customize fields to build{" "}
            <a href="https://github.com/NearSocial/standards/blob/main/types/badge">
              badges
            </a>{" "}
            (attestations) of a specific
            <a href="https://everything.dev/efiz.near/widget/every.type.create">
              type
            </a>
            :{" "}
          </i>
        </p>
      </Text>
      <BadgeImage className="d-flex flex-column align-items-center justify-content-center text-center">
        <div>
          <div className="m-3 d-flex flex-row">
            <Widget
              src="james.near/widget/Badge"
              props={{ imageUrl, badge: true }}
            />
            <div className="ms-3">
              <div className="m-1">{badgeName}</div>
              <div className="small text-truncate">
                <i className="bi bi-person-badge"></i>
                badge/{badgeId}
              </div>
            </div>
          </div>
          <div className="mt-4">
            <p>
              <b>What does your badge signify?</b>
            </p>
            <p>{description}</p>
          </div>
        </div>
      </BadgeImage>
      <h4 className="m-2">
        <b>Metadata</b>
      </h4>
      <div className="m-3 mt-4">
        <h5 className="m-2">
          <b>Badge ID:</b>
        </h5>
        <div className="m-3">
          <input
            type="text"
            placeholder="badge name"
            value={badgeId}
            onChange={handleBadgeIdChange}
          />
        </div>
        <h5 className="m-2">
          <b>Badge Name:</b>
        </h5>
        <div className="m-3">
          <input
            type="text"
            placeholder="name"
            value={badgeName}
            onChange={handleBadgeNameChange}
          />
        </div>
        <h5 className="m-2">
          <b>Short Description:</b>
        </h5>
        <div className="m-3">
          <input
            placeholder="description"
            value={description}
            onChange={handleDescriptionChange}
          ></input>
        </div>
        <h5 className="m-2">
          <b>Image Link:</b>
        </h5>
        <div className="m-3">
          <input
            placeholder="url"
            value={image}
            onChange={handleImageUrlChange}
          ></input>
        </div>
      </div>
      <div className="m-4">
        <h5>
          <b>Recipients:</b>
        </h5>
        <p>Issue badges to anyone with a NEAR account.</p>
        <p>
          <i>OPTIONAL — Badges can be claimed or distributed later.</i>
        </p>

        <div className="m-2">
          <div className="d-flex flex-row mt-3">
            <div style={{ flexGrow: 1, marginRight: "8px" }}>
              <input
                type="text"
                style={{ width: "100%" }}
                value={inputValue}
                onChange={handleInputChange}
                placeholder="example.near"
              />
            </div>
            <button className="btn btn-dark" onClick={handleAddAccountId}>
              Add
            </button>
          </div>
          <br />
          {accountIds.map((accountId) => (
            <>
              <div
                className="d-flex flex-row justify-content-between"
                key={accountId}
              >
                <Widget
                  src="james.near/widget/profile.inline"
                  props={{ accountId }}
                />
                <div className="ml-auto">
                  <button
                    className="btn btn-light"
                    onClick={() => handleRemoveAccountId(accountId)}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <br />
            </>
          ))}
        </div>
      </div>
      <div>
        <FormContainer>
          <h4 className="m-2">
            <b>Badge Data</b>
          </h4>
          <Label>Import Types:</Label>
          <Row>
            <Input
              type="text"
              value={state.newTypeSrc}
              onChange={(e) => State.update({ newTypeSrc: e.target.value })}
              placeholder={"accountId e.g. every.near"}
            />
            <Button onClick={() => State.update({ typeSrc: state.newTypeSrc })}>
              apply
            </Button>
            <Label>Schema</Label>
            <Select value={state.selectedType} onChange={handleTypeChange}>
              <option value="">Select a schema</option>
              {availableTypes?.map((it) => (
                <option value={it} key={it}>
                  {it}
                </option>
              ))}
            </Select>
          </Row>
          <Widget
            src="efiz.near/widget/create"
            props={{
              item: {
                type: state.selectedType,
                value: state.typeData,
              },
              onChange: handleOnChange,
            }}
          />
          <Row>
            <Label>
              <b>UID:</b> {state.thingId}
            </Label>
          </Row>
        </FormContainer>
      </div>
      <div></div>
      <div className="m-3">
        <h4 className="m-2">Data Structure</h4>
        <p className="m-2">
          This badge would be saved under your account like this...
        </p>
      </div>
      <div className="m-3">
        <Markdown
          text={markdownText}
          syntaxHighlighterProps={{
            wrapLines: true,
            lineProps,
            showLineNumbers: true,
            lineNumberStyle: { display: !props.showLineNumber && "none" },
          }}
        />
      </div>
      <div className="m-3">
        <CommitButton style={{ width: "100%" }} force data={composeData()}>
          Save
        </CommitButton>
      </div>
    </FormContainer>
  </Container>
);
