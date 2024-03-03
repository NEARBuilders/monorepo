const accountId = props.accountId ?? context.accountId;
const { daoId, policy } = props;
const candidateId = props.candidateId;

const postUrl =
  props.postUrl ?? "https://social.near.page/p/rc-dao.near/94244727";

const Card = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 15px;
  width: 100%;
  border-radius: 9px;
  background: #fff;
  border: 1px solid #eceef0;
  box-shadow: 0px 1px 3px rgba(16, 24, 40, 0.1),
    0px 1px 2px rgba(16, 24, 40, 0.06);
  overflow: hidden;
  padding: 12px;
  margin: 0.555em;
`;

return (
  <Card>
    <Widget
      src="near/widget/AccountProfile"
      props={{ accountId: candidateId }}
    />
    <div className="m-1 row">
      <div className="col-auto m-1">
        <a className="btn btn-outline-primary" href={postUrl}>
          About
        </a>
      </div>
      <div className="col-auto m-1">
        {accountId && (
          <Widget
            src="mob.near/widget/FollowButton"
            props={{ accountId: candidateId }}
          />
        )}
      </div>
    </div>
  </Card>
);
