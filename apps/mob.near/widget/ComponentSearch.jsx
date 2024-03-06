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
  const YourWidgetScore = 0.5;
  const MaxScore = YourWidgetScore + MaxSingleScore * 4;

  const computeScore = (s) => {
    s = s.toLowerCase();
    return (
      terms
        .map((term) => {
          const pos = s.indexOf(term);
          return (
            (pos >= 0 ? Math.exp(-pos) : 0) *
            (term.length / Math.max(1, s.length))
          );
        })
        .reduce((s, v) => s + v, 0) / terms.length
    );
  };

  Object.entries(keys).forEach(([accountId, data]) => {
    const yourWidgetScore =
      accountId === context.accountId ? YourWidgetScore : 0;
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
        (yourWidgetScore +
          widgetSrcScore +
          componentIdScore +
          nameScore +
          tagsScore) /
        MaxScore;
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
    result,
  });

  if (props.onChange) {
    props.onChange({ result });
  }
};

if (props.term && props.term !== state.oldTerm) {
  State.update({
    oldTerm: props.term,
  });
  if (props.term !== state.term) {
    clearTimeout(state.debounce);
    const term = props.term;
    State.update({
      term,
      debounce: setTimeout(() => computeResults(term), 350),
    });
  }
}

return (
  <>
    <div className="input-group">
      <input
        type="text"
        className={`form-control ${state.term ? "border-end-0" : ""}`}
        value={state.term ?? ""}
        onChange={(e) => {
          const term = e.target.value;
          clearTimeout(state.debounce);
          State.update({
            term,
            debounce: setTimeout(() => computeResults(term), 350),
          });
        }}
        placeholder={props.placeholder ?? `🔍 Search Components`}
      />

      {state.term && (
        <button
          className="btn btn-outline-secondary border border-start-0"
          type="button"
          onClick={() => {
            clearTimeout(state.debounce);
            State.update({
              term: "",
            });
            computeResults("");
          }}
        >
          <i className="bi bi-x"></i>
        </button>
      )}
    </div>
    {props.debug && <pre>{JSON.stringify(state.result, undefined, 2)}</pre>}
  </>
);
