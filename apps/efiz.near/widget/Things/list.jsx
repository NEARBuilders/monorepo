const currentPage = (props.page && parseInt(props.page)) || 1;
const resPerPage = props.resPerPage ?? 16;
const typeName = props.typeName || "widget";
const metadataTemplate = props.metadataTemplate || "efiz.near/widget/docs.card";

State.init({
  currentPage: currentPage,
  search: null,
  selectedOption: "all",
  accountId: props.accountId || null,
  tag: props.tag || null,
});

function handleFilter({ accountId, tag }) {
  if (tag && state.selectedOption === "all") {
    // this is a hack for now
    State.update({
      accountId,
      tag,
      selectedOption: "taggedByCreator",
      filtersOpen: false,
      currentPage: 1,
    });
  } else {
    State.update({ accountId, tag, filtersOpen: false, currentPage: 1 });
  }
}

const handleRadioChange = (event) => {
  State.update({ selectedOption: event.target.value, filtersOpen: false });
};

const renderSubheader = () => (
  <div className="d-flex align-items-center gap-2 mt-4">
    <Widget
      key="search"
      src="nui.sking.near/widget/Input.Text"
      props={{
        placeholder: "Search by name",
        type: "search",
        size: "md",
        icon: (
          <i
            className="bi bi-search"
            style={{
              color: "#4498E0",
            }}
          />
        ),
        onChange: (v) => {
          State.update({
            search: v,
            currentPage: 1,
          });
        },
        value: state.search,
        inputProps: {
          autoFocus: true,
        },
      }}
    />
    <Widget
      src="nui.sking.near/widget/Layout.Modal"
      props={{
        open: state.filtersOpen,
        onOpenChange: (open) => {
          State.update({
            ...state,
            filtersOpen: open,
          });
        },
        toggle: (
          <Widget
            src="nui.sking.near/widget/Input.Button"
            props={{
              children: (
                <>
                  Filter
                  <i className="bi bi-funnel"></i>
                </>
              ),
              variant: "info outline",
              size: "md",
            }}
          />
        ),
        content: (
          <div className="ndc-card p-4 bg-white rounded">
            <Widget
              src="efiz.near/widget/every.thing.filters"
              props={{
                handleFilter,
                accountId: state.accountId,
                tag: state.tag,
              }}
            />
            <div className="form-check mt-2">
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
            <div className="form-check mt-2">
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
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="filterOption"
                id="taggedByCommunityOption"
                value="taggedByCommunity"
                checked={state.selectedOption === "taggedByCommunity"}
                onChange={handleRadioChange}
              />

              <label htmlFor="taggedByCommunityOption">
                Tagged by Community
              </label>
            </div>
            <div className="form-check mt-2">
              <input
                className="form-check-input"
                type="radio"
                name="filterOption"
                id="curatedByCategoryOption"
                value="curatedByCategory"
                checked={state.selectedOption === "curatedByCategory"}
                onChange={handleRadioChange}
              />

              <label htmlFor="curatedByCategoryOption">
                Curated by Category
              </label>
            </div>
          </div>
        ),
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Button"
      props={{
        children: (
          <>
            Share
            <i className="bi bi-share"></i>
          </>
        ),
        onClick: () => {
          clipboard.writeText(constructURL());
        },
        variant: "info outline",
        size: "md",
      }}
    />
  </div>
);

function constructURL() {
  const gateway = "https://near.social/";
  const widget = "efiz.near/widget/Things.index";
  const standardParams = `?defaultType=${typeName}&page=${state.currentPage}`;
  let url = `${gateway}${widget}${standardParams}`;
  if (state.tag !== null) {
    url += `&tag=${state.tag}`;
  }
  if (state.accountId !== null) {
    url += `&accountId=${state.accountId}`;
  }
  return url;
}

const renderEmpty = () => (
  <div
    className="d-flex flex-column justify-content-center align-content-center text-center gap-3 m-auto"
    style={{
      height: "max(50vh, 400px)",
      maxWidth: "460px",
    }}
  >
    <i
      className="bi bi-exclamation-circle"
      style={{ fontSize: "4rem", color: "#4498E0" }}
    />
    <p className="h6">Nothing found. Would you like to create something now?</p>
    <Widget
      src="nui.sking.near/widget/Input.Button"
      props={{
        children: "Create a new Thing",
        variant: "info w-100",
        size: "lg",
      }}
    />
    <Widget
      src="nui.sking.near/widget/Input.Button"
      props={{
        children: "Go to home",
        variant: "info outline w-100",
        size: "lg",
        href: "#/astro.sking.near/widget/index",
      }}
    />
  </div>
);

const renderLoading = () => <>loading</>;
let data = {};
switch (state.selectedOption) {
  case "all": {
    // This is duplicated code, a bit of a hack rn
    if (state.tag) {
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
    } else {
      const pattern = `${state.accountId ?? "*"}/${typeName}/*`;
      data = Social.keys(pattern, "final", {
        return_type: "BlockHeight",
        limit: 1,
      });
    }
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
    const pattern = `*/thing/*/categories/${category}`;
    const keys = Social.get(pattern, "final");
    if (keys) {
      keys = Object.entries(keys).flatMap(([k, v]) => {
        return Object.entries(v.test.thing).flatMap(([ka, kn]) =>
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

let things = [];
if (data) {
  things = processData(data);
}

let filteredThings = [];
let paginatedThings = [];

if (things) {
  filteredThings = things.filter((d) => {
    if (state.search == null) {
      return true;
    }

    return d.typeName.toLowerCase().includes(state.search.toLowerCase());
  });
  paginatedThings = filteredThings.slice(
    (state.currentPage - 1) * resPerPage,
    state.currentPage * resPerPage
  );
}

const renderThingsRows = () => {
  return (
    <div className="row g-3 flex-wrap">
      {paginatedThings.map((thing) => (
        <div
          key={thing}
          className="flex-grow-1 col-12 col-md-6 col-lg-4 col-xl-3"
          style={{
            minWidth: "320px",
          }}
        >
          <Widget
            src={metadataTemplate}
            props={{
              path: `${thing.accountId}/${typeName}/${thing.typeName}`,
            }}
          />
        </div>
      ))}
      {paginatedThings.length < resPerPage &&
        [...Array(resPerPage - paginatedThings.length)].map((_, i) => (
          <div
            key={`empty-${i}`}
            className="flex-grow-1 col-12 col-md-6 col-lg-4 col-xl-3"
            style={{
              minWidth: "320px",
            }}
          ></div>
        ))}
    </div>
  );
};
const renderPagination = () => (
  <div className="d-flex justify-content-center align-items-center gap-2 mb-4">
    <Widget
      src="nui.sking.near/widget/Navigation.Paginate"
      props={{
        pageSize: resPerPage,
        currentPage: state.currentPage,
        totalPageCount: Math.ceil(filteredThings.length / resPerPage),
        onPageChange: (page) => {
          State.update({
            currentPage: page,
          });
        },
        revaluateOnRender: true,
      }}
    />
  </div>
);

return (
  <>
    {renderSubheader()}
    {things != null &&
      (!things || things.length < 1 || filteredThings.length < 1) &&
      renderEmpty()}
    {things == null && renderLoading()}
    {((things != null && things) || things.length > 0) && (
      <div className="my-4">{renderThingsRows()}</div>
    )}
    {((things != null && things) ||
      things.length > resPerPage ||
      filteredThings.length > resPerPage) &&
      renderPagination()}
  </>
);
