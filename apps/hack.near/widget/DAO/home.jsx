const widgetProvider = "frichard5.near";
const tab = props.tab || "overview";
const proposal_id =
  props.proposal_id &&
  !isNaN(Number(props.proposal_id)) &&
  Number(props.proposal_id);

State.init({
  selectedDao: props.selected_dao ?? "rc-dao.sputnik-dao.near",
});
// Style
const avenirFontFamily = fetch(
  "https://fonts.cdnfonts.com/css/avenir-lt-std"
).body;
const theme = {
  main: "#FFD50D",
  secondaryPink: "#F29BC0",
  secondaryBlue: "#4498E0",
};

const DashboardContainer = styled.div`
  * {
    font-family: 'avenir lt std';    
  }
  h2 {
    font-weight: 600;
    margin-left: 0px;
    font-size: 26px;
  }
  padding: 28px;
  ${avenirFontFamily}
  button {
    margin-left: 10px;
    color: black;
    background:rgba(118, 0, 255, 0.5);
    border: none;
    &:hover {
      background:rgba(118, 0, 255, 1);
      color: black;
    }
    &:active {
        background-color:rgba(118, 0, 255, 0.8);
        color: black !important;
    }
  }
  *.rejected {
      color:#ff5e03;
  }
  *.approved {
      color:#13a36e;
  }
  svg {
    &.approved-icon {
      height: 20px;
      fill:#13a36e;
    }
    &.rejected-icon {
      height: 20px;
      fill: #ff5e03;
    }
  }
 
  *::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  *::-webkit-scrollbar-track {
    background: transparent;
  }

  *::-webkit-scrollbar-thumb {
    background: rgba(81, 81, 81, 0.3);
    border-radius: 3px;
  }

  
  *::-webkit-scrollbar-thumb:hover {
    background: rgba(81, 81, 81, 0.5);;
  }

  *::-webkit-scrollbar-corner {
    background-color: transparent;
  }
`;

const Banner = <Widget src={`${widgetProvider}/widget/SputnikBOS.Banner`} />;

const DashBoard = (
  <Widget
    src={`${widgetProvider}/widget/NDC-Dashboard`}
    props={{
      widgetProvider,
      tab,
      proposal_id,
      selectedDao: state.selectedDao,
      parent: "SputnikBOS.Home",
    }}
  />
);

const Search = (
  <Widget
    src={`${widgetProvider}/widget/SputnikBOS.Search`}
    props={{
      onSearch: (dao) => {
        State.update({
          selectedDao: dao,
        });
      },
      selectedDao: state.selectedDao,
      widgetProvider,
    }}
  />
);

return (
  <DashboardContainer theme={theme}>
    {Banner}
    {Search}
    {state.selectedDao && DashBoard}
  </DashboardContainer>
);
