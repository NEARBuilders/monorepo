const creatorId = props.creatorId ?? "james.near";
const groupId = props.groupId ?? "6fd36ddf4884flm20pbe91e7b208b88d16";

const initMembers = Social.get(`${creatorId}/graph/${groupId}/**`);

State.init({
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

const memberId = props.memberId || state.newMember;

const isValid = isNearAddress(memberId);

const handleCreate = () => {
  Social.set({
    thing: {
      [groupId]: {
        ...state.group,
      },
    },
    graph: {
      [groupId]: {
        ...state.members,
      },
    },
  });
};

return (
  <>
    <div className="row">
      <div className="col-lg-6">
        <h5>Details</h5>
        <>
          <div className="mt-2">
            <Widget src="hack.near/widget/group.card" props={{ groupId }} />
          </div>
          <div className="mt-3">
            <button className="btn btn-success me-2" onClick={handleCreate}>
              update
            </button>
            <button
              className="btn btn-secondary me-2"
              href={`/hack.near/widget/group?groupId=${groupId}`}
            >
              view
            </button>
          </div>
        </>
        <div className="mb-2 mt-3">
          <Widget
            src="near/widget/MetadataEditor"
            props={{
              initialMetadata: group,
              onChange: (group) => State.update({ group }),
              options: {
                name: { label: "Name" },
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
      </div>
      <div className="col-lg-6">
        <>
          <div>
            <h5>Membership</h5>
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
          <hr />
          <div>
            <h5>Profiles</h5>
            {Object.keys(state.members).map((a) => {
              return (
                <div className="d-flex m-2 p-2 justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <Widget
                      src="mob.near/widget/Profile"
                      props={{ accountId: a }}
                    />
                  </div>
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
        </>
      </div>
    </div>
  </>
);
