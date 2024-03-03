const accountId = props.accountId || context.accountId;
if (!accountId) {
  return "Please connect your NEAR account :)";
}

const tag = props.tag ?? "*";
const creatorId = props.creatorId ?? "*";
const namespace = props.namespace ?? "*";
const thingId = props.thingId ?? "*";

const path = props.path || `*/*/*`;

const pattern = `*/graph/context/${creatorId}/${namespace}/${thingId}/tags/${tag}`;
const tagsObject = Social.get(pattern, "final");

if (!tagsObject) {
  return "Loading...";
}

State.init({
  showEditor: false,
  tags: tagsObject,
});

const tagClass = "bg-primary";
const badgeBtnClass = "text-white btn p-0 lh-1 m-1";

const tagsCount = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (kv[1] === null) {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) - 1;
    } else if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = kv[0];
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => {
    return {
      name: t[0],
      count: t[1],
      title: t[1] + (t[1] > 1 ? " times" : " time"),
    };
  });
};

const publicTags = getTags();
const data = Social.keys(
  `*/graph/context/${creatorId}/${namespace}/${thingId}/tags/${tag}`,
  "final"
);

const pageUrl = props.url ?? "/hack.near/widget/every.context";

return (
  <>
    {publicTags &&
      publicTags.map((tag) => (
        <a
          href={`${pageUrl}?tag=${tag.name}`}
          className={badgeBtnClass}
          key={tag.name}
        >
          <span
            className={`badge ${tagClass} position-relative`}
            title={tag.title}
            style={
              tag.count > 1
                ? {
                    marginRight: "0.9em",
                    paddingRight: "0.85em",
                  }
                : { marginRight: "0.25em" }
            }
          >
            #{tag.name}
            {tag.count > 1 && (
              <span
                className={`badge translate-middle rounded-pill bg-danger position-absolute top-50 start-100`}
              >
                {tag.count}
              </span>
            )}
          </span>
        </a>
      ))}{" "}
  </>
);
