
const { Feed } = VM.require("efiz.near/widget/Module.Feed");
Feed = Feed || (() => <></>);

return (
<>
    <Widget
        src="devs.near/widget/Compose"
        props={{
        index: {
            post: JSON.stringify([
            {
                key: {
                type: "thing",
                path: `${creatorId}/thing/${groupId}`,
                },
                value: {
                type: "md",
                },
            },
            ]),
        },
        }}
    />
    <Feed
    index={[
        {
        action: "post",
        key: {
            type: "thing",
            path: `${creatorId}/thing/${groupId}`,
        },
        options: {
            limit: 10,
            order: "desc",
            accountId: props.accounts,
        },
        cacheOptions: {
            ignoreCache: true,
        },
        }
    ]}
    Item={(p) => (
        <Widget
        loading={<div className="w-100" style={{ height: "200px" }} />}
        src="mob.near/widget/MainPage.N.Post"
        props={{ accountId: p.accountId, blockHeight: p.blockHeight }}
        />
    )}
    />
</>);