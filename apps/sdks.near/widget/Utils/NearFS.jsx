const NEAR_SOCIAL_IPFS_URL = "https://ipfs.near.social";
const NEAR_SOCIAL_ADD_ENDPOINT = `${NEAR_SOCIAL_IPFS_URL}/add`;

const NearFS = {
  get: (cid) => asyncFetch(NearFS.getIpfsUrl(cid)).then((data) => data.body || null),
  upload: (metadata) => {
    return asyncFetch(NEAR_SOCIAL_ADD_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify(metadata),
    }).then((data) => {
        return {
            cid: data.body.cid || null,
            url: data.body.cid ? NearFS.getIpfsUrl(data.body.cid) : null
        };
    });
  },
  getIpfsUrl: (cid) => {
    return `${NEAR_SOCIAL_IPFS_URL}/ipfs/${cid}`;
  },
};

return NearFS;