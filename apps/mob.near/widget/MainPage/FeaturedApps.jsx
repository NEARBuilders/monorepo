const ImgWrapper = styled.div`
  height: 14em;
  aspect-ratio: 1 / 1;
`;

const featuredApps = [
  "zavodil.near/widget/social-avatar-editor",
  "mob.near/widget/MooClicker",
  "zavodil.near/widget/hot-or-bot",
  "duocelot.near/widget/AddImage_gpux",
];

const keys = featuredApps.map((k) => `${k}/metadata`);
const authors = keys.map((key) => key.split("/")[0]);

const data = Social.getr(keys, "final");

if (data === null) {
  return "";
}

const apps = keys.map((key) => {
  let d = data;
  key.split("/").forEach((k) => {
    d = d[k];
  });
  return d;
});

return (
  <div id="featuredApps" className="carousel slide" data-bs-ride="carousel">
    <div className="carousel-indicators">
      {apps.map((app, i) => (
        <button
          key={i}
          type="button"
          data-bs-target="#featuredApps"
          data-bs-slide-to={i}
          className={i === 0 ? "active" : ""}
          aria-current={i === 0}
          aria-label={app.name}
        ></button>
      ))}
    </div>
    <div
      className="carousel-inner rounded-4"
      style={{
        background: "rgb(53,120,255)",
        backgroundImage:
          "linear-gradient(132deg, rgba(53,120,255,1) 0%, rgba(175,117,189,1) 100%)",
      }}
    >
      {apps.map((app, i) => (
        <div key={i} className={`carousel-item ${i === 0 ? "active" : ""}`}>
          <div
            className="d-flex justify-content-around flex-wrap flex-md-nowrap w-100"
            style={{ padding: "4em", gap: "4em" }}
          >
            <div className="text-white flex-grow-1">
              <p>
                <span className="badge bg-white bg-opacity-10 rounded-pill">
                  Featured App
                </span>
              </p>
              <h2>{app.name}</h2>
              <p>{app.description}</p>
              <p>
                <Widget
                  src="mob.near/widget/ProfileLine"
                  props={{
                    link: false,
                    accountId: authors[i],
                    hideAccountId: true,
                  }}
                />
              </p>
              <a
                className="btn btn-dark rounded-3"
                href={`#/${featuredApps[i]}`}
              >
                Launch
              </a>
            </div>
            <ImgWrapper>
              <Widget
                src="mob.near/widget/Image"
                props={{
                  image: app.image,
                  alt: app.name,
                  className: "w-100 h-100 rounded-4",
                  fallbackUrl:
                    "https://ipfs.near.social/ipfs/bafkreido7gsk4dlb63z3s5yirkkgrjs2nmyar5bxyet66chakt2h5jve6e",
                }}
              />
            </ImgWrapper>
          </div>
        </div>
      ))}
    </div>
  </div>
);
