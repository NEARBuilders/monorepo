const one = Storage.getGateway("hi");
const imageSrc = Storage.getGateway("capturedImage");
return (
  <>
    <p>{JSON.stringify(imageSrc)}</p>
    <img src={imageSrc} alt="Captured" />
  </>
);
