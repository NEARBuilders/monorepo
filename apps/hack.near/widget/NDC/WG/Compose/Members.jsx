const {
  members,
  addMember,
  removeMember,
  handleMemberAccount,
  handleMemberRole,
} = props;

const H2 = styled.h2`
  font-size: 14px;
`;
const Separator = styled.div`
  width: 100%;
  height: 1px;
  margin: 5px 0 12px 0;
  background-color: #d0d6d966;
`;
const Section = styled.div`
  margin-bottom: 12px;
`;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

return (
  <div className="w-100">
    <div className="d-flex justify-content-between pt-2">
      <H2>Members</H2>
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            size: "sm",
            text: "Add Members",
            icon: <i className="bi bi-lg-plus" />,
            onClick: addMembers,
          },
        }}
      />
    </div>
    <Separator />

    <div className="w-100">
      {members.map((form, index) => {
        return (
          <div className="bg-white rounded p-4">
            <div>
              <Section>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Input: {
                      label: "Member Account ID *",
                      placeholder: "<example1>.near, <example2>.near, ...",
                      value: form.memberId,
                      handleChange: (event) =>
                        handleMemberAccount({ index, event }),
                    },
                  }}
                />
              </Section>

              <Section>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    TextArea: {
                      label: "Role Description *",
                      placeholder:
                        "Please describe the member's role in the work group.",
                      value: form.role,
                      limit: 2000,
                      handleChange: (event) =>
                        handleMemberRole({ index, event }),
                    },
                  }}
                />
              </Section>

              <div className="d-flex justify-content-end">
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Button: {
                      size: "sm",
                      className: "danger",
                      text: "Delete Member",
                      icon: <i className="bi bi-trash" />,
                      onClick: () => removeMember(index),
                    },
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  </div>
);
