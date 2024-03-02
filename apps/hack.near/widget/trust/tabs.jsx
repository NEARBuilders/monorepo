const accountId = props.accountId ?? context.accountId;
const tab = props.tab === "trusting" ? props.tab : "trusted";

return (
  <div>
    <ul className="nav nav-pills nav-fill mb-4" role="tablist">
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/trust.page?accountId=${accountId}&tab=trusted`}
          className={`btn nav-link ${tab === "trusted" ? "active" : ""}`}
          role="tab"
        >
          Trusted By
        </a>
      </li>
      <li className="nav-item" role="presentation">
        <a
          href={`#/hack.near/widget/trust.page?accountId=${accountId}&tab=trusting`}
          className={`btn nav-link ${tab === "trusting" ? "active" : ""}`}
          role="tab"
        >
          Trusting
        </a>
      </li>
    </ul>
    <div className="tab-content">
      <div className="tab-pane fade in show active" role="tabpanel">
        <Widget
          src={
            tab === "trusted"
              ? "hack.near/widget/trusted.list"
              : "hack.near/widget/trusting.list"
          }
          props={{ accountId }}
        />
      </div>
    </div>
  </div>
);
