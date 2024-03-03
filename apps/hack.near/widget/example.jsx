const [orgName, setOrgName] = useState("");
const [orgSize, setOrgSize] = useState("");
const [orgDesc, setOrgDesc] = useState("");
const [organizations, setOrganizations] = useState([]);

const addOrganization = () => {
  setOrganizations((prevOrganizations) => [
    ...prevOrganizations,
    { name: orgName, size: orgSize, description: orgDesc },
  ]);

  // Reset input fields after adding
  setOrgName("");
  setOrgSize("");
  setOrgDesc("");
};

return (
  <>
    <div>
      <p>Create Organization</p>
      <div>
        <label htmlFor="name">Name of Organization:</label>
        <input
          type="text"
          id="name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="size">Size of Organization:</label>
        <input
          type="number"
          id="size"
          value={orgSize}
          onChange={(e) => setOrgSize(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="desc">Description:</label>
        <input
          type="text"
          id="desc"
          value={orgDesc}
          onChange={(e) => setOrgDesc(e.target.value)}
        />
      </div>
      <button onClick={addOrganization}>Add Organization</button>
    </div>

    <br />

    <p>View Organizations</p>
    <div>
      {organizations.map((org, index) => (
        <div key={index}>
          <p>Name: {org.name}</p>
          <p>Size: {org.size}</p>
          <p>Description: {org.description}</p>
        </div>
      ))}
    </div>
  </>
);
