const [img, setImg] = useState(null);

return (
  <div className="container row">
    <div>
      Image upload: <br />
      <IpfsImageUpload image={img} />
    </div>
    <div>
      Raw State:
      <pre>{JSON.stringify(img)}</pre>
    </div>
    <div className="mt-2">
      {img.cid && (
        <img src={`https://ipfs.near.social/ipfs/${img.cid}`} alt="uploaded" />
      )}
    </div>
  </div>
);
