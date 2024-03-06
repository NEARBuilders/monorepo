const accountId = context.accountId || "root.near";
const authorId = "mob.near";

const itemDescription =
  'The identifier item. It will be used as a unique identifier of the entity that receives the action. It\'s also used as a key of the action in the index.\nThe item should be an object with the following keys: `type`, `path` and optional `blockHeight`.\n- `type`: If the data is stored in the social DB, then the type is likely `"social"`, other types can be defined in the standards.\n- `path`: The path to the item. For a `"social"` type, it\'s absolute path within SocialDB, e.g. `alice.near/post/main`.\n- `blockHeight`: An optional paremeter to indicate the block when the data was stored. Since SocialDB data can be overwritten to save storage, the exact data should be referenced by the block height (e.g. for a given post). But if the latest data should be used, then `blockHeight` should be ommited.\n\nExamples of `item`:\n- `{type: "social", path: "mob.near/widget/N.Library"}`\n- `{type: "social", path: "mob.near/post/main", blockHeight: 81101335}`\n';

const components = [
  {
    title: "Profile Block",
    category: "Profile",
    widgetName: "Profile.InlineBlock",
    description:
      "Profile block for a given account ID with a picture, name, premium checkmark, account ID, a list of tags and the description",
    demoProps: { accountId },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      hideDescription: "Don't show description, default false",
    },
  },
  {
    title: "Profile Short Block",
    category: "Profile",
    widgetName: "Profile.ShortInlineBlock",
    description:
      "Short profile block for a given account ID with a picture, name, premium checkmark, account ID",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      tooltip:
        "Display overlay tooltip when you hover over the profile, default false",
    },
  },
  {
    title: "Profile Line",
    category: "Profile",
    widgetName: "N.ProfileLine",
    description:
      "Profile line for a given account ID with a picture, name, premium checkmark, account ID. It's highly customizable and is useful to embed into a text or a single line",
    demoProps: { accountId, tooltip: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      link: "Whether to make profile clickable with a link to the profile page, default true.",
      hideAccountId: "Don't show account ID, default false",
      hideName: "Don't show profile name, default false",
      hideImage: "Don't show profile picture, default false",
      hideCheckmark: "Don't show premium checkmark, default false",
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      title:
        'Optional title when you hover over the profile. Default `"${name} ${accountId}"`',
      tooltip:
        "Display overlay tooltip or title when you hover over the profile, default false. Will display a custom title if tooltip is given. If tooltip is true, the full tooltip is displayed. Default false",
    },
  },
  {
    title: "Profile Picture",
    category: "Profile",
    widgetName: "ProfileImage",
    description:
      "Profile picture for a given account ID. It's highly customizable with style and classes.",
    demoProps: { accountId, fast: true },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      className:
        'HTML class name for the image wrapper, default `"profile-image d-inline-block"`',
      style:
        'React DOM styles for the image wrapper, default `{ width: "3em", height: "3em" }`',
      imageStyle:
        'React DOM styles for the image, default `{ objectFit: "cover" }`',
      imageClassName:
        'HTML class name for the image, default `"rounded-circle w-100 h-100"`',
      thumbnail:
        'Thumbnail type, can be `"large"`, `"thumbnail"` or `null`, default is `"thumbnail"`',
      profile: "Object that holds profile information to display",
      fast: "Render profile picture faster using external cache, default true if the `props.profile` is not provided",
      title:
        'Optional title when you hover over the profile. Default `"${name} ${accountId}"`',
      tooltip:
        "Display overlay tooltip or title when you hover over the profile, default false. Will display a custom title if tooltip is given. If tooltip is true, the full tooltip is displayed. Default false",
    },
  },
  {
    title: "Profile Large",
    category: "Profile",
    widgetName: "ProfileLarge",
    description:
      "Large profile block for a given account ID. It's used to display the top part of the profile page",
    demoProps: { accountId },
    requiredProps: {
      accountId: "The account ID of the profile",
    },
    optionalProps: {
      link: "Whether to make profile name clickable with a given link. Can be `true`, `false` or a string with the URL, default `false`.",
      showEditButton:
        "Whether to show the Edit Profile button, default false. But it'll be displayed in case the `profile` object is not given",
      profile: "Object that holds profile information to display",
    },
  },
  {
    title: "Like Button",
    category: "Button",
    widgetName: "N.LikeButton",
    description:
      "A like button for a given item. It automatically keeps track of the number of unique likes and let a signed-in user to like the given item. See definition of the item in props",
    demoProps: {
      item: {
        type: "social",
        path: "mob.near/widget/N.Library",
      },
    },
    requiredProps: {
      item: itemDescription,
    },
    optionalProps: {
      notifyAccountId:
        "Which account ID should be notified when a user likes the item. The user will receive a notification with the item included. Default `undefined`",
    },
  },
  {
    title: "Repost Button",
    category: "Button",
    widgetName: "N.RepostButton",
    description:
      "A repost button for a given item (usually a post). It automatically keeps track of the number of reposts and let a signed-in user to repost the given item. See definition of the item in props",
    demoProps: {
      item: {
        type: "social",
        path: "mob.near/post/main",
        blockHeight: 81101335,
      },
    },
    requiredProps: {
      item: itemDescription,
    },
    optionalProps: {
      notifyAccountId:
        "Which account ID should be notified when a user likes the item. The user will receive a notification with the item included. Default `undefined`",
    },
  },
  {
    title: "Post",
    category: "Feed",
    widgetName: "MainPage.N.Post",
    description: "TBD",
    demoProps: {
      accountId: "mob.near",
    },
    requiredProps: {},
    optionalProps: {},
  },
  {
    title: "Comment",
    category: "Feed",
    widgetName: "MainPage.N.Comment",
    description: "TBD",
    demoProps: {
      accountId: "mob.near",
    },
    requiredProps: {},
    optionalProps: {},
  },
  {
    title: "Comment Feed",
    category: "Feed",
    widgetName: "MainPage.N.Comment.Feed",
    description: "TBD TODO WRAPPER",
    demoProps: {
      accountId: "mob.near",
    },
    requiredProps: {},
    optionalProps: {},
  },
  {
    title: "Compose",
    category: "Utils",
    widgetName: "MainPage.N.Common.Compose",
    description: "TBD",
    demoProps: {
      text: "# Hello",
    },
    requiredProps: {},
    optionalProps: {},
  },
  {
    title: "Social Markdown",
    category: "Utils",
    widgetName: "N.SocialMarkdown",
    description: "TBD",
    demoProps: {
      text: "# Hello",
    },
    requiredProps: {},
    optionalProps: {},
  },
  {
    title: "Social Markdown",
    category: "Utils",
    widgetName: "N.SocialMarkdown",
    description: "TBD",
    demoProps: {
      text: "# Hello",
    },
    requiredProps: {},
    optionalProps: {},
  },
];

const renderProps = (props, optional) => {
  return Object.entries(props || {}).map(([key, desc]) => {
    return (
      <tr key={key}>
        <td>
          <span className={`code prop-key${optional ? " optional" : ""}`}>
            {key}
          </span>
        </td>
        <td className="prop-desc">
          <Markdown text={desc} />
        </td>
      </tr>
    );
  });
};

const renderComponent = (c, i) => {
  const widgetSrc = `${authorId}/widget/${c.widgetName}`;
  const embedCode = `<Widget\n  src="${widgetSrc}"\n  props={{${JSON.stringify(
    c.demoProps,
    undefined,
    2
  )
    .slice(1, -1)
    .split("\n")
    .map((s) => `  ${s}`)
    .join("\n")}}}\n/>\n`;
  const id = c.title.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="component" key={i}>
      <div className="anchor" id={id} />
      <a href={`#${id}`}>
        <h3>{c.title}</h3>
      </a>
      <p>{c.description}</p>
      <label>Preview</label>
      <div className="preview mb-3" style={c.previewStyle}>
        <Widget src={widgetSrc} props={c.demoProps} />
      </div>
      <label>Component</label>
      <div className="d-flex flex-row flex-wrap justify-content-between mb-3">
        <div className="path font-monospace">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{
              text: widgetSrc,
              label: widgetSrc,
            }}
          />
        </div>
        <div className="source">
          <a
            href={`/mob.near/widget/WidgetSource?src=${widgetSrc}`}
            target="_blank"
            className="btn btn-outline-primary border-0"
          >
            Source
          </a>
        </div>
      </div>
      <label>Props</label>
      <table className="props table table-bordered mb-3">
        <thead>
          <tr>
            <th>Key</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {renderProps(c.requiredProps)}
          {renderProps(c.optionalProps, true)}
        </tbody>
      </table>
      <label>Example</label>
      <div className="embed-code">
        <Markdown text={`\`\`\`jsx\n${embedCode}\n\`\`\``} />
        <div className="embed-copy">
          <Widget
            src="mob.near/widget/CopyButton"
            props={{ text: embedCode, className: "btn btn-outline-light" }}
          />
        </div>
      </div>
    </div>
  );
};

const renderMenuItem = (c, i) => {
  const prev = i ? components[i - 1] : null;
  const res = [];
  if (!prev || prev.category !== c.category) {
    res.push(
      <h5 className="category" key={c.category}>
        {c.category}
      </h5>
    );
  }
  const id = c.title.toLowerCase().replaceAll(" ", "-");
  res.push(
    <div className="menu-item" key={i}>
      <a href={`#${id}`}>{c.title}</a>
    </div>
  );
  return res;
};

const Wrapper = styled.div`
@media(min-width: 992px) {
  .b-s {
    border-left: 1px solid #eee;
  }
  .b-e {
    border-right: 1px solid #eee;
  }
}
.category:not(:first-child) {
  margin-top: 1em;
}
.component {
  padding: 0.5em 12px;
  padding-bottom: 0;
  margin-bottom: 3em;
  margin: 0 -12px 3em;
  position: relative;

  &:hover {
    background: rgba(0, 0, 0, 0.03);
  }

  .anchor {
    position: absolute;
    top: -70px;
  }

  table {
    background: white;
  }

  label {
    font-size: 20px;
  }

  .code {
    display: inline-flex;
    line-height: normal;
    border-radius: 0.3em;
    padding: 0 4px;
    border: 1px solid #ddd;
    background: rgba(0, 0, 0, 0.03);
    font-family: var(--bs-font-monospace);
  }
  .path {

  }
  .preview {
    background-color: white;
    padding: 12px;
    border: 1px solid #eee;
    border-radius: 12px;
    pre {
      margin-bottom: 0;
    }
  }
  .props {
    .prop-key {
      font-weight: 600;
      &.optional {
        font-weight: normal;
      }
    }
    .prop-desc {
      p {
        margin-bottom: 0;
      }
    }
  }
  .embed-code {
    position: relative;

    .embed-copy {
      position: absolute;
      top: 18px;
      right: 10px;
    }
  }
}
`;

return (
  <Wrapper>
    <h3>Social Components Library</h3>
    <div className="mb-3">
      This library contains common social components used by near.social
    </div>
    <div className="row">
      <div className="col-lg-3 b-e b-s">{components.map(renderMenuItem)}</div>
      <div className="col-lg-9 b-e">{components.map(renderComponent)}</div>
    </div>
  </Wrapper>
);
