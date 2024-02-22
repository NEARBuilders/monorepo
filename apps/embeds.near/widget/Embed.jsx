const Wrapper = styled.div`
  border-radius: 0.5em;
  width: 100%;
  overflow: hidden;
  border: 1px solid #eee;
  white-space: normal;
  margin-top: 12px;
`;

const accountId = context.accountId;

// Default Embeds
const EmbedMap = new Map([
  [
    "mob.near/widget/MainPage.N.Post.Page",
    "mob.near/widget/MainPage.N.Post.Embed",
  ],
  [
    "mob.near/widget/MainPage.N.Post.Embed",
    "mob.near/widget/MainPage.N.Post.Embed",
  ],
]);

if (accountId) {
  const installedEmbeds = JSON.parse(
    Social.get(`${accountId}/settings/every/embed`, "final") || "null"
  );

  if (installedEmbeds) {
    installedEmbeds.forEach((embed) => {
      EmbedMap.set(embed.widgetSrc, embed.embedSrc);
    });
  }
}

const href = props.href;

const parseUrl = (url) => {
  if (typeof url !== "string") {
    return null;
  }
  if (url.startsWith("/")) {
    url = `https://near.social${url}`;
  }
  try {
    return new URL(url);
  } catch {
    return null;
  }
};

const parsed = useMemo(() => {
  const url = parseUrl(href);
  if (!url) {
    return null;
  }
  return {
    widgetSrc: url.pathname.substring(1),
    props: Object.fromEntries([...url.searchParams.entries()]),
  };
}, [href]);

function filterByWidgetSrc(obj, widgetSrcValue) {
  let result = [];

  function recurse(currentObj) {
    if (typeof currentObj === "object" && currentObj !== null) {
      if (
        currentObj.metadata &&
        currentObj.metadata.widgetSrc === widgetSrcValue
      ) {
        result.push(currentObj);
      }
      Object.values(currentObj).forEach((value) => recurse(value));
    }
  }

  recurse(obj);
  return result;
}

if (!parsed || !EmbedMap.has(parsed.widgetSrc)) {
  return (
    <Wrapper>
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "200px" }}
      >
        <div className="text-center">
          <p>You do not have a plugin installed to render this embedding.</p>
          <Link
            to={`/embeds.near/widget/Plugin.Index?type=embed&widgetSrc=${parsed.widgetSrc}`}
            className="btn btn-primary mb-3"
          >
            <i className="bi bi-plug" /> Install one from the marketplace
            &#8594;
          </Link>
          <div>
            <span>
              {`or `}
              <a href={href} target="_blank" rel="noopener noreferrer">
                click here
              </a>
              {` to view`}
            </span>
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

const widgetSrc = EmbedMap.get(parsed.widgetSrc);

return (
  <Wrapper>
    <Widget loading="" src={widgetSrc} props={parsed.props} />
  </Wrapper>
);
