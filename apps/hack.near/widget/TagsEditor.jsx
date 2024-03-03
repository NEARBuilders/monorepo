const tagsPattern = props.tagsPattern ?? "*/profile/tags/*";
const placeholder = props.placeholder ?? "Tags";
const initialTagsObject = props.initialTagsObject || {};

const tagsObject = Social.keys(tagsPattern, "final");

if (tagsObject === null) {
  return "Loading";
}

const normalizeTag = (tag) =>
  tag
    .replaceAll(/[- \.]/g, "_")
    .replaceAll(/[^\w]+/g, "")
    .replaceAll(/_+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "")
    .toLowerCase()
    .trim("-");

const tagsCount = {};

const processTagsObject = (obj) => {
  Object.entries(obj).forEach((kv) => {
    if (typeof kv[1] === "object") {
      processTagsObject(kv[1]);
    } else {
      const tag = normalizeTag(kv[0]);
      tagsCount[tag] = (tagsCount[tag] || 0) + 1;
    }
  });
};

const getTags = () => {
  processTagsObject(tagsObject);
  const tags = Object.entries(tagsCount);
  tags.sort((a, b) => b[1] - a[1]);
  return tags.map((t) => ({
    name: t[0],
    count: t[1],
  }));
};

if (!state.allTags) {
  initState({
    allTags: getTags(),
    tags: Object.keys(initialTagsObject).map((tag) => ({
      name: normalizeTag(tag),
    })),
    originalTags: Object.fromEntries(
      Object.keys(initialTagsObject).map((tag) => [tag, null])
    ),
    id: `tags-selector-${Date.now()}`,
  });
}

const setTags = (tags) => {
  tags = tags.map((o) => {
    o.name = normalizeTag(o.name);
    return o;
  });

  const newTagsObject = Object.fromEntries(tags.map((tag) => [tag.name, ""]));
  const updatedTagsObject = {
    ...state.originalTags,
    ...newTagsObject,
  };

  State.update({ tags: tags });
  if (props.setTagsObject) {
    props.setTagsObject(updatedTagsObject);
  }
};

return (
  <>
    <Typeahead
      id={state.id}
      multiple
      labelKey="name"
      onChange={setTags}
      options={state.allTags}
      placeholder={placeholder}
      selected={state.tags}
      positionFixed
      allowNew
    />
    {props.debug && (
      <div>
        Debugging tags:
        <pre>{JSON.stringify(state.tags)}</pre>
      </div>
    )}
  </>
);
