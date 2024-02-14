const { Header } = VM.require("apps.near/widget/page.header") || {
  Header: () => <></>,
};
const { Footer } = VM.require("apps.near/widget/page.footer") || {
  Footer: () => <></>,
};

const Root = styled.div`
  background-color: #0b0c14;
  color: #ffffff;
  font-family: Satoshi, sans-serif;

  width: 100%;
`;

const sections = ["header", "footer"];
return (
  <Root>
    <Header {...props} />
    <Footer />
  </Root>
);
