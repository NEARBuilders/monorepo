const sender = Ethers.send("eth_requestAccounts", [])[0];

if (!sender) return <Web3Connect connectLabel="Connect with Web3" />;

const accountId = props.accountId ?? context.accountId;
const className = props.className ?? "profile-image d-inline-block";
const style = props.style ?? { width: "3em", height: "3em" };
const imageStyle = props.imageStyle ?? { objectFit: "cover" };
const imageClassName = props.imageClassName ?? "rounded w-100 h-100";
const thumbnail = props.thumbnail ?? "thumbnail";

const profile = props.profile ?? Social.getr(`${sender}/profile`);

const name = profile.name || "Add Your Name";
const image = profile.image;
const title = props.title ?? `${name} @${sender}`;
const tooltip =
  props.tooltip && (props.tooltip === true ? title : props.tooltip);

const inner = (
  <div className={className} style={style}>
    <Widget
      src="mob.near/widget/Image"
      props={{
        image,
        alt: title,
        className: imageClassName,
        style: imageStyle,
        thumbnail,
        fallbackUrl:
          "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
      }}
    />
  </div>
);

return props.tooltip ? (
  <Widget
    src="mob.near/widget/Profile.OverlayTrigger"
    props={{ sender, children: inner }}
  />
) : (
  inner
);
