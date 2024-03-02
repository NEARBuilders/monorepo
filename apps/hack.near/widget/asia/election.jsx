const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "voter";
const daoId = props.daoId ?? "rc-dao.sputnik-dao.near";

const validMember = props.validMember;
const canJoin = props.canJoin;
const canJoinContinent = props.canJoinContinent;

return (
  <div className="m-2">
    {validMember && canJoinContinent && (
      <div className="mb-2">
        <h3>Asia</h3>
        <Widget
          src="hack.near/widget/communities.regional"
          props={{
            daoId: "asia.sputnik-dao.near",
            name: "Join NEAR Asia",
            memberId,
            roleId,
          }}
        />
      </div>
    )}
    {!canJoinContinent && (
      <div>
        <h3>Asia</h3>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 915,
              candidateId: "coineasydao.near",
              postUrl: "https://social.near.page/p/coineasydao.near/94552554",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 916,
              candidateId: "harveys.near",
              postUrl: "https://social.near.page/p/harveys.near/94819011",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 917,
              candidateId: "rileytran.near",
              postUrl: "https://social.near.page/p/rileytran.near/94851239",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 918,
              candidateId: "monish016.near",
              postUrl: "https://social.near.page/p/monish016.near/95021235",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 919,
              candidateId: "rahulgoel.near",
              postUrl: "https://social.near.page/p/rahulgoel.near/95242325",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 920,
              candidateId: "nearlove.near",
              postUrl: "https://social.near.page/p/nearlove.near/95309607",
            }}
          />
        </div>{" "}
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 921,
              candidateId: "sachinmurali03.near",
              postUrl:
                "https://social.near.page/c/sachinmurali03.near/95399412",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 922,
              candidateId: "escobarindo.near",
              postUrl: "https://social.near.page/p/escobarindo.near/95318546",
            }}
          />
        </div>{" "}
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 923,
              candidateId: "dineshkruplani.near",
              postUrl:
                "https://social.near.page/p/dineshkruplani.near/95335741",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/dao.candidate"
            props={{
              memberId,
              proposalId: 924,
              candidateId: "derymars.near",
              postUrl: "https://social.near.page/p/derymars.near/95381654",
            }}
          />
        </div>
      </div>
    )}
  </div>
);
