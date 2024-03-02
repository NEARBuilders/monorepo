const { handleClose } = props;

const curatorId = props.curatorId ?? context.accountId;

if (!curatorId) {
  return "Please connect your NEAR account :)";
}

const groupId = props.groupId ?? "526fb256e74eelmf0nw3n5909bc189c13d";

const groupData =
  props.group ?? Social.get(`${curatorId}/thing/${groupId}/**`, "final");

if (!groupData) {
  return "";
}

const groupKey = Object.keys(groupData)[0];

const initMembers =
  props.members ?? Social.get(`${curatorId}/graph/${groupId}/**`, "final");

if (!initMembers) {
  return "";
}

State.init({
  group: groupData,
  members: initMembers,
  newMember: "",
});

function addMember(newMember) {
  State.update({
    members: { ...state.members, [newMember]: "" },
  });
}

function removeMember(memberKey) {
  const updatedMembers = { ...state.members };
  delete updatedMembers[memberKey];

  State.update({
    members: updatedMembers,
  });
}

function isNearAddress(address) {
  if (typeof address !== "string") {
    return false;
  }
  if (!address.endsWith(".near")) {
    return false;
  }
  const parts = address.split(".");
  if (parts.length !== 2) {
    return false;
  }
  if (parts[0].length < 2 || parts[0].length > 32) {
    return false;
  }
  if (!/^[a-z0-9_-]+$/i.test(parts[0])) {
    return false;
  }
  return true;
}

const memberId = props.memberId ?? state.newMember;

const isValid = isNearAddress(memberId);

const handleSave = () => {
  const data = {
    graph: {
      [groupId]: {
        ...state.members,
      },
    },
    index: {
      graph: JSON.stringify(
        Object.keys(state.members).map((account) => ({
          key: groupId,
          value: {
            type: "add",
            accountId: account,
          },
        }))
      ),
    },
  };
  const notify = Object.keys(state.members).filter(
    (it) => it !== context.accountId
  );
  if (notify.length > 0) {
    data.index.notify = JSON.stringify(
      notify.map((account) => ({
        key: account,
        value: {
          type: "add",
        },
      }))
    );
  }
  Social.set(data);
};

const CardStyled = styled.div`
  width: 100%;
  height: 100%;
  background: #f8f8f9;
  gap: 10px;
  padding: 25px;
  margin: 0 auto;
  border-radius: 10px;
  overflow-y: scroll;
`;

const CardForm = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
`;

const H1 = styled.h1`
  margin-bottom: 10px;
  font-style: normal;
  font-weight: 555;
  font-size: 23px;
`;

const Submitcontainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 8px;
  margin-bottom: 16px;
  @media only screen and (max-width: 480px) {
    margin-top: 10px;
  }
`;

const Modal = styled.div`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  background: rgba(0, 0, 0, 0.7);
`;

const ComponentWrapper = styled.div`
  display: flex;
  width: 80%;
  height: 80%;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 10px;
  background: #fff;
  border: 1px solid transparent;
  margin: 140px auto auto auto;
  @media only screen and (max-width: 480px) {
    width: 90%;
  }
`;

const Label = styled.div`
  margin-bottom: 8px;
  font-weight: bold;
  text-align: left;
`;

return (
  <Modal>
    <ComponentWrapper>
      <CardStyled>
        <div className="d-flex flex-column">
          <CardForm>
            <div className="d-flex align-items-center justify-content-between">
              <H1>Builders</H1>
              <Submitcontainer>
                <button
                  onClick={handleClose}
                  className="btn btn-secondary me-1"
                >
                  Close
                </button>
                <button className="btn btn-success m-2" onClick={handleSave}>
                  Save
                </button>
              </Submitcontainer>
            </div>
            <div>
              <Label>Account ID</Label>
              <input
                label="input each member's account ID here, then click `add` below"
                placeholder="<example>.near"
                onChange={(e) => State.update({ newMember: e.target.value })}
              />
              <div className="d-flex mt-2">
                <button
                  className="btn btn-primary m-2"
                  onClick={() => addMember(state.newMember)}
                >
                  Add
                </button>
                {JSON.stringify(state.members) !==
                  JSON.stringify(initMembers) && (
                  <button
                    className="btn btn-outline-primary m-2"
                    onClick={() => State.update({ members: initMembers })}
                  >
                    Reset
                  </button>
                )}
              </div>
            </div>
            <div>
              {Object.keys(state.members).map((a) => {
                return (
                  <div className="d-flex m-2 p-2 justify-content-between">
                    <Widget
                      src="mob.near/widget/Profile"
                      props={{ accountId: a }}
                    />
                    <button
                      className="btn btn-danger m-2"
                      onClick={() => removeMember(a)}
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
            </div>
          </CardForm>
        </div>
      </CardStyled>
    </ComponentWrapper>
  </Modal>
);
