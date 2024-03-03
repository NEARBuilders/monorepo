const initialSunset = 1709888888 * 1000;
const accountId = props.accountId ?? context.accountId ?? "hack.near";
const gameId = props.gameId ?? "evaporation";
const appId = props.appId ?? "test";
const clicks = Social.index(appId, `${accountId}-${gameId}`, {
  limit: 100,
  order: "desc",
});

const totalAddedTime = (clicks ? Object.keys(clicks).length : 0) * 5 * 60000;

const addMoreTime = () => {
  Social.set(
    {
      index: {
        [appId]: JSON.stringify({
          key: `${accountId}-${gameId}`,
          value: { type: "click" },
        }),
      },
    },
    {
      force: true,
    }
  );
};

const now = new Date();
const sunset = initialSunset + totalAddedTime;
const evaporated = now > sunset;

const remainingTime = sunset + totalAddedTime - now;
const remainingMinutes = Math.max(Math.floor(remainingTime / (1000 * 60)), 0);

return (
  <div>
    <p>{totalAddedTime / (1000 * 60)} minutes added</p>
    {!evaporated ? (
      <>
        <p>{remainingMinutes} minutes left...</p>
        <button onClick={addMoreTime} className="btn btn-primary">
          add time
        </button>
      </>
    ) : (
      <p>The sun has set... 🌇</p>
    )}
    <div className="mt-3">
      <p>{clicks && Object.keys(clicks).length} clicks</p>
    </div>
  </div>
);
