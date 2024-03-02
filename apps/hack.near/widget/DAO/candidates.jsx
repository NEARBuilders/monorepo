const accountId = context.accountId;

State.init({
  isMember: false,
});

const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";
const groupId = props.groupId ?? "voter";
const policy = Near.view(daoId, "get_policy");

if (!policy) {
  return "Loading...";
}

const group = policy.roles
  .filter((role) => role.name === groupId)
  .map((role) => role.kind.Group);

// SBT verification
let human = false;
const userSBTs = Near.view("registry.i-am-human.near", "sbt_tokens_by_owner", {
  account: accountId,
});

for (let i = 0; i < userSBTs.length; i++) {
  if ("fractal.i-am-human.near" == userSBTs[i][0]) {
    human = true;
  }
}

// check DAO group membership
const groupMembers = group.join(", ");

const checkMembership = (groupMembers) => {
  if (groupMembers.indexOf(memberId) !== -1) {
    return State.update({ isMember: true });
  }
};

const validMember = checkMembership(groupMembers);

return (
  <div className="m-2">
    <div className="mt-3">
      <div className="mb-3">
        <Widget
          src="near/widget/AccountProfile"
          props={{ accountId: "rc-dao.sputnik-dao.near" }}
        />
      </div>
      <h3>
        <b>Candidates</b>
      </h3>
      <p>
        <span style={{ fontSize: "0.8em" }}>
          🚧 <i>UNDER CONSTRUCTION</i> 🚧
        </span>
      </p>
    </div>
    <hr />
    <h3>Africa</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "jeromemrys.near",
          postUrl: "https://social.near.page/p/jeromemrys.near/94344897",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "fatokunmayowa.near",
          postUrl: "https://social.near.page/p/fatokunmayowa.near/95012620",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "mrmoh.near",
          postUrl: "https://social.near.page/p/mrmoh.near/95405581",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "psalm.near",
          postUrl: "https://social.near.page/p/psalm.near/95178985",
        }}
      />
    </div>
    <br />
    <h3>Asia</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "coineasydao.near",
          postUrl: "https://social.near.page/p/coineasydao.near/94552554",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "harveys.near",
          postUrl: "https://social.near.page/p/harveys.near/94819011",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "rileytran.near",
          postUrl: "https://social.near.page/p/rileytran.near/94851239",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "monish016.near",
          postUrl: "https://social.near.page/p/monish016.near/95021235",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "rahulgoel.near",
          postUrl: "https://social.near.page/p/rahulgoel.near/95242325",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "nearlove.near",
          postUrl: "https://social.near.page/p/nearlove.near/95309607",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "sachinmurali03.near",
          postUrl: "https://social.near.page/c/sachinmurali03.near/95399412",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "escobarindo.near",
          postUrl: "https://social.near.page/p/escobarindo.near/95318546",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "dineshkruplani.near",
          postUrl: "https://social.near.page/p/dineshkruplani.near/95335741",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "derymars.near",
          postUrl: "https://social.near.page/p/derymars.near/95381654",
        }}
      />
    </div>
    <br />
    <h3>Europe</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "ananastya.near",
          postUrl: "https://social.near.page/p/ananastya.near/94866343",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "kiskesis.near",
          postUrl: "https://social.near.page/p/kiskesis.near/94484171",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "kemo.near",
          postUrl: "https://social.near.page/p/kemo.near/95082496",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "bjirken.near",
          postUrl: "https://social.near.page/p/bjirken.near/95409527",
        }}
      />
    </div>
    <br />
    <h3>Australia</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "alejandro.near",
          postUrl: "https://social.near.page/p/alejandro.near/95415438",
        }}
      />
    </div>
    <br />
    <h3>North America</h3>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "izcc.near",
          postUrl: "https://social.near.page/p/izcc.near/95327942",
        }}
      />
    </div>
    <div className="mb-3">
      <Widget
        src="hack.near/widget/dao.nominee"
        props={{
          candidateId: "nneoma.near",
          postUrl: "https://social.near.page/c/nneoma.near/95351465",
        }}
      />
      <div className="mb-3">
        <Widget
          src="hack.near/widget/dao.nominee"
          props={{
            candidateId: "sirs.near",
            postUrl: "https://social.near.page/p/sirs.near/95409155",
          }}
        />
      </div>
      <br />
      <h3>South America</h3>
      <div className="mb-3">
        <Widget
          src="hack.near/widget/dao.nominee"
          props={{
            candidateId: "vianftbrasil.near",
            postUrl: "https://social.near.page/p/vianftbrasil.near/94928200",
          }}
        />
      </div>
      <div className="mb-3">
        <Widget
          src="hack.near/widget/dao.nominee"
          props={{
            candidateId: "frado.near",
            postUrl: "https://social.near.page/p/frado.near/95426622",
          }}
        />
      </div>
      <div className="mb-3">
        <Widget
          src="hack.near/widget/dao.nominee"
          props={{
            candidateId: "fritzwagner.near",
            postUrl: "https://social.near.page/p/fritzwagner.near/95118357",
          }}
        />
      </div>
      <div className="mb-3">
        <Widget
          src="hack.near/widget/dao.nominee"
          props={{
            candidateId: "johanga108.near",
            postUrl: "https://social.near.page/p/johanga108.near/94544303",
          }}
        />
      </div>
      <br />
    </div>
  </div>
);
