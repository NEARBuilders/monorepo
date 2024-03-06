const nft = props.nft ?? {
  contractId: props.contractId,
  tokenId: props.tokenId,
};

const [imageUrl, setImageUrl] = useState(null);

useEffect(() => {
  setImageUrl(
    `https://i.near.social/magic/${
      thumbnail || "large"
    }/https://near.social/magic/img/nft/${nft.contractId}/${nft.tokenId}`
  );
}, [nft]);

const Wrapper = styled.div`
width: 100%;
height: 100%;
border-radius: 10px;
background-color: #fff;
box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 15px;
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
overflow: hidden;
transition: box-shadow 0.25s ease-in-out 0s;

&:hover {
  box-shadow: rgba(0, 0, 0, 0.12) 0px 6px 24px;
  transition: all 0.1s ease 0s;
  .nft-image {
    transform: scale(1.12);
    transition-duration: 0.4s;
  }
}

.nft-image-wrapper {
  width: 100%;
  height: 100%;
  background-color: #fff;
  border-radius: 10px 10px 0 0;
  overflow: hidden;
}

.nft-image {
  width: 100%;
  height: 100%;
  padding-bottom: 100%;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
}

.nft-text {
  width: 100%;
  padding: 10px;
}

.nft-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
}

.nft-description {
  font-size: 14px;
}

.nft-title {
  color: #333;
}

.nft-description {
  color: #777;
}
`;

return (
  <Wrapper>
    <div className="nft-image-wrapper">
      <div
        className="nft-image"
        style={{ backgroundImage: `url(${imageUrl})` }}
      ></div>
    </div>
    <div className="nft-text">
      <div className="nft-title">Your NFT Title</div>
      <div className="nft-description">Description of your NFT goes here.</div>
    </div>
  </Wrapper>
);
