const { tab, shouldShuffle } = props;

const { Feed } = VM.require("devs.near/widget/Feed") || {
  Feed: () => <></>,
};

const items = useMemo(() => {
  if (shouldShuffle) {
    return [...props.items].sort(() => Math.random() - 0.5);
  }
  return props.items;
}, [props.items, shouldShuffle]);

const sortList = [
  "Newest to Oldest",
  "Oldest to Newest",
  "Most to Least Donations",
  "Least to Most Donations",
];

const SORT_FILTERS = {
  ALL: "All",
  NEW_TO_OLD: "Newest to Oldest",
  OLD_TO_NEW: "Oldest to Newest",
  MOST_TO_LEAST_DONATIONS: "Most to Least Donations",
  LEAST_TO_MOST_DONATIONS: "Least to Most Donations",
};

const PAGE_SIZE = 9;

const featuredProjectIds = [
  "magicbuild.near",
  "${config/account}",
  "yearofchef.near",
];
const featuredProjects = useMemo(
  () =>
    props.items.filter((project) => featuredProjectIds.includes(project.id)),
  props.items
);

const [allProjects, setAllProjects] = useState(items);
const [filteredProjects, setFilteredProjects] = useState(items);
const [searchTerm, setSearchTerm] = useState("");

const searchProjects = (searchTerm) => {
  // filter projects that match the search term (just id for now)
  const filteredProjects = allProjects.filter((project) => {
    const { id } = project;
    const searchFields = [id];
    return searchFields.some((field) =>
      field.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });
  return filteredProjects;
};

const sortProjects = (sortVal) => {
  if (sortVal === SORT_FILTERS.ALL) {
    return searchApplications(searchTerm);
  } else if (sortVal === SORT_FILTERS.NEW_TO_OLD) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => b.submitted_ms - a.submitted_ms);
    return sorted;
  } else if (sortVal === SORT_FILTERS.OLD_TO_NEW) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => a.submitted_ms - b.submitted_ms);
    return sorted;
  } else if (sortVal === SORT_FILTERS.MOST_TO_LEAST_DONATIONS) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => b.total - a.total);
    return sorted;
  } else if (sortVal === SORT_FILTERS.LEAST_TO_MOST_DONATIONS) {
    const sorted = { ...allProjects };
    sorted.sort((a, b) => a.total - b.total);
    return sorted;
  }
  return filtered;
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 48px;
  padding-top: 20px;
`;

const Layout = styled.div`
  display: grid;
  gap: 31px;

  // For mobile devices (1 column)
  @media screen and (max-width: 739px) {
    grid-template-columns: repeat(1, 1fr);
  }

  // For tablet devices (2 columns)
  @media screen and (min-width: 740px) and (max-width: 1023px) {
    grid-template-columns: repeat(2, 1fr);
  }

  // For desktop devices (3 columns)
  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(
      ${!props.maxCols || props.maxCols > 2 ? "3" : "2"},
      1fr
    );
  }
`;

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100%;
`;

const Title = styled.div`
  color: #292929;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 24px;
  letter-spacing: 1.12px;
  text-transform: uppercase;
`;

const TagsWrapper = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  color: #292929;
`;

const Tag = styled.div`
  display: flex;
  padding: 8px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  border-radius: 4px;
  background: #fff;
  box-shadow: 0px -1px 0px 0px #c7c7c7 inset, 0px 0px 0px 0.5px #c7c7c7;
  border: 1px solid #c7c7c7;
  &:hover {
    background: #fef6ee;
  }
`;

const OnBottom = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`;


return (
  <Container style={{ paddingBottom: "32px" }}>
    <Feed items={items} Item={(p) => props.renderItem(p)} Layout={Layout}/>
  </Container>
);
