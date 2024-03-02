const typeWhitelist = JSON.parse(props.typeWhitelist || "null") || [
  "md",
  "social",
  "every.near/type/image",
];

State.init({
  index: [],
  domainFilter: "",
  keyFilter: "",
  accountFilter: "",
  hashtagFilter: "",
  showModal: false,
  modalData: {},
  selectedKeys: {},
});

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ccc;
  table-layout: fixed;
`;

const TableHeader = styled.th`
  padding: 8px;
  background-color: #f2f2f2;
  text-align: left;
  text-overflow: ellipsis;
  width: auto;
  flex-shrink: 0; /* Added CSS rule to prevent growth */
`;

const TableCell = styled.td`
  padding: 8px;
  border: 1px solid #ccc;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 220px;
`;

const Select = styled.select`
  height: 30px;
`;

const Button = styled.button`
`;

const Input = styled.input`
`;

const availableTypes = JSON.parse(props.availableTypes) || [
  "efiz.near/type/paragraph",
  "efiz.near/type/Image",
  "efiz.near/type/document",
  "efiz.near/type/feed",
  "efiz.near/type/idea",
  "efiz.near/type/markdown",
  "efiz.near/type/topic",
];

function handleTypeChange(e) {
  State.update({ selectedType: e.target.value });
}

function executeQuery() {
  let index = [];
  const domainFilter = ["post"];
  if (state.domainFilter.trim() !== "") {
    domainFilter = state.domainFilter?.split(",")?.map((item) => item.trim());
  }

  const key = "main";

  const hashtagFilter = [];
  if (state.hashtagFilter.trim() !== "") {
    state.hashtagFilter?.split(",").map((item) => item.trim());
  }

  const accountFilter = undefined;
  if (state.hashtagFilter.trim() !== "") {
    state?.accountFilter?.split(",")?.map((item) => item.trim()) || undefined;
  }

  if (hashtagFilter.length) {
    index = hashtagFilter.map((it) => ({
      action: "hashtag",
      key: it.toLowerCase(),
      options: {
        limit: 10,
        order: "desc",
        accountId: accountFilter,
      },
    }));
  } else {
    index = domainFilter.map((it) => ({
      action: it,
      key,
      options: {
        limit: 10,
        order: "desc",
        accountId: accountFilter,
      },
    }));
  }

  State.update({
    index,
  });
}

// const type
const things = JSON.parse(Social.get("efiz.near/thing/**") || null);
const type = JSON.parse(Social.get(state.selectedType) || null);

const handleView = (key, data) => {
  State.update({ showModal: true, modalData: { key, data } });
};

const handleDelete = (key) => {
  // Need a delete cascade
  Social.set({ thing: { [key]: null } });
};

function Headers() {
  return (
    <tr>
      <TableHeader>key</TableHeader>
      <TableHeader>blockHeight</TableHeader>
      {type &&
        type?.properties?.map((property) => (
          <TableHeader key={property.name}>{property.name}</TableHeader>
        ))}
      <TableHeader>actions</TableHeader>
    </tr>
  );
}

function Row({ key, data }) {
  const thing = JSON.parse(data);
  const properties = thing.data;
  if (typeof properties === "object") {
    return (
      <>
        <TableCell>{key}</TableCell>
        <TableCell>{JSON.stringify(properties)}</TableCell>
        <TableCell>
          <Button onClick={() => handleView(key, data)}>view</Button>
          <Button onClick={() => handleDelete(key)}>delete</Button>
        </TableCell>
      </>
    );
  } else {
  }
}

function Rows() {
  const things = Social.get("efiz.near/thing/**");
  if (things) {
    const keys = Object.keys(things);
    return keys.map((t) => (
      <tr key={t}>
        <Row key={t} data={things[t]} />
      </tr>
    ));
  } else {
    return <p>Nothing found</p>;
  }
}

return (
  <>
    {state.showModal ? (
      <>
        <Button
          onClick={() => State.update({ showModal: false, modalData: {} })}
        >
          close
        </Button>
        <Widget
          src="efiz.near/widget/Every.Raw.Edit"
          props={{ value: JSON.parse(state.modalData.data) }}
        />
      </>
    ) : (
      <>
        <Input
          value={state.domainFilter}
          onChange={(e) => State.update({ domainFilter: e.target.value })}
          placeholder={"action/domains"}
        />
        <Input
          value={state.keyFilter}
          onChange={(e) => State.update({ keyFilter: e.target.value })}
          placeholder={"keys"}
        />
        <Input
          value={state.accountFilter}
          onChange={(e) => State.update({ accountFilter: e.target.value })}
          placeholder={"accounts"}
        />
        <Input
          value={state.hashtagFilter}
          onChange={(e) => State.update({ hashtagFilter: e.target.value })}
          placeholder={"hashtags"}
        />
        <Select value={state.selectedType} onChange={handleTypeChange}>
          <option value="">Select a type</option>
          {availableTypes.map((it) => (
            <option value={it} key={it}>
              {it}
            </option>
          ))}
        </Select>
        <Button onClick={executeQuery}>query</Button>
        <Table>
          <thead>
            <Headers />
          </thead>
          <tbody>
            <Rows />
          </tbody>
        </Table>
      </>
    )}
  </>
);
