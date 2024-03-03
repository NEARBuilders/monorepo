const { joinBtnChildren, connectedChildren, showActivity, className, href } =
  props;

const { Bullet, Button } = VM.require("buildhub.near/widget/components") || {
  Bullet: () => <></>,
  Button: () => <></>,
};
const DaoSDK = VM.require("sdks.near/widget/SDKs.Sputnik.DaoSDK") || (() => {});

if (!DaoSDK) {
  return <></>;
}
const daoId = "build.sputnik-dao.near";
const sdk = DaoSDK(daoId);
if (!sdk) {
  return <></>;
}
const userAccountId = context.accountId;

const data = sdk?.checkIsMemberOrPending({
  accountId: userAccountId,
  rolesToCheck: ["community", "council"],
});

const connectEdge = Social.keys(
  `${userAccountId}/graph/connect/${daoId}`,
  undefined,
  {
    values_only: true,
  },
);

// get DAO policy, deposit, and group
const policy = sdk?.getPolicy();

if (policy === null || data === null) {
  return "";
}

const deposit = policy?.proposal_bond;
const roleId = "community";

const handleJoin = () => {
  const connectData = {
    [userAccountId]: {
      graph: {
        connect: {
          [daoId]: "",
        },
      },
      index: {
        graph: JSON.stringify({
          key: "connect",
          value: {
            type: "connect",
            accountId: daoId,
          },
        }),
      },
      notify: JSON.stringify({
        key: daoId,
        value: {
          type: "connect",
        },
      }),
    },
  };

  sdk.createAddMemberProposal({
    description: `add ${userAccountId} to the ${roleId} group`,
    memberId: userAccountId,
    roleId: roleId,
    gas: 219000000000000,
    deposit: deposit,
    additionalCalls: [
      {
        contractName: "social.near",
        methodName: "set",
        deposit: 100000000000000000000000,
        args: { data: connectData, options: { refund_unused_deposit: true } },
      },
    ],
  });
};

const isConnected = Object.keys(connectEdge || {}).length > 0;

const Container = styled.div`
  .custom-button {
    display: flex;
    padding: 10px 20px;
    justify-content: center;
    align-items: center;
    gap: 4px;

    border-radius: 8px;
    background: #eca227;

    color: #fff;
    margin: 0;

    a {
      color: #fff !important;
    }

    /* Other/Button_text */
    font-size: 14px;
    font-style: normal;
    font-weight: 500;
    line-height: normal;

    text-decoration: none;
    transition: all 300ms;

    &:hover {
      background: #c98a40;
    }
  }

  a {
    @apply custom-button;
  }
`;

const { href: linkHref } = VM.require("buildhub.near/widget/lib.url") || {
  href: () => {},
};

const Component = () => {
  if (!context.accountId) {
    return (
      <Button
        href={"https://nearbuilders.org/join"}
        variant="primary"
        noLink={true}
      >
        Join Now
      </Button>
    );
  } else if (data.isDaoMember || isConnected) {
    if (showActivity) {
      return (
        <div className="d-flex flex-column align-items-center gap-3">
          <Bullet variant="light">
            {data.isDaoMember ? "Joined" : "Pending application"}
          </Bullet>
          <Link
            style={{ color: "#df9731", fontWeight: 600 }}
            to={linkHref({
              widgetSrc: "buildhub.near/widget/app",
              params: {
                page: "feed",
              },
            })}
          >
            View Activity{" "}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="17"
              viewBox="0 0 16 17"
              fill="none"
            >
              <path
                d="M10.7809 7.83327L7.2049 4.25726L8.1477 3.31445L13.3332 8.49993L8.1477 13.6853L7.2049 12.7425L10.7809 9.1666H2.6665V7.83327H10.7809Z"
                fill="#df9731"
              />
            </svg>
          </Link>
        </div>
      );
    }
    return <div>{connectedChildren}</div>;
  } else {
    if (href) {
      return (
        <Link href={href} className={className}>
          {joinBtnChildren}
        </Link>
      );
    } else {
      return (
        <button className={className} onClick={handleJoin}>
          {joinBtnChildren}
        </button>
      );
    }
  }
};

return (
  <Container>
    <Component />
  </Container>
);
