const widgets = Social.keys("*/widget/*", "final", {
  return_type: "History",
});

if (!widgets) {
  return "Loading...";
}

const recentWidgets = [];

for (let i = 0; i < widgets.length; ++i) {
  const [accountId, type, name] = widgets[i].split("/");
  const array = [accountId][type][name];

  console.log(array);

  const lastItem = array[array.length - 1];

  console.log(lastItem);

  if (lastItem > 95428279) {
    recentWidgets.push(
      <div>
        <li>
          <a href={`/${widgets[i]}`}>{widgets[i]}</a>
        </li>
      </div>
    );
  }
}

console.log(recentWidgets);

return (
  <div className="row row-cols-1 row-cols-md-2 row-cols-xl-3 row-cols-xll-4 g-2">
    {recentWidgets}
  </div>
);
