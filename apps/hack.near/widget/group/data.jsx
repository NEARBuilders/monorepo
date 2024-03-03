const groupId = props.groupId || "5d8c50e9c475elm0wxzpcb8d5980836595";

if (!groupId) {
  return "group not found";
}

State.init({
  groupId,
  group,
  members: null,
  newMember: "",
});

function init() {
  if (state.members === null) {
    const initMembers =
      Social.get(`${context.accountId}/thing/${groupId}/members`) || [];
    return <p>JSON.stringify(initMembers)</p>;
    Social.set({ members: initMembers });
  }
}

init();

function addMember(newMember) {
  state.members.push(newMember);

  State.update({
    members: state.members,
  });
}

function removeMember(memberKey) {
  const updatedMembers = state.members.filter((member) => member !== memberKey);

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

const memberId = props.memberId || state.newMember;

const isValid = isNearAddress(memberId);

const handleCreate = () => {
  Social.set({
    thing: {
      [state.groupId]: {
        ...state.group,
        members: [...state.members],
      },
    },
    graph: {
      [state.groupId]: {
        ...state.members,
      },
    },
  });
};

return (
  <>
    <div className="row">
      <div className="col-lg-6">
        <h5>Edit Group</h5>
        <input
          placeholder={groupId}
          onChange={(e) => State.update({ groupId: e.target.value })}
        />
        <>
          <div className="mt-3">
            <button className="btn btn-success me-2" onClick={handleCreate}>
              save
            </button>
            <button
              className="btn btn-secondary me-2"
              href={`/hack.near/widget/group?groupId=${groupId}`}
            >
              view
            </button>
          </div>
          <div className="mt-4">
            <h5>Details</h5>
            <Widget
              src="near/widget/MetadataEditor"
              props={{
                initialMetadata: group,
                onChange: (group) => State.update({ group }),
                options: {
                  name: {
                    label: "Name",
                  },
                  image: { label: "Logo" },
                  description: { label: "About" },
                  tags: {
                    label: "Tags",
                    tagsPattern: `*/${groupId}/tags/*`,
                    placeholder: "art, gov, edu, dev, com, nft, ai, social",
                  },
                  linktree: {
                    links: [
                      {
                        label: "Twitter",
                        prefix: "https://twitter.com/",
                        name: "twitter",
                      },
                      {
                        label: "Github",
                        prefix: "https://github.com/",
                        name: "github",
                      },
                      {
                        label: "Telegram",
                        prefix: "https://t.me/",
                        name: "telegram",
                      },
                      {
                        label: "Website",
                        prefix: "https://",
                        name: "website",
                      },
                    ],
                  },
                },
              }}
            />
          </div>
        </>
      </div>
      <div className="col-lg-6">
        <>
          <div>
            <h5>Add Members</h5>
            <input
              placeholder="<example>.near"
              onChange={(e) => State.update({ newMember: e.target.value })}
            />
            <div className="d-flex align-items-center mt-2">
              <button
                className="btn btn-primary mt-2"
                onClick={() => addMember(state.newMember)}
              >
                add
              </button>
            </div>
          </div>
          <br />
          {state.groupId === groupId && (
            <div>
              <h5>Profiles</h5>
              <p>{JSON.parse(state.members)}</p>
              {state.members &&
                state.members.map((a, i) => {
                  return (
                    <div
                      key={i}
                      className="d-flex m-2 p-2 justify-content-between align-items-center"
                    >
                      <Widget
                        key={i}
                        src="mob.near/widget/Profile"
                        props={{ accountId: a }}
                      />
                      <button
                        className="btn btn-danger m-1"
                        onClick={() => removeMember(a)}
                      >
                        remove
                      </button>
                    </div>
                  );
                })}
            </div>
          )}
        </>
      </div>
    </div>
  </>
);
