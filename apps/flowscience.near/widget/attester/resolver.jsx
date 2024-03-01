const [accountIds, setAccountIds] = useState([]);
const resolverData = accountIds;
const [inputValue, setInputValue] = useState("");

const handleAddAccountId = () => {
  if (inputValue.trim() !== "" && !accountIds.includes(inputValue)) {
    const newAccountIds = [...accountIds, inputValue];
    setAccountIds(newAccountIds);
    onResolverChange(newAccountIds); // Pass the updated list to the parent component
    setInputValue("");
  }
};

const handleRemoveAccountId = (accountId) => {
  const newAccountIds = accountIds.filter((id) => id !== accountId);
  setAccountIds(newAccountIds);
  onResolverChange(newAccountIds); // Pass the updated list to the parent component
};

const handleInputChange = (e) => {
  setInputValue(e.target.value);
};

return (
  <div>
    <input
      type="text"
      value={inputValue}
      onChange={handleInputChange}
      placeholder="Enter accountId"
    />
    <button onClick={handleAddAccountId}>Add</button>
    <ul>
      {accountIds.map((accountId) => (
        <li key={accountId}>
          {accountId}
          <button onClick={() => handleRemoveAccountId(accountId)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  </div>
);
