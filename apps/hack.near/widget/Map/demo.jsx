const data = fetch("https://data.cityofnewyork.us/resource/if26-z6xq.json");

const locations = data?.body;

const mapData = locations.map((item) => ({
  id: item.object_id,
  lng: parseFloat(item.longitude),
  lat: parseFloat(item.latitude),
}));

const markerImageUrl =
  "https://researchathon.mypinata.cloud/ipfs/Qmcppuc1eeK4vvdgpXmJkMDcpfeYdgaHXihkKbdjWQNi4B";

return (
  <div>
    <Widget
      src="efiz.near/widget/Map.index"
      props={{
        markerAsset: markerImageUrl,
        markers: mapData,
      }}
    />
  </div>
);
