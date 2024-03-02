const onLocate = props.onLocate;

State.init({
  location: "",
});

const findLocation = () => {
  asyncFetch(
    "https://api.geoapify.com/v1/ipinfo?&apiKey=0485481476634b4d98f7d337d4821f52"
  ).then((data) => {
    onLocate(data.body);
  });
};
findLocation();

return <></>;
