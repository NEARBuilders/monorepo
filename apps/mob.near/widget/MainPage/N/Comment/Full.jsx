const Wrapper = styled.div`
  margin: 0 -12px;
  line-height: normal;
  
  .post {
    position: relative;
    padding: 12px;
    padding-bottom: 4px;
    display: flex;
    h1, h2, h3, h4, h5, h6 {
      font-size: 16px !important;
    }
    h1, h2, h3, h4, h5, h6, strong, b {
      font-weight: 500 !important;
    }
    ol, ul, dl {
      margin-bottom: 0.5rem;
      white-space: inherit;
    }
    p {
      margin-bottom: 0.5rem;
    }
    hr {
      display: none;
    }
    img {
      border-radius: var(--bs-border-radius-lg);
      max-height: 40em;
    }

    th {
      min-width: 5em;
    }

    .table>:not(caption)>*>* {
      padding: .3rem;
    }

    &:hover {
      background-color: rgba(0, 0, 0, 0.03);
      .expand-post {
        background-image : linear-gradient(to bottom, 
                      rgba(0,0,0, 0), 
                      rgba(247.35,247.35,247.35, 1) 25%);
      }
    }

    .post-header {
      margin: 4px 0;
    }
  }

  .post:not(:last-child):before {
    content: "";
    position: absolute;
    left: 30px;
    top: 56px;
    bottom: 0;
    width: 2px;
    background-color: #ddd;
    z-index: -1;
  }

  .post:not(:first-child):after {
    content: "";
    position: absolute;
    left: 30px;
    top: 0;
    width: 2px;
    height: 8px;
    background-color: #ddd;
    z-index: -1;
  }
  
  .left {
    margin-right: 12px;
    min-width: 40px;
  }
  .right {
    margin-top: -4px;
    flex-grow: 1;
    min-width: 0;
  }

  .buttons-placeholder {
    padding-bottom: 10px;
  }

  .buttons {
    margin-left: -8px;
    margin-top: 10px;
    margin-bottom: 6px;
    column-gap: 4px;
    color: #888;
  }

  .reposted {
    padding-top: 30px;
  }
`;

return (
  <Wrapper>
    <Widget
      loading={false}
      src="mob.near/widget/MainPage.N.Comment"
      props={props}
    />
  </Wrapper>
);
