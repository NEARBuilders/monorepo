const dataTemp = fetch("https://data.cityofnewyork.us/resource/3q43-55fe.json");
const data1 = dataTemp?.body;

// const dataDic = {}
const dataDic = [];
data1.forEach((item) => {
  const obj = {
    address: item.incident_address,
    id: item.unique_key,
    lng: item.longitude,
    lat: item.latitude,
    descriptor: item.descriptor,
    incident_zip: item.incident_zip,
    x_coordinate_state_plane_: item.x_coordinate_state_plane_,
    created_date: item.created_date,
    city: item.city,
    intersection_street_1: item.intersection_street_1,
    landmark: item.landmark,
    y_coordinate_state_plane_: item.y_coordinate_state_plane_,
    agency_name: item.agency_name,
    location_type: item.location_type,
    cross_street_1: item.cross_street_1,
    community_board: item.community_board,
    agency: item.agency,
    park_borough: item.park_borough,
    borough: item.borough,
    street_name: item.street_name,
    complaint_type: item.complaint_type,
    address_type: item.address_type,
    intersection_street_2: item.intersection_street_2,
  };
  dataDic.push(obj);
  // if (!dataDic[incident_address]) {
  //   dataDic[incident_address] = obj
  //   dataDic[incident_address].count = 1
  // } else {
  //   dataDic[incident_address].count++
  // }
});

const data = [
  {
    address: "2136 FREDRICK DOUGLAS BOULEVARD",
    id: "59221403",
    lng: -73.95566524448962,
    lat: 40.80400000828247,
  },
  {
    address: "219 SPENCER STREET",
    id: "2",
    lng: -73.95459320290446,
    lat: 40.6917064422596,
  },
];

const reviews = [
  {
    id: "1",
    author: "bear.near",
    description: "This bulding has rats",
    img: {
      url: "https://cloudflare-ipfs.com/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
    },
  },
  {
    id: "2",
    author: "jay.near",
    description: "This bulding has more rats",
    img: {
      url: "https://cloudflare-ipfs.com/ipfs/QmQqzMTavQgT4f4T5v6PWBp7XNKtoPmC9jvn12WPT3gkSE",
    },
  },
];
const myData = [
  {
    id: "1",
    lng: -73.93799209472691,
    lat: 40.70073671683767,
  },
];

const markers = Social.get(`*/thing/reviewMarker`, "final", {
  subscribe: "true",
});

if (!markers) {
  return <></>;
}
const dataMap = {};

Object.keys(markers).forEach((accountId) => {
  if (markers[accountId].thing && markers[accountId].thing.reviewMarker) {
    const markerObj = JSON.parse(markers[accountId].thing.reviewMarker);
    dataMap[accountId] = { accountId, ...markerObj };
  }
});

State.init({
  img: "",
  locations: [],
  description: "",
  edit: false,
  currentLocation: (dataMap[accountId] && dataMap[accountId].coordinates) || {},
});

const handleSave = () => {
  const data = {
    post: {
      main: JSON.stringify({
        description: state.description,
        img: state.img,
        id: state.currentLocation.id,
      }),
    },
    index: {
      post: JSON.stringify({
        key: state.currentLocation.id,
        value: {
          type: "md",
        },
      }),
    },
  };

  Social.set(data, {
    force: true,
    onCommit: () => {
      State.update({ edit: false, showForm: false, showInspect: false });
    },
    onCancel: () =>
      State.update({ edit: false, showForm: false, showInspect: false }),
  });
};

// IMAGEUPLOADER
const uploadFileUpdateState = (body) => {
  asyncFetch("https://ipfs.near.social/add", {
    method: "POST",
    headers: { Accept: "application/json" },
    body,
  }).then((res) => {
    const cid = res.body.cid;
    State.update({ img: { cid } });
  });
};
const filesOnChange = (files) => {
  if (files) {
    State.update({ img: { uploading: true, cid: null } });
    uploadFileUpdateState(files[0]);
  }
};

// Inspect is a local component
function Inspect(p) {
  const { Feed } = VM.require("devs.near/widget/Module.Feed");
  Feed = Feed || (() => <></>); // make sure you have this or else it can break

  return (
    <div
      style={{
        backgroundColor: "white",
        padding: "1rem",
        height: "750px",
        overflowY: "scroll",
        paddingBottom: "5rem",
      }}
    >
      <p>{p.address}</p>
      <pre>{JSON.stringify(p, null, 2)}</pre>
      <h2 style={{ fontSize: "25px", fontWeight: "bold" }}>Reviews</h2>
      <Feed
        index={{
          action: "post",
          key: state.currentLocation.id,
          options: {
            limit: 10,
            order: "desc",
            accountId: undefined,
          },
        }}
        Item={(p) => {
          console.log("__p:", p);
          const id = state.currentLocation.id;
          return <Widget src="rats.near/widget/card" props={p} />;
        }}
      />
    </div>
  );
}

function Form({ data }) {
  // const loc = fetch(
  //   'https://api.geoapify.com/v1/ipinfo?&apiKey=0485481476634b4d98f7d337d4821f52',
  // )
  // if (loc.ok) {
  //   const location = loc.body.location
  //   console.log('🚀 ~ file: myMap.jsx:38 ~ Form ~ location:', location)
  // }

  const formContainerStyle = {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  };
  const descriptionTextareaStyle = {
    width: "100%",
    height: "100px", // Adjust the height as needed
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const formTitleStyle = {
    fontSize: "24px",
    paddingTop: "1rem",
  };

  const descriptionInputStyle = {
    width: "100%",
    padding: "10px",
    margin: "10px 0",
    border: "1px solid #ccc",
    borderRadius: "5px",
  };

  const saveButtonStyle = {
    background: "#007bff",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "5px",
    cursor: "pointer",
  };

  return (
    <div style={{ backgroundColor: "white", padding: "1rem" }}>
      <h1 style={formTitleStyle}>Submit Ticket</h1>
      {/* UPLODER */}
      <div className="d-inline-block">
        {state.img ? (
          <img
            class="rounded w-100 h-100"
            style={{ objectFit: "cover" }}
            src={`https://ipfs.near.social/ipfs/${state.img.cid}`}
            alt="upload preview"
          />
        ) : (
          ""
        )}
        <Files
          multiple={false}
          accepts={["image/*"]}
          minFileSize={1}
          clickable
          className="btn btn-outline-primary"
          onChange={filesOnChange}
        >
          {state.img?.uploading ? <> Uploading </> : "Upload an Image"}
        </Files>
      </div>

      {/* FORM */}
      <textarea
        style={descriptionTextareaStyle}
        placeholder="Enter description"
        value={description}
        onChange={(e) => State.update({ description: e.target.value })}
      ></textarea>
      <button style={saveButtonStyle} onClick={handleSave}>
        Save
      </button>
      {/*
      <h1>Form</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => handleSave('hello')}>Save</button> */}
    </div>
  );
}

return (
  <Widget
    src="byalbert.near/widget/Map.index"
    props={{
      markerAsset: "https://cdn-icons-png.flaticon.com/512/47/47240.png",
      reviewData: reviews,
      markers: dataDic,
      myMarkers: myData,
      onMapClick: (e) => console.log("map click", e),
      onMarkerClick: (e) => {
        // onclick pass address & query supabase, return everything from reports  where  address = passedAddress
        // get the data and display using reviews widget
        State.update({
          currentLocation: e,
        });
        console.log("state.currentLocation.id,", e);
        // console.log('marker click___', e)
      },
      inspect: (p) => <Inspect {...p} />,
      form: (p) => <Form {...p} />,
    }}
  />
);
