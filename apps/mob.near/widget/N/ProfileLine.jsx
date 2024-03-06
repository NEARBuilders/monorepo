const accountId = props.accountId;
const link = props.link ?? true;
const hideAccountId = props.hideAccountId;
const hideName = props.hideName;
const hideImage = props.hideImage;
const hideCheckmark = props.hideCheckmark;

const profile = props.profile ?? Social.getr(`${accountId}/profile`);
const fast = !!props.fast || (!props.profile && accountId);

const name = profile.name ?? accountId;
const title = props.title ?? `${name} @${accountId}`;
const fullTooltip = props.tooltip === true;
const tooltip = props.tooltip && (fullTooltip ? title : props.tooltip);

const GrayWrapper = props.gray
  ? styled.span`
  display: inline-flex;
  img, svg {
    filter: grayscale(100%);
    opacity: 0.5;
    margin-bottom: 0.2em;
  }
  &:hover img, &:hover svg {
    opacity: 1;
    filter: none;
  }
`
  : styled.span`
  display: inline-flex;
  img {
    margin-bottom: 0.2em;
  }
`;

const imgWrapperStyle = {
  width: "1em",
  height: "1em",
  marginRight: "0.1em",
  minWidth: "1em",
};
const imageClassName = "rounded-circle w-100 h-100";

const Wrap = (props) => {
  const inner = link ? (
    <a
      key="link"
      href={
        link !== true
          ? link
          : `/mob.near/widget/ProfilePage?accountId=${accountId}`
      }
      className="text-truncate d-inline-flex"
      style={{ color: "inherit" }}
    >
      {props.children}
    </a>
  ) : (
    <span className="text-truncate d-inline-flex">{props.children}</span>
  );

  return tooltip ? (
    fullTooltip === true ? (
      <Widget
        loading={inner}
        key="overlay"
        src="mob.near/widget/Profile.OverlayTrigger"
        props={{ accountId, children: inner }}
      />
    ) : (
      <OverlayTrigger placement="auto" overlay={<Tooltip>{tooltip}</Tooltip>}>
        {inner}
      </OverlayTrigger>
    )
  ) : (
    inner
  );
};

const res = (
  <GrayWrapper>
    <Wrap>
      {!hideImage && (
        <Widget
          key="image"
          src="mob.near/widget/ProfileImage"
          loading={
            <div className="d-inline-block" style={imgWrapperStyle}>
              <img
                className={imageClassName}
                alt=""
                style={{ objectFit: "cover" }}
              />
            </div>
          }
          props={{
            fast,
            style: imgWrapperStyle,
            profile,
            accountId,
            className: "d-inline-block",
            imageClassName,
          }}
        />
      )}
      {!hideName && (hideAccountId || name !== accountId) && (
        <span key="name">{name}</span>
      )}
    </Wrap>
    {!hideCheckmark && (
      <Widget
        loading=""
        key="checkmark"
        src="mob.near/widget/Checkmark"
        props={{ accountId }}
      />
    )}
    <Wrap>
      {!hideAccountId && (
        <span key="accountId" className="text-muted">
          @{accountId}
        </span>
      )}
    </Wrap>
  </GrayWrapper>
);

return res;
