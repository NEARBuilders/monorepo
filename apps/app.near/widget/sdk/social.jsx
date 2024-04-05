const SocialSDK = {
  poke: (accountId) => {
    const data = {
      index: {
        graph: JSON.stringify({
          key: "poke",
          value: {
            accountId: accountId,
          },
        }),
        notify: JSON.stringify({
          key: accountId,
          value: {
            type: "poke",
          },
        }),
      },
    };

    Social.set(data, {
      force: true,
    });
  },
};

return { SocialSDK };
