const accountId = context?.accountId;

const proxyMinter = "proxy2.minsta.near";
const nftContractId = "ethdenver2023.mintbase1.near";
const mbGraphEndpoint = "https://graph.mintbase.xyz";

const ipfsUrl = (cid) => `https://ipfs.near.social/ipfs/${cid}`;

let posts = [];

const data = fetch(mbGraphEndpoint, {
  method: "POST",
  headers: {
    "mb-api-key": "omni-site",
    "Content-Type": "application/json",
    "x-hasura-role": "anonymous",
  },
  body: JSON.stringify({
    query: `
  query FetchFeedMintedThings {
  nft_activities(where: {kind: {_eq: "mint"}, nft_contract_id: {_eq: "ethdenver2023.mintbase1.near"}}, limit: 5, order_by: {timestamp: desc}) {
      nft_contract_id
      action_receiver
      token_id
      memo
      timestamp
    }
  }
`,
  }),
});

const handleImageUpload = (files) => {
  if (files?.length > 0) {
    State.update({
      img: {
        uploading: true,
        cid: null,
      },
    });
    const body = files[0];
    asyncFetch("https://ipfs.near.social/add", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body,
    }).then((res) => {
      const cid = res.body.cid;

      State.update({
        img: {
          cid,
        },
      });

      handleMint(cid);
    });
  } else {
    State.update({
      img: null,
    });
  }
};

const handleMint = (cid) => {
  const gas = 200000000000000;
  const deposit = 0;

  Near.call([
    {
      contractName: proxyMinter,
      methodName: "mint",
      args: {
        owner_id: accountId,
        metadata: {
          media: ipfsUrl(cid),
        },
        num_to_mint: 1,
        royalty_args: {
          split_between: {
            [accountId]: 10000,
          },
          percentage: 1000,
        },
        split_owners: null,
        nft_contract_id: nftContractId,
      },
      gas: gas,
      deposit: deposit,
    },
  ]);
};

if (data?.body?.data?.nft_activities) {
  posts = data?.body?.data?.nft_activities;
}

const size = "6em";

return (
  <div class="text-black p-2 container-fluid d-flex flex-column w-100 text-center justify-content-center align-items-center">
    <h4>ETHDenver</h4>
    <p style={{ fontSize: 12 }}>Capture, mint and share moments with others.</p>
    <div class="container-fluid text-center d-flex flex-column justify-content-center align-items-center">
      <Files
        multiple={false}
        accepts={["image/*"]}
        minFileSize={1}
        clickable
        onChange={handleImageUpload}
        style={{
          cursor: "pointer",
        }}
        class="text-center d-flex justify-content-center align-items-center"
      >
        <div class="d-flex m-4 px-2 py-1 rounded bg-black text-white justify-content-center align-items-center">
          {state.img?.uploading ? (
            <>...</>
          ) : state.img?.cid ? (
            "Replace"
          ) : (
            "Take photo"
          )}
        </div>
      </Files>
      <div class="d-flex flex-column gap-2">
        {posts.map((post) => {
          const memo = JSON.parse(post.memo);
          const split_between = memo.royalty.split_between;
          const sender = Object.keys(split_between)[0];

          return (
            <div>
              <Widget
                src="mob.near/widget/ProfileLine"
                props={{
                  accountId: sender,
                  hideName: true,
                  hideAccountId: true,
                  tooltip: true,
                }}
              />
              <span role="img" aria-label="poked" title="poked">
                📸
              </span>
              <a
                href={`https://mintbase.xyz/contract/${post.nft_contract_id}/token/${post.token_id}`}
              >
                <Widget
                  src="mob.near/widget/NftImage"
                  props={{
                    nft: {
                      tokenId: post.token_id,
                      contractId: post.nft_contract_id,
                    },
                    style: {
                      width: size,
                      height: size,
                      objectFit: "cover",
                      minWidth: size,
                      minHeight: size,
                      maxWidth: size,
                      maxHeight: size,
                      overflowWrap: "break-word",
                    },
                    thumbnail: "thumbnail",
                    className: "",
                    fallbackUrl:
                      "https://ipfs.near.social/ipfs/bafkreihdiy3ec4epkkx7wc4wevssruen6b7f3oep5ylicnpnyyqzayvcry",
                  }}
                />
              </a>
              <span role="img" aria-label="poked" title="poked">
                ➡️
              </span>
              <Widget
                src="mob.near/widget/ProfileLine"
                props={{
                  accountId: post.action_receiver,
                  hideName: true,
                  hideAccountId: true,
                  tooltip: true,
                }}
              />
            </div>
          );
        })}
      </div>
    </div>

    <div class="flex my-4 gap-8">
      <a
        href="https://blog.mintbase.xyz/ethdenver-photo-book-mints-on-near-social-minsta-and-mintbase-baec3f49bd4c"
        target="_blank"
      >
        Learn more
      </a>
      |
      <a href="https://ethdenver2023.minsta.me/" target="_blank">
        Minsta
      </a>
      |
      <a href="https://ethdenver2023.minsta.me/leaderboard" target="_blank">
        Leaderboard
      </a>
    </div>
  </div>
);
