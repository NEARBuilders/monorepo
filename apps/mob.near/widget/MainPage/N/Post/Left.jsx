const accountId = props.accountId;
const groupId = props.groupId;

const imgWrapperStyle = { width: "40px", height: "40px" };

const GroupLink = styled.a`
  margin-top: -10px;
  display: block;
  div > img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 8px;
  }
`;

const groupInner = groupId ? (
  <div style={imgWrapperStyle}>
    <img
      src={`https://i.near.social/magic/thumbnail/https://near.social/magic/img/nft/${groupId}`}
      alt={`Group icon: ${groupId}`}
    />
  </div>
) : null;

return (
  <>
    <a
      className="d-block position-relative"
      style={{ zIndex: 1 }}
      href={`/mob.near/widget/ProfilePage?accountId=${accountId}`}
    >
      <Widget
        src="mob.near/widget/ProfileImage"
        loading={<div style={imgWrapperStyle} />}
        props={{
          accountId,
          tooltip: true,
          link: true,
          style: imgWrapperStyle,
          imageClassName: "rounded-circle w-100 h-100",
        }}
      />
    </a>
    {groupId && (
      <GroupLink href={`?groupId=${groupId}`}>
        <Widget
          loading={groupInner}
          src="mob.near/widget/N.Common.OverlayTrigger"
          props={{
            popup: (
              <Widget
                src="mob.near/widget/N.Group.Header"
                props={{ groupId, noBorder: true, link: true }}
              />
            ),
            children: groupInner,
          }}
        />
      </GroupLink>
    )}
  </>
);
