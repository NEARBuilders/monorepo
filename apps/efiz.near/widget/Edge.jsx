const blockHeight = props.blockHeight;

const edges = Social.index("edge", blockHeight.toString(), {
  limit: 10,
  order: "desc",
  accountId: undefined,
});

const Button = styled.button`
  text-transform: lowercase !important;
`;

const renderItem = (val) => {
  if (val.value.type === "reference") {
    if (val.value.ref.type === "meme") {
      return (
        <Widget
          src="cuongdcdev.near/widget/linkdrop-viewer"
          props={{
            k: "eyJ1IjoiZWZpei5uZWFyIiwiayI6InJrR3ViYUh1cXFqSFVHdW5SN3ZNR0tOeG5pd05NTFE5RU5aV3MxOUU4QUVZM0x0Vkg1TURuY0xLUDhzQ3BlMXZUWUYxUWp4WmpOTEs2M3Z4dTFjb210NCJ9",
          }}
        />
      );
    }
  } else {
    return;
  }
};

return (
  <div>
    {edges?.map((val) => (
      <>{renderItem(val)}</>
    ))}
  </div>
);
