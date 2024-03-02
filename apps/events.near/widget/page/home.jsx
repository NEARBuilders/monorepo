const data = Storage.get("events-app-creator");
return (
  <>
    <h1>welcome to the app creator</h1>
    <p>what type of app would you like to create?</p>
    <p>data: {JSON.stringify(data)}</p>
  </>
);
