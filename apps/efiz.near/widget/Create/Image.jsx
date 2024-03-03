const fileAccept = props.fileAccept || "*";
const fileIcon = props.fileIcon || "bi-file";
const buttonText = props.buttonText || "Upload a file";
const createThing = props.createThing;

props.fileType ||
  initState({
    file: null,
  });

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (file) => {
  if (file?.length > 0) {
    State.update({
      file: {
        uploading: true,
        cid: null,
      },
    });
    const body = file[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;
      console.log("CID", cid);
      State.update({
        file: {
          cid,
        },
      });
      if (createThing) {
        createThing(cid);
      }
    });
  } else {
    State.update({
      file: null,
    });
  }
};

return (
  <div className="d-inline-block">
    {state.file.cid ? <img src={ipfsUrl(state.file.cid)} width={100} /> : <></>}
    <Files
      multiple={false}
      accepts={["image/*", "video/*", ".pdf"]}
      minFileSize={1}
      clickable
      className="btn btn-outline-primary"
      onChange={filesOnChange}
    >
      {state.file?.uploading
        ? "Uploading"
        : state.file && state.file.cid
        ? "Replace"
        : buttonText}
    </Files>
  </div>
);
