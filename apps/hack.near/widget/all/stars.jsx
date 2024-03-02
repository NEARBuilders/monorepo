const accountId = props.accountId ?? "hack.near";
const data = Social.keys("*/index/star", "final");

console.log("Data:", data);

if (!data) {
  return "Loading...";
}

const parsedData = JSON.parse(data);
const accounts = Object.entries(parsedData || {});

const allStars = Social.get(`${accountId}/index/star`);
console.log("All Stars:", allStars);

let starredWidgets;
try {
  starredWidgets = JSON.parse(allStars);
} catch (error) {
  console.error("PARSING ERROR", error);
  starredWidgets = [];
}

console.log("Stars:", starredWidgets);

const allStarred = {};

for (let i = 0; i < accounts.length; ++i) {
  const accountId = accounts[i][0];
  const userStars = Social.get(`${accountId}/index/star`, "final");

  console.log(`Fetching stars for accountId: ${accountId}`);
  console.log("User Stars:", userStars);

  if (!userStars) {
    console.error(`No stars found for accountId: ${accountId}`);
    continue; // Skip this iteration if no stars were found for this account
  }

  for (let userStar of userStars) {
    if (starredWidgets.includes(userStar[0])) {
      if (allStarred.hasOwnProperty(userStar[0])) {
        allStarred[userStar[0]].stars++;
      } else {
        allStarred[userStar[0]] = {
          accountId: accountId,
          name: userStar[0],
          stars: 1,
        };
      }
    }
  }
}

const sortedStarred = Object.values(allStarred).sort(
  (a, b) => b.stars - a.stars
);
console.log("All Starred:", sortedStarred);

return (
  <div>
    {sortedStarred.map((widget, index) => (
      <div key={index}>
        <div>Widget: {widget.name}</div>
        <div>Total Stars: {widget.stars}</div>
      </div>
    ))}
  </div>
);
