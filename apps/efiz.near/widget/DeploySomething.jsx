const showHeader = props.showHeader || false;

return (
  <>
    {showHeader && (
      <div>
        <h1>
          deploy{" "}
          <a
            href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnear-everything%2Fviewer%2Ftree%2Fmaster%2Fsrc"
            target="_blank"
          >
            something
          </a>
        </h1>
      </div>
    )}
    <a
      href="https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fnear-everything%2Fviewer%2Ftree%2Fmaster%2Fsrc"
      target="_blank"
    >
      <img src="https://vercel.com/button" alt="Deploy with Vercel" />
    </a>
  </>
);
