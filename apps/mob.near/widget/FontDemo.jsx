const css = fetch(
  "https://fonts.googleapis.com/css2?family=Bangers&display=swap"
).body;

if (!css) {
  return;
}

const Theme = styled.div`
* {
    font-family: 'Bangers', cursive;
}
  ${css}
`;

return (
  <Theme>
    <Widget src="mob.near/widget/N" />
  </Theme>
);
