const MAP_STYLE = props.MAP_STYLE || "mapbox://styles/mapbox/outdoors-v12";
const MAP_TOKEN =
  props.MAP_TOKEN ||
  "pk.eyJ1IjoidGVqMDEiLCJhIjoiY2xqcHZ2dGpkMDB5azNsbzQ0bmMwNjRjaCJ9.FVv2zRPaLwzZMgagbI2YZw";

const center = props.center || [-74.00597, 40.71427];
const zoom = props.zoom || 10;
const onSave = props.handleSave || (() => {});
const formWidget = props.formWidget;
const inspectWidget = props.inspectWidget;

const Container = styled.div`
  display: flex;
  width: 100%;
  margin-top: var(--header-height);
  height: calc(100vh - 70px);
  align-items: stretch;
  flex-direction: column;
  overflow: auto;
  position: relative;
  z-index: 100;
`;

const Button = styled.button`
  background: #191a1a;
  border-radius: 6px;
  color: white;
  z-index: 1;
  padding: 10px 22px;
`;

const Profile = styled.div`
  position: absolute;
  right: 50px;
  top: 30px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    right: 15px;
    top: 15px;
  }
`;

const Inspect = styled.div`
  position: absolute;
  left: 50px;
  top: 30px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    right: 15px;
    top: 15px;
  }
`;

const Location = styled.div`
  position: absolute;
  bottom: 50px;
  @media (max-width: 510px) {
    padding: 6px 15px;
    bottom: 15px;
  }
`;

State.init({
  locations: [],
  edit: false,
});

const handleSave = (data) => {
  onSave && onSave(data);
  State.update({ edit: false, showForm: false, showInspect: false });
};

function DownIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 48 48"
    >
      <mask id="ipSDownOne0">
        <path
          fill="#fff"
          stroke="#fff"
          strokeLinejoin="round"
          strokeWidth="4"
          d="M36 19L24 31L12 19h24Z"
        />
      </mask>
      <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#ipSDownOne0)" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M13 9a1 1 0 1 1-2 0a1 1 0 0 1 2 0Z" />
        <path d="M17.5 9.5c0 3.038-2 6.5-5.5 10.5c-3.5-4-5.5-7.462-5.5-10.5a5.5 5.5 0 1 1 11 0Z" />
      </g>
    </svg>
  );
}

return (
  <Container>
    {/* Absolute Positioning */}
    {
      <Profile>
        <Button
          onClick={() => {
            State.update({ showForm: !state.showForm });
          }}
        >
          {`${state.showForm ? "Hide" : "Show"} Form`}
          <DownIcon />
        </Button>
      </Profile>
    }
    {state.showForm && (
      <Widget
        src={"efiz.near/widget/Map.Form"}
        props={{
          data: state.focusedMarker || {},
          children: props.form,
          handleSave,
        }}
      />
    )}

    {state.showInspect && (
      <Widget
        src={"efiz.near/widget/Map.Inspect"}
        props={{
          focusedMarker: state.focusedMarker,
          children: props.inspect,
        }}
      />
    )}

    {/* Absolute Positioning */}
    {accountId && (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Location>
          <Button
            onClick={
              state.edit
                ? () => handleSave()
                : () => State.update({ edit: !state.edit })
            }
          >
            {`${!state.edit ? "Edit" : "Save"}`}
            <LocationIcon />
          </Button>
          {state.edit && (
            <Button
              onClick={() => State.update({ edit: false, showForm: false })}
            >
              Cancel
            </Button>
          )}
        </Location>
      </div>
    )}

    <Widget
      src={"efiz.near/widget/Map.Mapbox"}
      props={{
        API_URL,
        accessToken: MAP_TOKEN,
        styleUrl: MAP_STYLE,
        center,
        zoom,
        markerAsset: props.markerAsset,
        myMarkerAsset: props.myMarkerAsset,
        markers: props.markers, // array of long, lat, id
        myMarkers: props.myMarkers,
        edit: state.edit,
        onMapClick: (e) => {
          State.update({ currentLocation: e.coordinates, showInspect: false });
          props.onMapClick && props.onMapClick(e);
        },
        onMarkerClick: (e) => {
          State.update({ focusedMarker: e, showInspect: true });
          props.onMarkerClick && props.onMarkerClick(e);
        },
      }}
    />
  </Container>
);
