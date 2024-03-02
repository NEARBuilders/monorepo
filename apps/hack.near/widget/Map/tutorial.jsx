const accountId = context.accountId || "hack.near";

const components = [
  {
    title: "Map.index",
    category: "Overview",
    authorId: "efiz.near",
    path: "efiz.near/widget/Map.index",
    description:
      "This relies on Mapbox.js, embedded into the `Map.Mapbox` component with an iFrame, which contains code for accessing the Mapbox APIs. Builders can leverage `Map.form` to let users add their own markers, and `Map.inspect` to enable viewing details of a location when clicked.",
    demoProps: {
      markers,
    },
    requiredProps: {},
    optionalProps: {
      markers: "data",
      myMarkers: "myData",
      onMapClick: "(e) => console.log(`map click`, e)",
      onMarkerClick: "(e) => console.log(`marker click`, e)",
      inspect: "(p) => <Inspect {...p} />",
      form: "(p) => <Form {...p} />",
    },
  },
  {
    title: "1. Custom Data",
    category: "Steps",
    authorId: "efiz.near",
    path: "efiz.near/widget/Map.index",
    description: "Put things on your map.",
    demoProps: {},
    requiredProps: {},
    optionalProps: {
      markers: "data",
      myMarkers: "myData",
    },
  },
  {
    title: "2. Interactive Points",
    category: "Steps",
    authorId: "efiz.near",
    path: "efiz.near/widget/Map.index",
    description: "Make it clickable.",
    demoProps: {},
    requiredProps: {},
    optionalProps: {
      markers: "data",
      myMarkers: "myData",
      onMapClick: "(e) => console.log(`map click`, e)",
      onMarkerClick: "(e) => console.log(`marker click`, e)",
    },
  },
  {
    title: "3. Inspect + Form",
    category: "Steps",
    authorId: "efiz.near",
    path: "efiz.near/widget/Map.index",
    description: "Add functionality.",
    demoProps: {},
    requiredProps: {},
    optionalProps: {
      markers: "data",
      myMarkers: "myData",
      onMapClick: "(e) => console.log(`map click`, e)",
      onMarkerClick: "(e) => console.log(`marker click`, e)",
      inspect: "(p) => <Inspect {...p} />",
      form: "(p) => <Form {...p} />",
    },
  },
];

const examples = [
  {
    title: "Humans of NEAR",
    category: "Examples",
    authorId: "humans-of-near.near",
    path: "humans-of-near.near/widget/humans.nearverselabs.com",
    description: "TBD",
  },
  {
    title: "Liberty DAO",
    category: "Examples",
    authorId: "libertydao.near",
    path: "libertydao.near/widget/boroughs.index",
    description: "TBD",
  },
  {
    title: "AfforDWELL",
    category: "Examples",
    authorId: "raycent.near",
    path: "hack.near/widget/Map.dwell",
    description: "TBD",
  },
  {
    title: "NEARBI",
    category: "Examples",
    authorId:
      "fcff4038fecb38b0e63ee9e865f363886415006ec9413ea70dbae598207f201c",
    path: "fcff4038fecb38b0e63ee9e865f363886415006ec9413ea70dbae598207f201c/widget/NearBi.Mapbox",
    description: "TBD",
  },
  {
    title: "NYC Rats",
    category: "Examples",
    authorId: "byalbert.near",
    path: "byalbert.near/widget/RatSightingsUpdated",
    description: "TBD",
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

const renderExample = (e, i) => {
  const id = e.title.toLowerCase().replaceAll(" ", "-");
  return (
    <div className="component" key={i}>
      <div className="anchor" id={id} />
      <div className="d-flex flex-row flex-wrap justify-content-between mb-3">
        <a href={`/${e.path}`}>
          <h3>{e.title}</h3>
        </a>
        <div className="source">
          <a
            href={`/mob.near/widget/WidgetSource?src=${c.path}`}
            target="_blank"
            className="btn btn-outline-primary border-0"
          >
            Source
          </a>
        </div>
      </div>
      <div className="preview mb-3" style={e.previewStyle}>
        <Widget src={e.path} />
      </div>
    </div>
  );
};

const renderComponent = (c, i) => {
  const embedCode = `<Widget\n  src="${c.path}"\n  props={{${JSON.stringify(
    c.optionalProps,
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
      <div className="d-flex flex-row flex-wrap justify-content-between mb-3">
        <a href={`/${c.path}`}>
          <h3>{c.title}</h3>
        </a>
        <div className="source">
          <a
            href={`/mob.near/widget/WidgetSource?src=${c.path}`}
            target="_blank"
            className="btn btn-outline-primary border-0"
          >
            Source
          </a>
        </div>
      </div>
      <div className="mt-2">
        <p>{c.description}</p>
      </div>
      {Object.keys(c.demoProps).length > 0 && (
        <>
          <label>Demo</label>
          <div className="preview mb-3" style={c.previewStyle}>
            <Widget src={c.path} props={c.demoProps} />
          </div>
        </>
      )}
      {Object.keys(c.requiredProps).length > 0 && (
        <>
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
        </>
      )}
      <label>Sample</label>
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

const renderExamplesItem = (e, i) => {
  const prev = i ? examples[i - 1] : null;
  const res = [];
  if (!prev || prev.category !== e.category) {
    res.push(
      <h5 className="category" key={e.category}>
        {e.category}
      </h5>
    );
  }
  const id = e.title.toLowerCase().replaceAll(" ", "-");
  res.push(
    <div className="menu-item" key={i}>
      <a href={`#${id}`}>{e.title}</a>
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
    <div className="d-flex justify-content-between">
      <div className="m-2">
        <h2>
          <b>Map-a-thon</b>
        </h2>
        <h3>December 2023</h3>
      </div>
      <div className="m-3">
        <Widget
          src="mob.near/widget/Profile.ShortInlineBlock"
          props={{ accountId: "build.sputnik-dao.near" }}
        />
      </div>
    </div>

    <div className="m-2">
      <p>
        <i>
          This guide will help you create interactive maps, leveraging the power
          of open web components. No need to install or download anything. Just
          fork the <a href="/hack.near/widget/Map.demo">basic template</a> and
          follow instructions outlined here (and in the code comments).
        </i>
      </p>
    </div>
    <br />
    <div className="row">
      <div className="col-lg-3 b-e b-s">
        <a className="btn btn-success" href="/edit/hack.near/widget/Map.demo">
          BEGIN
        </a>
        {components.map(renderMenuItem)}
        {examples.map(renderExamplesItem)}
      </div>
      <div className="col-lg-9 b-e">
        <div>{components.map(renderComponent)}</div>
        <div>{examples.map(renderExample)}</div>
      </div>
    </div>
  </Wrapper>
);
