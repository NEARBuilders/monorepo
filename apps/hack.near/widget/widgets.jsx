const data = Social.get("*/graph/star/**", "final");

const starCountsByWidget = {};

Object.keys(data).forEach((user) => {
  const userData = data[user];
  const widgetData = userData?.graph?.star;

  if (widgetData) {
    Object.keys(widgetData).forEach((widgetCreator) => {
      const widgetList = widgetData[widgetCreator]?.widget;

      if (widgetList) {
        Object.keys(widgetList).forEach((widgetName) => {
          const widgetPath = `${widgetCreator}/widget/${widgetName}`;

          if (!starCountsByWidget[widgetPath]) {
            starCountsByWidget[widgetPath] = 0;
          }

          if (typeof widgetList[widgetName] !== "undefined") {
            starCountsByWidget[widgetPath]++;
          }
        });
      }
    });
  }
});

const rankedWidgets = Object.entries(starCountsByWidget)
  .filter(([widgetName, totalStars]) => typeof totalStars !== "undefined")
  .sort((a, b) => b[1] - a[1]);

return (
  <div>
    <h3>Top Widgets</h3>
    <ol>
      {rankedWidgets.map(([widgetPath, totalStars], index) => {
        const [widgetCreator, _, widgetName] = widgetPath.split("/");
        return (
          <li key={widgetPath}>
            <a href={`/near/widget/ComponentDetailsPage?src=${widgetPath}`}>
              {widgetName}
            </a>{" "}
            ({totalStars} stars) by{" "}
            <Widget
              src="mob.near/widget/N.ProfileLine"
              props={{ accountId: widgetCreator, hideAccountId: true }}
            />
          </li>
        );
      })}
    </ol>
  </div>
);
