const accountId = context.accountId;
const path = props.path || "mob.near/widget/Explorer";
const [creatorId, namespace, thingId] = path.split("/");

const tags = Social.getr(`*/graph/context/${path}/tags/**`, "final");

return (
  <div className="m-2">
    <div className="mb-2 card">
      <div className="card-body">
        <div className="text-truncate mb-3 row">
          <div className="col-8 m-1 ">
            <Widget
              src="hack.near/widget/thing.block"
              props={{ creatorId, namespace, thingId }}
            />
          </div>
          <div className="col-3 m-2 mt-3 ">
            <Widget
              src="hack.near/widget/star.button"
              props={{
                path: `${creatorId}/${namespace}/${thingId}`,
              }}
            />
          </div>
        </div>
        <Widget
          src="hack.near/widget/tags"
          props={{
            path,
          }}
        />
      </div>
    </div>
  </div>
);
