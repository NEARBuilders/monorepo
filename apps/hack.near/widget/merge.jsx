const src = props.src;
const update = props.update;

if (!src || !update) {
  return "";
}

const [creatorId, type, name] = src.split("/");

const source = Social.get(`${src}`);
const newVersion = Social.get(`${update}`);

const handleMerge = () =>
  Social.set({
    [`${type}`]: {
      [`${name}`]: {
        "": `${newVersion}`,
      },
    },
  });

return (
  <>
    {creatorId === context.accountId && (
      <span>
        {source !== newVersion ? (
          <button
            disabled={source == newVersion}
            className="btn btn-success"
            onClick={handleMerge}
          >
            Merge
          </button>
        ) : (
          <button
            disabled={source === newVersion}
            className="btn btn-success"
            onClick={handleMerge}
          >
            Merged
          </button>
        )}
      </span>
    )}
  </>
);
