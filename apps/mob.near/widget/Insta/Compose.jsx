State.init({
  loading: false,
});

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

const filesOnChange = (files) => {
  if (files?.length > 0) {
    State.update({
      loading: true,
    });
    const body = files[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    })
      .then((res) => {
        const content = {
          type: "md",
          image: { ipfs_cid: res.body.cid },
        };
        const data = {
          post: {
            main: JSON.stringify(content),
          },
          index: {
            post: JSON.stringify([
              {
                key: "insta",
                value: {
                  type: "md",
                },
              },
              {
                key: "main",
                value: {
                  type: "md",
                },
              },
            ]),
          },
        };
        State.update({
          uploaded: true,
        });
        Social.set(data, {
          force: true,
          onCommit: () => {
            setTimeout(() => {
              State.update({
                uploaded: false,
              });
            }, 3500);
          },
        });
      })
      .finally(() => {
        State.update({
          loading: false,
        });
      });
  } else {
    State.update({
      img: null,
    });
  }
};

const Wrapper = styled.div`
  @media (min-width: 576px) {
    max-width: 288px;
  }
  background: RGBA(248,249,250);
  
  > div {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &:hover {
    background: RGBA(230, 230, 230);
  }

  transition: background 0.5s;
`;

const loader = (
  <span
    className="spinner-grow spinner-grow-sm me-1"
    role="status"
    aria-hidden="true"
  />
);

return (
  <Wrapper className="ratio ratio-1x1">
    <Files
      multiple={false}
      accepts={["image/*"]}
      minFileSize={1}
      clickable
      onChange={filesOnChange}
      className="btn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="80%"
        height="80%"
        viewBox="0 0 16 16"
        className="position-absolute top-50 start-50 translate-middle"
        style={{ opacity: 0.05 }}
      >
        <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
        <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
      </svg>
      {state.uploaded ? (
        <div>
          {loader}
          Posting
        </div>
      ) : state.loading ? (
        <div>{loader} Uploading</div>
      ) : (
        <div>Upload a photo</div>
      )}
    </Files>
  </Wrapper>
);
