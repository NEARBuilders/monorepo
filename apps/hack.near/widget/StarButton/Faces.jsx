const accountId = context.accountId;

const starsByUsers = props.starsByUsers || {};
const limit = props.limit ?? 3;

let stars = Object.keys(starsByUsers).reverse();

const graphStars = [];
const nonGraph = [];

const graph =
  (accountId &&
    Social.keys(`${accountId}/graph/follow/*`, "final")[accountId].graph
      .follow) ||
  {};

stars.forEach((accountId) => {
  if (accountId in graph) {
    graphStars.push(accountId);
  } else {
    nonGraph.push(accountId);
  }
});

let faces = [...graphStars, ...nonGraph];

const renderFaces = faces.slice(0, limit);

const Faces = styled.span`
  .face {
    display: inline-block;
    position: relative;
    top: -0.05em;
    margin: 0 -0.1em;
    height: 1em;
    width: 1em;
    min-width: 1em;
    img {
        object-fit: cover;
        border-radius: 50%;
        width: 100%;
        height: 100%;
    }
  }
`;

const Others = styled.span`
  &:hover {
    color: white !important;
  }
`;

const numStars = stars.length;

return (
  <>
    {numStars > 0 ? (
      <OverlayTrigger
        placement="auto"
        overlay={
          <Tooltip>
            <div
              className="text-truncate text-start"
              style={{ maxWidth: "16em" }}
            >
              {faces.slice(0, 10).map((accountId, i) => (
                <Fragment key={i}>
                  <Widget
                    src="mob.near/widget/ProfileLine"
                    props={{ accountId, link: false }}
                  />
                  <br />
                </Fragment>
              ))}
              {faces.length > 10 ? "..." : ""}
            </div>
          </Tooltip>
        }
      >
        <span>{numStars}</span>
      </OverlayTrigger>
    ) : (
      ""
    )}
    <Faces className="ms-2">
      {renderFaces.map((accountId, i) => (
        <a
          key={i}
          href={`#/mob.near/widget/ProfilePage?accountId=${accountId}`}
          className="text-decoration-none d-inline-block"
        >
          <Widget
            src="mob.near/widget/Profile.OverlayTrigger"
            props={{
              accountId,
              children: (
                <Widget
                  src="mob.near/widget/ProfileImage"
                  props={{
                    metadata,
                    accountId,
                    widgetName,
                    style: { zIndex: 10 - i },
                    className: "face",
                    tooltip: false,
                    imageStyle: {},
                    imageClassName: "",
                  }}
                />
              ),
            }}
          />
        </a>
      ))}
    </Faces>
  </>
);
