const Header = styled.div`
    z-index:4;
    display:flex;
    justify-content:space-between;
    align-items:center;
    padding:20px;

    ul {
        display:flex;
        flex-grow:1;
        padding:0;
        margin:0;
        list-style:none;
        align-items:center;
        justify-content:center;

        li {
            :not(:last-of-type) {
                margin-right:40px;
            }
        }
    }
`;

const Logo = styled.h1`
    font-weight:bold;
    font-size:2rem;
`;

const ConnectWallet = styled.div`
    .btn-outline-primary {
        font-size:.9rem;
        height: 48px;
        color: #fff;
        text-transform: none;
        background-color: #2142e7;
        border-radius: 8px;
        flex-wrap: nowrap;
        justify-content: center;
        align-items: center;
        padding: 0 1rem;
        font-weight: 600;
        line-height: 1;
        text-decoration: none;
        display: flex;
        transition: all .2s;

        :hover {
            opacity:.9;
            transition: all .2s;
        }
    }

    &.secondary {
        .btn-outline-primary {
            background-color:transparent;
            color:#000;
            border: 3px solid #2142e7!important;
            color: #2142e7;

            :hover {
                opacity:.8;
                background-color:#2142e7;
                color:#fff;
            }
        }
    }
`;

return (
  <Header>
    <Logo>sdks.near</Logo>

    <ul>
      <li>Home</li>
      <li>Libraries</li>
      <li>Use cases</li>
      <li>Docs</li>
    </ul>
  </Header>
);
