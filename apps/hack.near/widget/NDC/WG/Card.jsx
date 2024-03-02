const creatorId = props.creatorId ?? context.accountId;

const groupId = props.groupId ?? "cefe2651fd468lm0x9mg91d69d351d0c4";

const groupData = props.data ?? Social.get(`hack.near/thing/${groupId}/**`);

State.init({
  verified: false,
});

const widgets = {
  styledComponents: "hack.near/widget/NDC.StyledComponents",
  groupPage: "near/widget/ProfilePage",
};

const isHuman = Near.view(registry_contract, "is_human", {
  account: context.accountId,
});
State.update({ verified: isHuman[0][1].length > 0 });

const Card = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 16px;
  background: #f8f8f8;
  border-radius: 10px;
`;
const HeaderCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
`;
const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px;
  gap: 4px;
  flex-grow: 1;
`;
const UserLink = styled.a`
  width: 100%;
  cursor: pointer;
  &:hover {
    text-decoration: none;
  }
`;
const GroupName = styled.p`
  font-weight: 500;
  font-size: 14px;
  margin: 0;
  align-items: center;
  color: #000000;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GroupCreator = styled.p`
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  margin: 0px;
  line-height: 120%;
  display: flex;
  align-items: center;
  color: #828688;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const LowerSection = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
`;
const LowerSectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 12px;
  align-self: stretch;
`;
const ButtonsLowerSection = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  width: 100%;
  height: 28px;
`;

const Wrapper = styled.div`

  @media only screen and (max-width: 610px) {
    width: 100%;
  }
  width: 50%;
`;

const trimText = (text, limit) => {
  if (!text) return "";

  const _limit = limit ?? 200;
  const ending = text.length > _limit ? "..." : "";
  const trimmed = text.slice(0, limit ?? 200);

  return `${trimmed}${ending}`;
};

return (
  <Wrapper className="p-2 col-lg-4 col-md-6 col-sm-12">
    <Card>
      <HeaderCard className="d-flex justify-content-between w-100">
        <div className="d-flex align-items-center gap-2 w-100 justify-content-between">
          <Widget
            src="mob.near/widget/ProfileImage"
            props={{
              accountId: groupData.creatorId,
              tooltip: true,
              imageClassName: "rounded-circle w-100 h-100",
              style: { minWidth: "45px", height: "45px" },
            }}
          />
          <HeaderContent>
            <UserLink
              href={`/${widgets.groupPage}?accountId=${groupData.creatorId}`}
            >
              <GroupName>{groupData.title}</GroupName>
              <GroupCreator>{groupData.creatorId}</GroupCreator>
            </UserLink>
            {groupData.creatorId === context.accountId && (
              <a
                key="edit"
                href={`/hack.near/widget/group.data?groupId=${groupId}`}
                className="position-absolute top-0 end-0 link-secondary small me-3 mt-2"
              >
                <i className="bi bi-pencil" /> Edit Card
              </a>
            )}
          </HeaderContent>
        </div>
      </HeaderCard>
      <LowerSection>
        <LowerSectionContainer>
          <div className="d-flex w-100 align-items-center">
            <div className="d-flex w-100 gap-2 justify-content-between">
              <Widget
                src={widgets.styledComponents}
                props={{
                  Link: {
                    text: "View",
                    className: "primary w-100 justify-content-center",
                    href: `/${widgets.groupPage}?accountId=${groupData.creatorId}`,
                    icon: <i className="bi bi-eye-fill fs-6"></i>,
                  },
                }}
              />
            </div>
          </div>
        </LowerSectionContainer>
      </LowerSection>
    </Card>
  </Wrapper>
);
