const Container = styled.div`
  .profile-image {
    width: 120px;
    height: 120px;
  }

  .top-right {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .bell-icon {
    font-size: 28px;
    color: #000;
    margin-left: 8px;
    text-decoration: none;
    transition: color 0.3s ease-in-out;
  }

  .bell-icon:hover {
    color: #000;
  }

  .bell-icon .bi-bell {
    display: inline;
  }

  .bell-icon .bi-bell-fill {
    display: none;
  }

  .bell-icon:hover .bi-bell {
    display: none;
  }

  .bell-icon:hover .bi-bell-fill {
    display: inline;
  }

  @media (max-width: 576px) {
    .profile-image {
      width: 160px;
      height: 160px;
    }
  }
`;

const thingStarCount = {};

const data = Social.keys("*/graph/star/widget/*/*", "final");
if (!data) {
  return "Loading...";
}

console.log("Data:", data);

let things = Object.entries(data);
const limit = 888;

console.log("Things:", things);

for (let i = 0; i < things.length; ++i) {
  let accountId = things[i][0];

  Object.keys(things[i][1].graph.star.widget).forEach((creatorId) => {
    Object.keys(things[i][1].graph.star.widget[creatorId]).forEach(
      (thingName) => {
        let stars = Social.keys(
          `*/graph/star/widget/${creatorId}/${thingName}`,
          "final",
          {
            return_type: "BlockHeight",
            values_only: true,
          }
        );

        console.log("Builder:", creatorId);
        console.log("Thing:", thingName);
        console.log("Stars:", stars);

        if (stars) {
          const thingPath = `${creatorId}/widget/${thingName}`;

          if (thingPath in thingStarCount) {
            // Increment the star count if the path already exists
            thingStarCount[thingPath]++;
          } else {
            // Initialize the star count if the path is new
            thingStarCount[thingPath] = 1;
          }
        }
      }
    );
  });
}

const limitedStarSort = Object.entries(thingStarCount)
  .sort((a, b) => b[1] - a[1])
  .slice(0, limit);

console.log(limitedStarSort);

const starButton = ({ thingPath }) => {
  return (
    <div>
      <a
        className="btn btn-outline-primary m-1"
        href={`#/near/widget/ComponentDetailsPage?src=${thingPath}`}
      >
        View Code
      </a>{" "}
      <Widget src="hack.near/widget/star.button" props={{ thingPath }} />
    </div>
  );
};

return (
  <Container>
    <div className="d-flex flex-wrap align-items-center">
      <div className="m-3">
        <h3>
          <b>All Stars</b> <i className="bi bi-bookmark-star"></i>
        </h3>
      </div>
      <div className="ms-auto me-0 me-md-2 d-flex align-items-center">
        <div className="top-right">
          <a
            href="#/hack.near/widget/star.notification"
            className="bell-icon me-2"
          >
            <i className="bi bi-bell"></i>
            <i className="bi bi-bell-fill"></i>
          </a>

          <a href="#/hack.near/widget/GitBos" className="text-muted m-2">
            <Widget
              src="mob.near/widget/ProfileImage"
              props={{ accountId: "academy.near" }}
              className="profile-image"
            />
          </a>
        </div>
      </div>
    </div>
    <div className="m-3">
      <Widget
        src="near/widget/AccountProfile"
        props={{ accountId: "build.sputnik-dao.near" }}
      />
    </div>
    <div className="m-4">
      <h5>Explore Projects</h5>
      <Widget
        src="hack.near/widget/widget.search"
        props={{ extraButtons: starButton }}
      />
    </div>
    {limitedStarSort.map((rank, index) => {
      let thingPath = rank[0];
      let starCount = rank[1];
      return (
        <div className="m-3">
          <Widget
            src="hack.near/widget/widget.inline"
            props={{ widgetPath: thingPath, starCount }}
          />
        </div>
      );
    })}
    <br />
    <Widget src="hack.near/widget/dev.Badge" />
    <br />
  </Container>
);
