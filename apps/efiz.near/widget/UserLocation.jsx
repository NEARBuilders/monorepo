const data = fetch(
  "https://api.geoapify.com/v1/ipinfo?&apiKey=0485481476634b4d98f7d337d4821f52"
);
if (data.ok) {
  const location = data.body.location;
  return (
    <Widget
      src="efiz.near/widget/Mapbox"
      props={{
        center: [location.longitude, location.latitude],
        markers: [{ lng: location.longitude, lat: location.latitude }],
      }}
    />
  );
} else {
  return <></>;
}
