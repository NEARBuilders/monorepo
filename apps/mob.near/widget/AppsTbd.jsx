return (
  <>
    {"APPS TBD".split("").map((c) => (
      <OverlayTrigger placement="right" overlay={<Tooltip>{c}</Tooltip>}>
        <div>{c}</div>
      </OverlayTrigger>
    ))}
  </>
);
