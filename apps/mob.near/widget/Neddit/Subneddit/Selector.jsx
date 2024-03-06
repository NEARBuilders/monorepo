const [subneddit, setSubneddit] = useState(
  !subneddit || subneddit === "all" ? "" : subneddit
);

const onSubnedditChange = (option) => {
  const subneddit = option[0].name;
  setSubneddit(option);
  props.onChange && props.onChange(subneddit);
};

const rawAllSubneddits = Social.index("subneddits", "all", {
  limit: 10000,
  order: "desc",
});

const allSubneddits = useMemo(() => {
  if (!rawAllSubneddits) {
    return [];
  }
  const counts = new Map();
  rawAllSubneddits.forEach(({ value }) => {
    const subneddit = value?.subneddit;
    if (subneddit) {
      counts.set(subneddit, (counts.get(subneddit) || 0) + 1);
    }
  });
  const allSubneddits = [...counts.entries()].map(([name, count]) => ({
    name,
    count,
  }));
  allSubneddits.sort((a, b) => b.count - a.count);
  return allSubneddits;
}, [rawAllSubneddits]);

return (
  <div>
    <Typeahead
      id={state.id}
      labelKey="name"
      onChange={onSubnedditChange}
      options={allSubneddits}
      placeholder={"Enter a subneddit, e.g. NEARCON"}
      selected={subneddit}
      positionFixed
      allowNew
    />
  </div>
);
