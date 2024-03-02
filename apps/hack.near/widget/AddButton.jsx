const accountId = props.accountId ?? "efiz.near";
const blockHeight = props.blockHeight ?? "101950016";

const thingId = props.thingId ?? "project";

if (!context.accountId) {
  return "";
}

const item = props.item ?? {
  type: "md",
  path: `${accountId}/post/main`,
  blockHeight,
};

const data = {
  index: {
    post: JSON.stringify({
      key: thingId,
      value: {
        item,
      },
    }),
  },
};

const handleAdd = () => {
  Social.set(data);
};

const Button = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: left;
  position: relative;
  background: inherit;
  color: inherit;
  height: 1em;
  
  &:not([disabled]):hover {
    opacity: 1 !important;
    color: DeepSkyBlue;

    &:before {
      content: "";
      position: absolute;
      left: 1px;
      border-radius: 50%;
      width: 35px;
      height: 35px;
    }
  }
`;

const PlusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

return (
  <Button disabled={!context.accountId} onClick={handleAdd}>
    <span>{PlusIcon}</span>
  </Button>
);
