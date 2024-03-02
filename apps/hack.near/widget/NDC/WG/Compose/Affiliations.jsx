const {
  affiliations,
  addFields,
  removeField,
  handleAFFCompanyName,
  handleAFFStartdate,
  handleAFFEnddate,
  handleAFFRole,
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

const getCurrDate = () => {
  let year = new Date().getFullYear().toString();

  let month = new Date().getMonth();
  month = month < 10 ? "0" + (month + 1) : month + 1;

  let day = new Date().getDate();
  day = day < 10 ? "0" + day.toString() : day.toString();

  return year + "-" + month + "-" + day;
};

return (
  <div className="w-100">
    <div className="d-flex justify-content-between pt-2">
      <H2>Affiliations</H2>
      <Widget
        src={widgets.styledComponents}
        props={{
          Button: {
            size: "sm",
            text: "Add More Affiliations",
            icon: <i className="bi bi-lg-plus" />,
            onClick: addFields,
          },
        }}
      />
    </div>
    <Separator />

    <div className="w-100">
      {affiliations.map((form, index) => {
        return (
          <div className="bg-white rounded p-4">
            <div>
              <Section>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    Input: {
                      label: "Organization Name *",
                      placeholder: "Company Name",
                      value: form.company_name,
                      handleChange: (event) =>
                        handleAFFCompanyName({ index, event }),
                    },
                  }}
                />
              </Section>
              <Section className="d-flex">
                <div className="w-100">
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Input: {
                        type: "date",
                        label: "Start date *",
                        value: form.start_date ?? getCurrDate(),
                        handleChange: (event) =>
                          handleAFFStartdate({ index, event }),
                      },
                    }}
                  />
                </div>
                <div className="px-2" />
                <div className="w-100">
                  <Widget
                    src={widgets.styledComponents}
                    props={{
                      Input: {
                        type: "date",
                        label: "End date *",
                        value: form.end_date ?? getCurrDate(),
                        handleChange: (event) =>
                          handleAFFEnddate({ index, event }),
                      },
                    }}
                  />
                </div>
              </Section>

              <Section>
                <Widget
                  src={widgets.styledComponents}
                  props={{
                    TextArea: {
                      label: "Role Description *",
                      placeholder:
                        "Please describe your role at the organization",
                      value: form.role,
                      limit: 2000,
                      handleChange: (event) => handleAFFRole({ index, event }),
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
                      text: "Delete Affiliation",
                      icon: <i className="bi bi-trash" />,
                      onClick: () => removeField(index),
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
