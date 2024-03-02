// const data = fetch();

const data = [
  {
    id: "1",
    lng: -73.93799209472691,
    lat: 40.70073671683767,
  },
];

const myData = [
  {
    id: "1",
    lng: -73.93799209472691,
    lat: 40.70073671683767,
  },
];

function Inspect(p) {
  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>Inspect</h1>
      <pre>{JSON.stringify(p, null, 2)}</pre>
    </div>
  );
}

function handleSave(v) {
  console.log(v);
}

function Form({ data }) {
  return (
    <div style={{ backgroundColor: "blue" }}>
      <h1>Form</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
      <button onClick={() => handleSave("hello")}>Save</button>
    </div>
  );
}

return (
  <Widget
    src="efiz.near/widget/Map.index"
    props={{
      markers: data,
      myMarkers: myData,
      onMapClick: (e) => console.log("map click", e),
      onMarkerClick: (e) => console.log("marker click", e),
      inspect: (p) => <Inspect {...p} />,
      form: (p) => <Form {...p} />,
    }}
  />
);
