const initialItems = ["Item 1", "Item 2", "Item 3"]; // get from data

const defaultState = {
  items: [],
};

State.init(defaultState);

function init() {
  if (!state["items"]) {
    // get from local storage
    State.update({
      items: initialItems,
    });
  }
}

init();

// const [items, setItems] = useState([]);
const [newItem, setNewItem] = useState("");

useEffect(() => {
  // Load initial list from local JSON file
  // fetch("/data.json")
  //   .then((response) => response.json())
  //   .then((data) => setItems(data))
  //   .catch((error) => console.error("Error loading data:", error));
}, []);

const handleAddItem = () => {
  if (newItem.trim() !== "") {
    const updatedItems = [...items, newItem];
    // setItems(updatedItems);
    // setNewItem("");

    // Update local JSON file
    // fetch("/data.json", {
    //   method: "PUT",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(updatedItems),
    // })
    //   .then(() => console.log("Item added successfully!"))
    //   .catch((error) => console.error("Error adding item:", error));
  }
};

const Theme = styled.div`
  .container {
    display: flex;
    height: 100vh;
  }

  .sidebar {
    flex: 1;
    border-right: 1px solid #ddd;
    padding: 10px;
  }

  .main-content {
    flex: 3;
    padding: 10px;
  }

  input[type="text"] {
    padding: 8px;
    margin-right: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
  }

  button {
    padding: 8px 16px;
    background-color: #0066cc;
    color: #fff;
    border: none;
    border-radius: 3px;
    cursor: pointer;
  }

  button:hover {
    background-color: #0052a3;
  }
`;

return (
  <Theme>
    <div className="container">
      <div className="sidebar">
        <h2>Sidebar</h2>
        <ul>
          {state.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
      <div className="main-content">
        <h1>Header</h1>
        <div>
          <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            placeholder="Enter new item"
          />
          <button onClick={handleAddItem}>Add Item</button>
        </div>
      </div>
    </div>
  </Theme>
);

const { page, tab, ...passProps } = props;

return (
  <>
    <Disconnect />
    <Connect />
  </>
);
const routes = {
  // Add new routes below
  home: {
    path: "urbit.near/widget/page.home", // notice how this coincides with apps/urbit/widget/page/home.js
    blockHeight: "final",
    init: {
      name: "Home",
    },
  },
  playground: {
    path: "urbit.near/widget/page.playground",
    blockHeight: "final",
    init: {
      name: "Playground",
    },
  },
};

const { AppLayout } = VM.require("urbit.near/widget/template.AppLayout") || {
  AppLayout: () => <></>,
};

if (!page) page = Object.keys(routes)[0] || "home";

const Root = styled.div``;

function Router({ active, routes }) {
  const routeParts = active.split(".");

  let currentRoute = routes;
  let src = "";
  let defaultProps = {};

  for (let part of routeParts) {
    if (currentRoute[part]) {
      currentRoute = currentRoute[part];
      src = currentRoute.path;

      if (currentRoute.init) {
        defaultProps = { ...defaultProps, ...currentRoute.init };
      }
    } else {
      // Handle 404 or default case for unknown routes
      return <p>404 Not Found</p>;
    }
  }

  return (
    <div key={active}>
      <Widget
        src={src}
        props={{
          currentPath: `/urbit.near/widget/app?page=${page}`,
          page: tab,
          ...passProps,
          ...defaultProps,
        }}
      />
    </div>
  );
}

const Container = styled.div`
  display: flex;
  height: 100%;
`;

const Content = styled.div`
  width: 100%;
  height: 100%;
`;

return (
  <Root>
    <Container>
      <AppLayout page={page} routes={routes} {...props}>
        <Content>
          <Router active={page} routes={routes} />
        </Content>
      </AppLayout>
    </Container>
  </Root>
);
