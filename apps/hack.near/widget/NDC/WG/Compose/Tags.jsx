const H2 = styled.h1`
  font-weight: 500;
  font-size: 14px;
  margin: 15px 0 10px 0;
`;
const Section = styled.div`
  gap: 8px;
  margin-bottom: 10px;
`;
const Checkbox = styled.input`
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 0px 0px;
  gap: 10px;
  width: 16px;
  height: 16px;
  background: #ffffff;
  border: 1px solid #d0d6d9;
  border-radius: 4px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;

const P = styled.p`
  font-weight: 400;
  font-size: 12px;
  margin: 0;
`;

const A = styled.a`
  margin-left: 4px;
  font-weight: 600;
  font-size: 12px;
  color: #000000;
`;

State.init({
  agreement: false,
  tags: "",
  error_msg: "",
});

const { tags, handleTags, handleDeclaration } = props;

const widgets = {
  styledComponents: "nomination.ndctools.near/widget/NDC.StyledComponents",
};

return (
  <div>
    <Widget
      src={widgets.styledComponents}
      props={{
        Input: {
          label: "Tags",
          placeholder: "Add tags separated by a comma",
          value: tags,
          handleChange: handleTags,
        },
      }}
    />

    <div>
      <H2>{"Declaration of Transparency "}</H2>
      <Section className="d-flex">
        <Checkbox
          type="checkbox"
          value={state.agreement}
          onChange={() => {
            handleDeclaration(!state.agreement);
            State.update({ agreement: !state.agreement });
          }}
        />
        <P>
          I agree to the
          <A
            href="https://bafkreid3vx2tivdlwkivezalhkscxnxakirw5nuunxce3b6ivtx4j6ac44.ipfs.nftstorage.link/"
            target={"_blank"}
            rel={"noopener"}
          >
            Declaration of Transparency and Accountability.
          </A>
        </P>
      </Section>
    </div>
  </div>
);
