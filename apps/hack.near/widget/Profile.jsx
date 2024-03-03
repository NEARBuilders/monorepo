const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const accountId = props.accountId ?? context.accountId;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);

const name = profile.name;
const image = profile.image;

return (
  <div className="profile d-inline-block">
    <a
      href={`#/hack.near/widget/ProfilePage?sender=${sender}`}
      className="text-decoration-none link-dark"
    >
      <Widget
        src="hack.near/widget/ProfileImage"
        props={{
          profile,
          sender,
          className: "float-start d-inline-block me-2",
        }}
      />
      <div className="profile-info d-inline-block" style={{ maxWidth: "16em" }}>
        <div className="profile-name text-truncate">
          {name || "No-name profile"}
        </div>
        <div className="profile-links d-flex">
          <div className="d-inline-block profile-account text-secondary text-truncate">
            @{sender}
          </div>
        </div>
      </div>
    </a>
  </div>
);
