const [selectedCase, setSelectedCase] = useState("case1");

const renderContent = () => {
  switch (selectedCase) {
    case "case1":
      return <div>Content for Case 1</div>;
    case "case2":
      return <div>Content for Case 2</div>;
    case "case3":
      return <div>Content for Case 3</div>;
    default:
      return <div>Default Content</div>;
  }
};

return (
  <div>
    <div>
      <button onClick={() => setSelectedCase("case1")}>Case 1</button>
      <button onClick={() => setSelectedCase("case2")}>Case 2</button>
      <button onClick={() => setSelectedCase("case3")}>Case 3</button>
      <button onClick={() => setSelectedCase("default")}>Default</button>
    </div>
    {renderContent()}
  </div>
);
