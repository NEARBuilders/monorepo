const ownerId = "hack.near";
const curatedScholarships = [
  {
    category: "General",
    id: "concepts",
    icon: "bi-search",
    scholarships: [
      {
        name: "Example Scholarship",
        accountId: "techgirlnyu.near",
        org: "New York University",
        amount: "$1000",
        link: "https://www.techgirlnyu.com",
      },
      {
        accountId: "academy.near",
        name: "Example Scholarship 2",
        org: "CUNY",
        amount: "$1000",
      },
    ],
  },
  {
    category: "International",
    icon: "bi-globe",
    id: "examples",
    scholarships: [
      {
        accountId: "rc-dao.sputnik-dao.near",
        name: "Local Builder Scholarship",
        org: "Regional Communities DAO",
        amount: "$100",
      },
    ],
  },
  {
    category: "Domestic",
    id: "templates",
    icon: "bi-globe-americas",
    scholarships: [
      {
        accountId: "techgirlnyu.near",
        name: "Example Scholarship",
        org: "New York University",
        amount: "$1000",
      },
    ],
  },
  {
    category: "Academic",
    id: "metadata",
    icon: "bi-mortarboard",
    scholarships: [
      {
        accountId: "techgirlnyu.near",
        name: "Example Scholarship",
        org: "New York University",
        amount: "$1000",
      },
    ],
  },
  {
    category: "Not Academic",
    id: "non-academic",
    icon: "bi-tsunami",
    scholarships: [
      {
        accountId: "techgirlnyu.near",
        name: "Example Scholarship",
        org: "New York University",
        amount: "$1000",
      },
    ],
  },
  {
    category: "Specialties",
    id: "tools",
    icon: "bi-heart",
    scholarships: [
      {
        accountId: "techgirlnyu.near",
        name: "Example Scholarship",
        org: "New York University",
        amount: "$1000",
      },
    ],
  },
];
const filterTag = props.commonComponentTag ?? "edu";
const debug = props.debug ?? false;

const searchComponents = () => {
  return (
    <div className="mb-3">
      <div className="mb-2">
        <Widget
          src="mob.near/widget/ComponentSearch"
          props={{
            boostedTag: "edu",
            placeholder: "🔍 Search Applications",
            limit: 10,
            onChange: ({ result }) => {
              State.update({ apps: result });
            },
          }}
        />
      </div>
      {state.apps && (
        <div className="mb-2">
          {state.apps.map((app, i) => (
            <div key={i}>
              <Widget
                src="mob.near/widget/ComponentSearch.Item"
                props={{
                  link: `#/${app.widgetSrc}`,
                  accountId: app.accountId,
                  widgetName: app.widgetName,
                  onHide: () => State.update({ apps: null }),
                  extraButtons: ({ widgetPath }) => (
                    <a
                      target="_blank"
                      className="btn btn-outline-secondary"
                      href={`#/mob.near/widget/WidgetSource?src=${widgetPath}`}
                    >
                      Source
                    </a>
                  ),
                }}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const renderCategory = (categoryId) => {
  if (!categoryId || categoryId === "") return <></>;
  const item = curatedScholarships.find((i) => i.id == categoryId);
  return (
    <div class="mt-3">
      <div class="text fs-5 text-muted mb-1" id={item.id}>
        {item.category}
      </div>
      <div class="border border-2 mb-4 rounded"></div>
      <div class="container">
        <div className="row ">
          {item.scholarships.map((scholarship, i) => (
            <div class="mb-3">
              <Widget
                key={i}
                src="hack.near/widget/scholarship.card"
                props={{
                  accountId: scholarship.accountId,
                  scholarshipName: scholarship.name,
                  scholarshipOrg: scholarship.org,
                  scholarshipAmt: scholarship.amount,
                  scholarshipUrl: scholarship.link,
                  widgetPath: `${scholarship.accountId}/widget/${scholarship.widgetName}`,
                  expanded: false,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
State.init({
  tab: "home",
  id: "",
});

const renderHome = () => {
  return (
    <>
      {searchComponents()}
      <div class="mt-2">
        <h4>Resources</h4>
        <p class="text text-muted ">
          Test your knowledge and skills to earn an official builder badge by
          passing various levels of quizzes and solving fun code puzzles.
        </p>
        <div className="mb-3">
          {curatedScholarships && (
            <div className="mb-3 m-3">
              {curatedScholarships.map((cat, i) => renderCategory(cat.id))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

const onSelect = (selection) => {
  State.update({ tab: selection.tab, id: selection.id ? selection.id : "" });
};

const renderContent = {
  home: renderHome(),
  searchComponents: searchComponents(),
  category: renderCategory(state.id),
}[state.tab];

return (
  <>
    <div class="row">
      <div class="col-md-3">
        <Widget
          src={`hack.near/widget/scholarships.menu`}
          props={{
            tab: state.tab,
            onSelect,
            navItems: curatedScholarships.map((i) => ({
              category: i.category,
              icon: i.icon,
              id: i.id,
            })),
          }}
        />
        <hr className="border-2" />
      </div>
      <div class="col-md-9">
        <div className="d-flex flex-wrap justify-content-between mb-3">
          <div className="m-1">
            <h2>
              <b>TechGirl.NYU Scholarships</b>
            </h2>
          </div>
          <div className="m-1">
            <a
              href={`#/near/widget/ProfilePage?accountId=every.near`}
              class="text-muted"
            >
              <Widget
                src="mob.near/widget/Profile"
                props={{ accountId: "build.sputnik-dao.near" }}
              />
            </a>
          </div>
        </div>
        <p class="text text-muted">
          Learn how to build on the blockchain operating system together!
        </p>
        {renderContent}
      </div>
    </div>
  </>
);
