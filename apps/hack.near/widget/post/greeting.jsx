const greeting = props.greeting;

State.init({ name: "Victor" }); // React state

const hashtags = ["dev"];

return (
  <>
    <div class="container" />
    <h1 style={{ textAlign: "center" }}>Welcome</h1>

    <h3 style={{ textAlign: "center" }}>Say hello!</h3>
    <br />
    <br />
    <h3>
      {greeting} {state.name} 🥳
    </h3>
    <br />
    <br />

    <br></br>
    <h2 className="container">Create your post:</h2>

    <Widget
      src="efiz.near/widget/every.feed.view"
      props={{
        data: { hashtagWhitelist: hashtags, typeWhitelist: ["md"] },
      }}
    />
  </>
);
