const item = props.item;

if (!item) {
  return "";
}

const stars = Social.index("star", item);

const starsByUsers = {};

(stars || []).forEach((star) => {
  if (star.value.type === "star") {
    starsByUsers[star.accountId] = star;
  } else if (star.value.type === "unstar") {
    delete starsByUsers[star.accountId];
  }
});
if (state.starred === true) {
  starsByUsers[context.accountId] = {
    accountId: context.accountId,
  };
} else if (state.starred === false) {
  delete starsByUsers[context.accountId];
}

const accountsWithStars = Object.keys(starsByUsers);
const starred = context.accountId && !!starsByUsers[context.accountId];

const starClick = () => {
  const data = {
    index: {
      star: JSON.stringify({
        key: item,
        value: {
          type: starred ? "unstar" : "star",
        },
      }),
    },
  };

  if (!starred && props.notifyAccountId) {
    data.index.notify = JSON.stringify({
      key: props.notifyAccountId,
      value: {
        type: "star",
        item,
      },
    });
  }
  Social.set(data, {
    onCommit: () => State.update({ starred: !starred }),
  });
};

const StarButton = styled.button`
  border: 0 !important;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 23%;
  width: 2.5em;
  height: 2.5em;
`;

const title = starred ? "Starred" : "Star";

return (
  <div className="d-inline-flex align-items-center">
    <StarButton
      title={title}
      className=" btn me-1"
      disabled={!context.accountId}
      onClick={starClick}
    >
      <i className={`bi fs-2 p-1 ${starred ? "bi-star-fill" : "bi-star"}`} />
    </StarButton>
    <Widget src="hack.near/widget/StarButton.Faces" props={{ starsByUsers }} />
  </div>
);
