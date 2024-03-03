const accountId = context.accountId;
const memberId = props.memberId ?? context.accountId;
const roleId = props.roleId ?? "frens";
const daoId = props.daoId ?? "lonk.sputnik-dao.near";

const validMember = props.validMember;
const canJoin = props.canJoin;

return (
  <div className="m-3">
    {validMember ? (
      <div>
        <h5 className="m-2">Part 1:</h5>
        <div className=" mt-2 mb-3">
          <Widget
            src="hack.near/widget/survey.option"
            props={{
              memberId,
              proposalId: 1,
              authorId: "lonkdao.near",
              postUrl: "https://near.social?hashtag=lonk",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/survey.option"
            props={{
              memberId,
              proposalId: 2,
              authorId: "lonkdao.near",
              postUrl: "https://near.social?hashtag=lonk",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/survey.option"
            props={{
              memberId,
              proposalId: 3,
              authorId: "lonkdao.near",
              postUrl: "https://near.social?hashtag=lonk",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/survey.option"
            props={{
              memberId,
              proposalId: 4,
              authorId: "lonkdao.near",
              postUrl: "https://near.social?hashtag=lonk",
            }}
          />
        </div>
        <div className="mb-3">
          <Widget
            src="hack.near/widget/survey.option"
            props={{
              memberId,
              proposalId: 5,
              authorId: "lonkdao.near",
              postUrl: "https://near.social?hashtag=lonk",
            }}
          />
        </div>
      </div>
    ) : (
      <>
        <Widget
          src="hack.near/widget/dao.join"
          props={{
            accountId,
            daoId: "lonk.sputnik-dao.near",
            roleId: "frens",
          }}
        />
      </>
    )}
  </div>
);
