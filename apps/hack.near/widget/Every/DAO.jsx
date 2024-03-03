const daos = Near.view("sputnik-dao.near", "get_dao_list");

if (daos === null) {
  return "Loading...";
}

State.init({
  name: props.name ?? "",
});

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const filteredDaos = daos.filter((dao) => dao.indexOf(state.name) !== -1);

const total_daos = daos.length;

const filtered_daos = filteredDaos.length;

const Container = styled.div`
  display: flex;
  max-width: 888px;
  margin: 0 auto;
  flex-direction: column;
  padding: 8px;

  @media (max-width: 480px) {
    max-width: 333px;
  }
`;

return (
  <Container>
    <div className="d-flex flex-wrap justify-content-between mb-3">
      <div className="m-1">
        <h2 className="mb-2">every dao</h2>
        {!state.name ? (
          <h5 className="mb-3">total ~ {total_daos}</h5>
        ) : (
          <h5 className="mb-3">filtered ~ {filtered_daos}</h5>
        )}
      </div>
      <div className="m-2">
        <a
          href={`#/near/widget/ProfilePage?accountId=every.near`}
          class="text-muted"
        >
          <Widget
            src="mob.near/widget/Profile.ShortInlineBlock"
            props={{ accountId: "every.near" }}
          />
        </a>
      </div>
    </div>
    <h4 className="m-1 mb-2">search by name</h4>
    <input
      placeholder="<example>.sputnik-dao.near"
      type="text"
      value={state.name}
      onChange={(e) => onChangeName(e.target.value)}
    ></input>
    <div className="mt-3">
      {filteredDaos.map((dao, j) => (
        <div className="d-flex m-2">
          <Widget
            key={j}
            src="hack.near/widget/dao.profile.card"
            props={{ daoId: dao }}
          />
        </div>
      ))}
    </div>
  </Container>
);
