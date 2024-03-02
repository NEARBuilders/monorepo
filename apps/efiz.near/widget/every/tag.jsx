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
    name: props.name ?? "",
  });
}

const setTags = (tags) => {
  tags = tags.map((o) => {
    o.name = normalizeTag(o.name);
    return o;
  });
  State.update({ tags });
  if (props.setTagsObject) {
    props.setTagsObject(
      Object.assign(
        {},
        state.originalTags,
        Object.fromEntries(tags.map((tag) => [tag.name, ""]))
      )
    );
  }
};

const onChangeName = (name) => {
  State.update({
    name,
  });
};

const filteredTags = state.allTags.filter((tag) =>
  tag.name.includes(state.name)
);

const total_tags = state.allTags.length;

const filtered_tags = filteredTags.length;

const Container = styled.div`
  margin: 1rem;
  font-family: Arial, sans-serif;
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2rem;
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 5px;
`;

const Input = styled.input`
  flex-grow: 1;
  margin-right: 1rem;
  padding: 0.5rem;
  border: none;
`;

const Count = styled.span`
  background-color: #f0f0f0;
  padding: 0.5rem;
  border-radius: 5px;
`;

const TagContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const TagName = styled.span`
  font-weight: bold;
`;

return (
  <Container>
    <InputContainer>
      <Input
        placeholder="search..."
        type="text"
        value={state.name}
        onChange={(e) => onChangeName(e.target.value)}
      />
      <Count>{state.name ? filtered_tags : total_tags}</Count>
    </InputContainer>
    {filteredTags?.map((tag, j) => (
      <TagContainer>
        <TagName>{tag.name}</TagName>
        <p>{tag.count}</p>
      </TagContainer>
    ))}
  </Container>
);
// add filter by DAOs with profiles
