const store = Storage.get("events-app-creator");

console.log("store", store);
const launch = () => {
  console.log(launch, JSON.stringify(store));
};

return (
  <div className="text-center mt-3">
    <button className="btn btn-primary" className={launch}>
      Launch 🚀
    </button>
  </div>
);
