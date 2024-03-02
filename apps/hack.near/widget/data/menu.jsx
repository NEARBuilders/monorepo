const navItems = props.navItems;
if (!navItems) return "must define nav items";
const ownerId = "hack.near";
const daoId = props.daoId ?? "every.near";

return (
  <div className="d-flex flex-column">
    <a href="#/efiz.near/widget/every">
      <Widget src="mob.near/widget/ProfileImage" props={{ accountId: daoId }} />
    </a>
    <br />
    <a
      className="nav-link mt-2"
      href={`https://near.social/#/${ownerId}/widget/data.library?tab=home`}
      onClick={() => props.onSelect({ tab: "home", id: "" })}
    >
      <i className="bi-house" />
      <span>Home</span>
    </a>
    <hr className="border-2" />
    {navItems.map((item) => {
      console.log(item);
      return (
        <a
          className={`nav-link mt-2 rounded-3${
            item.id === props.tab ? "bg-secondary" : ""
          }`}
          href={`https://near.social/#/${ownerId}/widget/data.library?tab=category&id=${item.id}`}
          onClick={() => props.onSelect({ tab: "category", id: item.id })}
        >
          {" "}
          <i className={item.icon} /> <span>{item.category}</span>{" "}
        </a>
      );
    })}
  </div>
);
