const creatorId = props.creatorId ?? context.accountId;
const namespace = props.namespace ?? "widget";
const thingId = props.thingId ?? "widgets.rank";

const className = props.className ?? "thing-image d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? {
  objectFit: "cover",
  borderRadius: "0.6em",
};
const imageClassName = props.imageClassName ?? "w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const thing =
  props.thing ?? Social.getr(`${creatorId}/${namespace}/${thingId}`);

const name = thing.metadata.name || "Something";
const image = thing.metadata.image;
const title = props.title ?? `${name}`;
const fallbackUrl =
  "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm";

return (
  <>
    <div className={className} style={style} key={JSON.stringify(image)}>
      <Widget
        loading={
          <div
            className={`d-inline-block ${imageClassName}`}
            style={imgWrapperStyle}
          />
        }
        src="mob.near/widget/Image"
        props={{
          image,
          alt: title,
          className: imageClassName,
          style: imageStyle,
          thumbnail,
          fallbackUrl,
        }}
      />
    </div>
  </>
);
