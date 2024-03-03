const allMetadata =
  Social.get(
    ["*/widget/*/metadata/name", "*/widget/*/metadata/tags/*"],
    "final"
  ) || {};
const keys = Social.keys(["*/widget/*"], "final", { values_only: true }) || {};

const requiredTag = props.filterTag;
const boostedTag = props.boostedTag;
const inputTerm = props.term;

const computeResults = (term) => {
  const terms = (term || "")
    .toLowerCase()
    .split(/[^\w._\/-]/)
    .filter((s) => !!s.trim());

  const matchedWidgets = [];

  const limit = props.limit ?? 30;

  const MaxSingleScore = 1;
  const MaxScore = MaxSingleScore * 4;

  const computeScore = (s) => {
    s = s.toLowerCase();
    return (
      terms
        .map((term) => {
          const pos = s.indexOf(term);
          return pos >= 0 ? Math.exp(-pos) : 0;
        })
        .reduce((s, v) => s + v, 0) / terms.length
    );
  };

  Object.entries(keys).forEach(([accountId, data]) => {
    Object.keys(data.widget).forEach((componentId) => {
      const widgetSrc = `${accountId}/widget/${componentId}`;
      const widgetSrcScore = computeScore(widgetSrc);
      const componentIdScore = computeScore(componentId);
      const metadata = allMetadata[accountId].widget[componentId].metadata;
      const name = metadata.name || componentId;
      if (requiredTag && !(metadata.tags && requiredTag in metadata.tags)) {
        return;
      }
      const boosted =
        boostedTag && metadata.tags && boostedTag in metadata.tags;
      const tags = Object.keys(metadata.tags || {}).slice(0, 10);
      const nameScore = computeScore(name);
      const tagsScore = Math.min(
        MaxSingleScore,
        tags.map(computeScore).reduce((s, v) => s + v, 0)
      );
      const score =
        (widgetSrcScore + componentIdScore + nameScore + tagsScore) / MaxScore;
      if (score > 0) {
        matchedWidgets.push({
          score,
          accountId,
          widgetName: componentId,
          widgetSrc,
          name,
          tags,
          boosted,
        });
      }
    });
  });

  matchedWidgets.sort(
    (a, b) => (b.boosted ? 2 : 0) + b.score - (a.boosted ? 2 : 0) - a.score
  );
  const result = matchedWidgets.slice(0, limit);

  State.update({
    term,
    result,
  });

  if (props.onChange) {
    props.onChange({ term, result });
  }
};

if (props.term && props.term !== state.oldTerm) {
  State.update({
    oldTerm: props.term,
  });
  if (props.term !== state.term) {
    computeResults(props.term);
  }
}

return (
  <>
    <div className="input-group">
      <input
        type="text"
        className={`form-control ${state.term ? "border-end-0" : ""}`}
        value={state.term ?? ""}
        onChange={(e) => computeResults(e.target.value)}
        placeholder={props.placeholder ?? `🔍 Explore Components`}
      />

      {state.term && (
        <button
          className="btn btn-outline-secondary border border-start-0"
          type="button"
          onClick={() => computeResults("")}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
    {props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </>
);
