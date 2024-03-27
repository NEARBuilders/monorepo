const { Layout } = VM.require("every.near/widget/Layout") || {
  Layout: () => <></>,
};

const Header = () => (
  <div className="p-3 w-100 d-flex align-items-center justify-content-center bg-dark-subtle">
    Header
  </div>
);

const Footer = () => (
  <div className="p-3 w-100 d-flex align-items-center justify-content-center bg-dark-subtle">
    Footer
  </div>
);

const Sidebar = () => <div className="border-end border-2">aside content</div>;

const [selectedLayout, setSelectedLayout] = useState("standard");

return (
  <div className="h-100 w-100">
    <h1 className="mb-3">Preview Layout</h1>
    <select
      className="form-select mb-3"
      value={selectedLayout}
      onChange={(e) => setSelectedLayout(e.target.value)}
    >
      <option selected value="standard">
        Standard
      </option>
      <option value="sidebar">Sidebar</option>
      <option value="split">Split</option>
    </select>
    <hr className="mb-3" />
    <Layout blocks={{ Header, Footer, Sidebar }} variant={selectedLayout}>
      Main Content
    </Layout>
  </div>
);
