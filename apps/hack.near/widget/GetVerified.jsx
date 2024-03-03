const MainCta = styled.a`

  display: flex;
  justify-content: center;
  width: fit-content;
  margin-top: 0.5rem;
  border-radius: 0.375rem;
  border: none;
  background: linear-gradient(to right, rgba(147,51,234,1), rgba(79,70,229,1));
  background-origin: border-box;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 500;
  color: #fff;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  transition: background 0.2s ease-in-out;
  &:hover {
    background: linear-gradient(to right, rgba(117,41,214,1), rgba(59,60,219,1));
    color: #fff;
    text-decoration: none;
  }
`;

const { linkText, linkUrl } = props;

const btnText = linkText ? linkText : "Verify My Personhood";
const btnUrl = linkUrl ? linkUrl : "https://i-am-human.app/";
return <MainCta href={btnUrl}>{btnText}</MainCta>;
