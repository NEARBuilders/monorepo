const navItems = props.navItems;
if (!navItems) return "Must define nav items";
const ownerId = "hack.near";

return (
  <div className="d-flex flex-column">
    <h3 className="fs-4 text-nowrap d-flex flex-row align-items-center">
      <span>Discover</span>
    </h3>
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/Common.Component.Library?tab=home`}
      onClick={() => props.onSelect({ tab: "home", id: "" })}
    >
      <i className="bi-house" />
      <span>Home</span>
    </a>
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/Common.Component.Library?tab=search`}
      onClick={() => props.onSelect({ tab: "search", id: "" })}
    >
      <i className="bi-search" />
      <span>Search</span>
    </a>
    <hr className="border-2" />
    <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
      <span>Libraries</span>
    </h4>
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/Common.Component.Library?tab=dao`}
      onClick={() => props.onSelect({ tab: "dao", id: "" })}
    >
      <i className="bi-rocket-takeoff-fill" />
      <span>DAO</span>
    </a>
    <hr className="border-2" />
    <h4 className="fs-4 text-nowrap d-flex flex-row align-items-center">
      <span>Components</span>
    </h4>
    {navItems.map((item) => {
      console.log(item);
      return (
        <a
          className={`nav-link mt-2 rounded-3${
            item.id === props.tab ? "bg-secondary" : ""
          }`}
          href={`https://near.social/#/${ownerId}/widget/Common.Component.Library?tab=${item.type}&id=${item.id}`}
          onClick={() => props.onSelect({ tab: item.type, id: item.id })}
        >
          {" "}
          <i className={item.icon} /> <span>{item.name}</span>{" "}
        </a>
      );
    })}
  </div>
);
