return (
  <div className="row py-1 px-1">
    <div className="mx-auto">
      <div className="bg-white shadow rounded overflow-hidden">
        <div className="px-4 pt-0 pb-5 bg-dark position-relative">
          <Widget
            src="mob.near/widget/Image"
            props={{
              image: backgroundImage,
              alt: "profile background",
              className: "position-absolute w-100 h-100",
              style: { objectFit: "cover", left: 0, top: 0 },
              fallbackUrl:
                "https://thewiki.io/static/media/sasha_anon.6ba19561.png",
            }}
          />
          <div
            className="profile-picture"
            style={{ transform: "translateY(7rem)" }}
          >
            <div className="profile">
              <img
                src="https://bootstrapious.com/i/snippets/sn-profile/teacher.jpg"
                alt="..."
                style={{ width: "10rem" }}
                className="rounded-circle mb-2 img-thumbnail d-block"
              />
            </div>
          </div>
        </div>

        <div className="bg-light px-4 pb-4 ">
          <div
            className="d-lg-flex justify-content-between"
            style={{ paddingTop: "1rem" }}
          >
            <div style={{ paddingTop: "3rem" }}>
              <h4 className="mt-0 mb-0">Eugene The Dream</h4>
              <p className="small">
                <i className="bi bi-person-fill text-secondary me-1"></i>
                mob.near
              </p>
            </div>
            <div style={{ minWidth: "12rem" }}>
              <div>
                <i className="bi bi-github text-secondary me-1"></i>
                evgenykuzyakov
              </div>
              <div>
                <i className="bi bi-github text-secondary me-1"></i>Suppppar
                looooooooong website
              </div>
              <div>
                <i className="bi bi-github text-secondary me-1"></i>Github
              </div>
              <div>
                <i className="bi bi-github text-secondary me-1"></i>Github
              </div>
            </div>
          </div>
          <hr />
          <div>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.
          </div>
        </div>

        <div className="py-4 px-4">
          <div className="d-flex align-items-center justify-content-between mb-3">
            <h5 className="mb-0">Recent photos</h5>
            <a href="#" className="btn btn-link text-muted">
              Show all
            </a>
          </div>
          <div className="row">
            <div className="col-lg-6 mb-2 pe-lg-1">
              <img
                src="https://bootstrapious.com/i/snippets/sn-profile/img-3.jpg"
                alt=""
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-lg-6 mb-2 pe-lg-1">
              <img
                src="https://bootstrapious.com/i/snippets/sn-profile/img-4.jpg"
                alt=""
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-lg-6 pe-lg-1 mb-2">
              <img
                src="https://bootstrapious.com/i/snippets/sn-profile/img-5.jpg"
                alt=""
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-lg-6 pe-lg-1">
              <img
                src="https://bootstrapious.com/i/snippets/sn-profile/img-6.jpg"
                alt=""
                className="img-fluid rounded shadow-sm"
              />
            </div>
          </div>
          <div className="py-4">
            <h5 className="mb-3">Recent posts</h5>
            <div className="p-4 bg-light rounded shadow-sm">
              <p className="font-italic mb-0">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.
              </p>
              <ul className="list-inline small text-muted mt-3 mb-0">
                <li className="list-inline-item">
                  <i className="fa fa-comment-o me-2"></i>12 Comments
                </li>
                <li className="list-inline-item">
                  <i className="fa fa-heart-o me-2"></i>200 Likes
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);
