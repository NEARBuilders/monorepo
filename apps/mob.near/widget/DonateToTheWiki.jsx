const donate = () => {
  Near.call(
    "thewiki.near",
    "donate",
    {},
    "30000000000000",
    "1000000000000000000000000"
  );
};

return (
  <div>
    <div>
      <img
        className="img-fluid mb-2"
        src="https://ipfs.near.social/ipfs/bafkreiguj7klkan5fvixmzt6jj4o6qz3wulqoed3lr7dgusghf5ei6fjte"
        alt="jimmy"
      />
    </div>
    <button onClick={donate}>Donate 1 NEAR to thewiki.near</button>
  </div>
);
