const accountId = context.accountId;

const installedEmbeds = JSON.parse(
  Social.get(`${accountId}/settings/every/embed`, "final") || "null"
);

if (!installedEmbeds) {
  return <p>no embeds installed</p>;
}

return (
  <>
    {installedEmbeds.map((embed) => ( // EmbedPlugin
      <div className="border">
        <p>widgetSrc: {embed.widgetSrc}</p>
        <p>embedSrc: {embed.embedSrc}</p>
        <button
          onClick={() =>
            Social.set({
              settings: {
                every: {
                  embed: installedEmbeds.filter(
                    (it) => it.widgetSrc !== embed.widgetSrc
                  ),
                },
              },
            })
          }
        >
          uninstall
        </button>
      </div>
    ))}
  </>
);
