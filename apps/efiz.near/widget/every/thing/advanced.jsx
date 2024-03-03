const typeName = props.typeName || "thing";
const metadataTemplate = props.metadataTemplate || "efiz.near/widget/docs.card";

State.init({
  accountId: props.accountId || null,
  tag: props.tag || null,
  selectedElements: [],
  isExpanded: false,
  selectedOption: "all",
});

const ArrowIcon = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 6px solid ${(props) => (props.isExpanded ? "#fff" : "#000")};
  margin-right: 5px;
  transition: transform 0.3s;
  transform: rotate(${(props) => (props.isExpanded ? "180deg" : "0")});
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${(props) => (props.isExpanded ? "#fff" : "#000")};
  margin-top: 10px;
  transition: background-color 0.3s;
`;

const AdvancedContainer = styled.div`
  margin: 20px 0;
`;

const AdvancedButton = styled.button`
  width: 100%;
  padding: 10px;
  border: none;
  background-color: ${(props) => (props.isExpanded ? "#007bff" : "#28a745")};
  color: #fff;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
`;

const FiltersContainer = styled.div`
  margin-top: 10px;
  display: ${(props) => (props.isExpanded ? "block" : "none")};
`;

const RadioButton = styled.div`
  margin-top: 10px;
`;

const handleToggle = () => {
  State.update({ isExpanded: !state.isExpanded });
};

const handleRadioChange = (event) => {
  State.update({ selectedOption: event.target.value });
};

function handleFilter({ accountId, tag }) {
  if (accountId) {
    State.update({ accountId });
  }
  if (tag) {
    State.update({ tag });
  }
}

function Advanced() {
  return (
    <AdvancedContainer>
      <AdvancedButton onClick={handleToggle} isExpanded={state.isExpanded}>
        <ArrowIcon onClick={handleToggle} isExpanded={state.isExpanded} />
        {isExpanded ? "Hide Advanced" : "Show Advanced"}
      </AdvancedButton>
      <FiltersContainer isExpanded={state.isExpanded}>
        <Widget
          src="efiz.near/widget/every.thing.filters"
          props={{ handleFilter }}
        />
        <RadioButton>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="filterOption"
              id="allOption"
              value="all"
              checked={state.selectedOption === "all"}
              onChange={handleRadioChange}
            />

            <label htmlFor="allOption">All</label>
          </div>
        </RadioButton>
        <RadioButton>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="filterOption"
              id="taggedByCreatorOption"
              value="taggedByCreator"
              checked={state.selectedOption === "taggedByCreator"}
              onChange={handleRadioChange}
            />

            <label htmlFor="taggedByCreatorOption">Tagged by Creator</label>
          </div>
        </RadioButton>
        <RadioButton>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="filterOption"
              id="taggedByCommunityOption"
              value="taggedByCommunity"
              checked={state.selectedOption === "taggedByCommunity"}
              onChange={handleRadioChange}
            />

            <label htmlFor="taggedByCommunityOption">Tagged by Community</label>
          </div>
        </RadioButton>
        <RadioButton>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="filterOption"
              id="curatedByCategoryOption"
              value="curatedByCategory"
              checked={state.selectedOption === "curatedByCategory"}
              onChange={handleRadioChange}
            />

            <label htmlFor="curatedByCategoryOption">Curated by Category</label>
          </div>
        </RadioButton>
      </FiltersContainer>
    </AdvancedContainer>
  );
}

const data = {};

switch (state.selectedOption) {
  case "all": {
    const pattern = `${state.accountId ?? "*"}/${typeName}/*`;
    data = Social.keys(pattern, "final", {
      return_type: "BlockHeight",
      limit: 1,
    });
    break;
  }
  case "taggedByCreator": {
    const pattern = `${state.accountId ?? "*"}/${typeName}/*/metadata/tags/${
      state.tag ?? "*"
    }`;
    const keys = Social.keys(pattern, "final");

    if (keys) {
      keys = Object.entries(keys).flatMap(([key, value]) =>
        Object.keys(value[typeName]).map((w) => `${key}/${typeName}/${w}`)
      );
      data = Social.keys(keys, "final", {
        return_type: "BlockHeight",
        limit: 1,
      });
    }
    break;
  }
  case "taggedByCommunity": {
    const pattern = `*/every/${typeName}/${state.accountId ?? "*"}/*/tags/${
      state.tag ?? "*"
    }`;
    const keys = Social.keys(pattern, "final");

    if (keys) {
      keys = Object.entries(keys).flatMap(([key, value]) =>
        Object.entries(value.every[typeName]).flatMap(([w, it]) =>
          Object.keys(it).map((itKey) => `${w}/${typeName}/${itKey}`)
        )
      );
      data = Social.keys(keys, "final", {
        return_type: "BlockHeight",
        limit: 1,
      });
    }
    break;
  }
  case "curatedByCategory": {
    const category = "test";
    const pattern = `*/test/thing/*/categories/${category}`;
    const keys = Social.get(pattern, "final");
    if (keys) {
      keys = Object.entries(keys).flatMap(([k, v]) => {
        return Object.entries(v.test[typeName]).flatMap(([ka, kn]) =>
          Object.entries(kn.categories).flatMap(([key, value]) => value)
        );
      });
      data = Social.keys(keys, "final", {
        return_type: "BlockHeight",
        limit: 1,
      });
    }
    break;
  }
}

const processData = (data) => {
  const accounts = Object.entries(data);

  const allItems = accounts
    .map((account) => {
      const accountId = account[0];
      return Object.entries(account[1][typeName]).map((kv) => ({
        accountId,
        typeName: kv[0],
        blockHeight: kv[1],
      }));
    })
    .flat();

  allItems.sort((a, b) => b.blockHeight - a.blockHeight);
  return allItems;
};

const handleSelect = (id) => {
  if (state.selectedElements.includes(id)) {
    State.update({
      selectedElements: state.selectedElements.filter(
        (elementId) => elementId !== id
      ),
    });
  } else {
    State.update({
      selectedElements: [...state.selectedElements, id],
    });
  }
};

const renderItem = (a) => {
  const path = `${a.accountId}/${typeName}/${a.typeName}`;
  return (
    <div className="m-1" key={JSON.stringify(a)} style={{ minHeight: "10em" }}>
      <div className="form-check">
        <input
          type="checkbox"
          checked={state.selectedElements.includes(path)}
          onChange={() => handleSelect(path)}
          className="form-check-input"
        />
      </div>
      <Widget
        src={metadataTemplate}
        props={{
          path,
        }}
      />
    </div>
  );
};

if (data && JSON.stringify(data) !== JSON.stringify(state.data || {})) {
  State.update({
    data,
    allItems: processData(data),
  });
}

return (
  <div>
    <Advanced />
    <div className="px-2 mx-auto">
      <button onClick={() => Social.set(state.selectedElements)}>save</button>
      <Widget
        src="efiz.near/widget/ItemFeed"
        props={{ items: state.allItems || [], renderItem }}
      />
    </div>
  </div>
);
