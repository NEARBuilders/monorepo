const image = props.image;

const Wrapper = styled.div`
  white-space: normal;
  .lightbox {
    backdrop-filter: blur(5px);

    img {
      width: 100vw;
      height: 100vh;
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
  }

  .img-wrapper {
    width: 100%;
    border-radius: 0.5em;
    text-align: center;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    align-content: center;
    max-height: 24em;
    @media(max-width: 991px) {
      max-height: 20em;
    }
    cursor: pointer;
    .img-box {
      flex-grow: 1;
      overflow: hidden;
      img {
        max-height: 24em;
        @media(max-width: 991px) {
          max-height: 20em;
        }
        width: 100%;
        object-fit: contain;
        border-radius: 0.5em;
      }
    }
    
  }
`;

const [showLightbox, setShowLightbox] = useState(false);

const imageUrl =
  image.nft.contractId && image.nft.tokenId
    ? `https://i.near.social/magic/large/https://near.social/magic/img/nft/${image.nft.contractId}/${image.nft.tokenId}`
    : image.ipfs_cid
    ? `https://ipfs.near.social/ipfs/${image.ipfs_cid}`
    : image.url;

const innerImage = (
  <div className="img-box">
    <img src={imageUrl} alt={props.alt} loading="lazy" />
  </div>
);

return (
  <Wrapper>
    <div
      key="c-img"
      className="img-wrapper"
      onClick={(e) => {
        e?.preventDefault && e.preventDefault();
        setShowLightbox(true);
      }}
    >
      {innerImage}
    </div>
    <Widget
      key="img-lightbox"
      src="mob.near/widget/N.Lightbox"
      loading=""
      props={{
        show: showLightbox,
        onHide: () => {
          setShowLightbox(false);
        },
        children: innerImage,
      }}
    />
  </Wrapper>
);
