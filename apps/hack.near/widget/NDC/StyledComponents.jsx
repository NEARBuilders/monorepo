const { Button, Dropdown, TextArea, Input, Link, Tag, _contract } = props;

const contract = _contract ?? "hack.near";

const Styled = {
  Button: styled.button`
    width: max-content;
    padding: ${(props) => (Button.size === "sm" ? "4px 12px" : "8px 20px")};
    height: ${(props) => (Button.size === "sm" ? "28px" : "")};
    font-size: ${(props) => (Button.size === "sm" ? "12px" : "14px")};
    border-radius: ${(props) => (Button.size === "sm" ? "6px" : "10px")};
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    border: 0;

    &.primary {
      background: #ffd50d;

      &:hover {
        background: #e7c211;
      }

      &.dark {
        color: #fff;
        background: #4ba6ee;

        &:hover {
          background: #3b86cb;
        }
      }

      &:disabled {
        cursor: not-allowed;
        background: #c3cace;
        color: #828688;
        border: 0;

        &:hover {
          background: #c3cace;
          color: #828688;
        }
      }

      &.danger {
        background: #dd5e56;
        color: #fff;

        &:hover {
          background: #c23f38;
        }
      }
    }

    &.secondary {
      background: transparent;
      border: 1px solid;
      border-color: ${(props) => (Button.inverse ? "#fff" : "#ffd50d")};
      color: ${(props) => (Button.inverse ? "#fff" : "#ffd50d")};

      &:hover {
        border-color: ${(props) => (Button.inverse ? "#fff" : "#e7c211")};
        color: ${(props) => (Button.inverse ? "#fff" : "#e7c211")};
      }

      &.dark {
        border-color: ${(props) => (Button.inverse ? "#fff" : "#4BA6EE")};
        color: ${(props) => (Button.inverse ? "#fff" : "#4BA6EE")};

        &:hover {
          border-color: ${(props) => (Button.inverse ? "#fff" : "#3B86CB")};
          color: ${(props) => (Button.inverse ? "#fff" : "#3B86CB")};
        }
      }

      &.danger {
        border: 1px solid #dd5e56;
        color: #dd5e56;

        &:hover {
          border-color: #c23f38;
          color: #c23f38;
        }
      }

      &:disabled {
        border-color: #c3cace;
        color: #828688;
        cursor: not-allowed;

        &:hover {
          border-color: #c3cace;
          color: #828688;
        }
      }
    }

    i {
      margin: 0;
    }
  `,

  Link: styled.a`
    width: max-content;
    padding: ${(props) => (Link.size === "sm" ? "4px 12px" : "8px 20px")};
    height: ${(props) => (Link.size === "sm" ? "28px" : "")};
    font-size: ${(props) => (Link.size === "sm" ? "12px" : "14px")};
    border-radius: ${(props) => (Link.size === "sm" ? "6px" : "10px")};
    font-weight: 500;
    line-height: 24px;
    text-align: center;
    border: 0;
    color: black;

    &:hover {
      text-decoration: none;
      color: black;
    }

    &.primary {
      background: #ffd50d;

      &:hover {
        background: #e7c211;
      }

      &.dark {
        color: #fff;
        background: #4ba6ee;

        &:hover {
          background: #3b86cb;
        }
      }

      &.danger {
        background: #dd5e56;
        color: #fff;

        &:hover {
          background: #c23f38;
        }
      }

      &:disabled {
        background: #c3cace;
        color: #828688;
        border: 0;
      }
    }

    &.secondary {
      background: transparent;
      border: 1px solid;
      border-color: ${(props) => (Link.inverse ? "#fff" : "#ffd50d")};
      color: ${(props) => (Link.inverse ? "#fff" : "#ffd50d")};

      &:hover {
        border-color: ${(props) => (Link.inverse ? "#fff" : "#e7c211")};
        color: ${(props) => (Link.inverse ? "#fff" : "#e7c211")};
      }

      &.dark {
        border-color: ${(props) => (Link.inverse ? "#fff" : "#4BA6EE")};
        color: ${(props) => (Link.inverse ? "#fff" : "#4BA6EE")};

        &:hover {
          border-color: ${(props) => (Link.inverse ? "#fff" : "#3B86CB")};
          color: ${(props) => (Link.inverse ? "#fff" : "#3B86CB")};
        }
      }

      &.danger {
        border: 1px solid #dd5e56;
        color: #dd5e56;

        &:hover {
          border-color: #c23f38;
          color: #c23f38;
        }
      }

      &:disabled {
        border-color: #c3cace;
        color: #828688;
      }
    }

    i {
      margin: 0;
      margin-left: ${(props) => (Link.text ? "5px" : "0")};
    }
  `,

  Select: styled.select`
    padding: 8px 10px;
    width: 100%;
    height: 40px;
    background: #ffffff;
    border: 1px solid #d0d6d9;
    border-radius: 8px;
    font-size: 14px;
    color: #828688;
  `,
  TextArea: styled.textarea`
    padding: 8px 10px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d0d6d9;
    border-radius: 8px;
    font-size: 14px;
    color: #828688;
  `,
  Input: styled.input`
    padding: 8px 10px;
    width: 100%;
    background: #ffffff;
    border: 1px solid #d0d6d9;
    border-radius: 8px;
    font-size: 14px;
    color: #828688;
  `,
  Tag: styled.div`
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    padding: 4px 8px;
    border: 1px solid #4ba6ee;
    color: #4ba6ee;
    border-radius: 100px;

    &.dark {
      color: #fff;
      background: #4ba6ee;
    }

    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      max-width: 150px;
      font-style: normal;
      font-weight: 500;
      font-size: 11px;
      line-height: 120%;
      margin-bottom: 0;
    }
  `,
};

const Container = styled.div`
  h4 {
    margin: 10px 0;
  }
`;

const Label = styled.label`
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 5px;
`;

if (Link)
  return (
    <Styled.Link
      size={Link.size}
      className={`align-items-center d-flex ${
        Link.className ?? "primary"
      } gap-1`}
      href={Link.href}
      target="_blank"
      disabled={Link.disabled}
      inverse={Link.inverse}
    >
      {Link.text && <div>{Link.text}</div>}
      {Link.icon && (
        <div className={`${Link.size === "sm" ? "fs-7" : "fs-6"}`}>
          {Link.icon}
        </div>
      )}
    </Styled.Link>
  );

if (Button)
  return (
    <Styled.Button
      size={Button.size}
      className={`align-items-center d-flex ${
        Button.className ?? "primary"
      } gap-1`}
      onClick={Button.onClick}
      disabled={Button.disabled}
      text={Button.text}
      inverse={Button.inverse}
    >
      {Button.text && <div>{Button.text}</div>}
      {Button.icon && (
        <div className={`${Button.size === "sm" ? "fs-7" : "fs-6"}`}>
          {Button.icon}
        </div>
      )}
      {Button.image && (
        <Widget
          src="mob.near/widget/Image"
          props={{
            image: { url: Button.image.url },
            alt: Button.image.alt ?? "",
            style: {
              height: "20px",
              objectFit: "cover",
              margin: "0 0 3px 3px",
            },
            fallbackUrl:
              "https://ipfs.near.social/ipfs/bafkreibmiy4ozblcgv3fm3gc6q62s55em33vconbavfd2ekkuliznaq3zm",
          }}
        />
      )}
    </Styled.Button>
  );

if (Tag)
  return (
    <Styled.Tag className={Tag.className}>
      <p title={Tag.title}>{Tag.title}</p>
    </Styled.Tag>
  );

if (Dropdown)
  return (
    <div>
      <Label>{Dropdown.label}</Label>
      <Styled.Select
        value={Dropdown.value}
        onChange={(e) => Dropdown.handleChange(e.target.value)}
      >
        {Dropdown.options.map((opt) => (
          <>
            {opt.default ? (
              <option default value={opt.value}>
                {opt.title}
              </option>
            ) : (
              <option value={opt.value}>{opt.title}</option>
            )}
          </>
        ))}
      </Styled.Select>
    </div>
  );

if (TextArea)
  return (
    <div>
      {TextArea.label && <Label>{TextArea.label}</Label>}
      <Styled.TextArea
        value={TextArea.value}
        placeholder={TextArea.placeholder}
        onChange={TextArea.handleChange}
        rows={5}
      />
      {TextArea.maxLength && (
        <div className="d-flex justify-content-end">
          <small style={{ fontSize: 12 }} className="text-secondary">
            {parseInt(TextArea.maxLength) - TextArea.value.length ?? 0} left
          </small>
        </div>
      )}
    </div>
  );

if (Input)
  return (
    <div>
      <Label>{Input.label}</Label>
      <Styled.Input
        value={Input.value}
        type={Input.type ?? "text"}
        placeholder={Input.placeholder}
        onChange={Input.handleChange}
        maxLength={Input.maxLength}
        min={Input.min}
        max={Input.max}
      />

      {Input.maxLength && (
        <div className="d-flex justify-content-end">
          <small style={{ fontSize: 12 }} className="text-secondary">
            {parseInt(Input.maxLength) - Input.value.length ?? 0} left
          </small>
        </div>
      )}
    </div>
  );

const WidgetButton = ({
  type,
  size,
  className,
  disabled,
  text,
  icon,
  image,
  inverse,
}) => (
  <Widget
    src={`${contract}/widget/NDC.StyledComponents`}
    props={{
      [type ?? "Button"]: {
        size,
        className,
        disabled,
        inverse,
        text,
        icon,
        image,
      },
    }}
  />
);

const WidgetSelect = () => (
  <Widget
    src={`${contract}/widget/NDC.StyledComponents`}
    props={{
      Dropdown: {
        label: "Select label",
        options: [
          { title: "Select value", default: true, value: 0 },
          { title: "value 1", value: 1 },
          { title: "value 2", value: 2 },
        ],
      },
    }}
  />
);

const WidgetInput = ({ type }) => {
  State.init({ [type]: "" });

  return (
    <Widget
      src={`${contract}/widget/NDC.StyledComponents`}
      props={{
        [type]: {
          label: "Select label",
          placeholder: "Placeholder text here...",
          maxLength: "20",
          min: new Date(),
          value: state[type],
          handleChange: (e) => State.update({ [type]: e.target.value }),
        },
      }}
    />
  );
};

return (
  <Container>
    <h4>Button</h4>
    <div className="d-flex align-items-end flex-wrap gap-2 mb-2">
      <WidgetButton text="Primary" />
      <WidgetButton text="Primary" icon={<i class="bi bi-check-lg"></i>} />
      <WidgetButton
        text="Secondary"
        className="secondary"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton
        text="Secondary"
        className="secondary"
        image={{
          url: "https://bafkreieynbjyuycbo7naqp5dtiajcsmpiwyt7n2mk35746463nkcjte2yy.ipfs.nftstorage.link/",
        }}
      />
      <WidgetButton disabled text="Primary" />
      <WidgetButton disabled className="secondary" text="Secondary" />
      <WidgetButton size="sm" text="Primary" />
      <WidgetButton size="sm" className="secondary" text="Secondary" />
    </div>

    <div className="d-flex align-items-end flex-wrap gap-2 mb-2">
      <WidgetButton text="Primary Dark" className="primary dark" />
      <WidgetButton
        text="Primary Dark"
        className="primary dark"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton
        text="Secondary Dark"
        className="secondary dark"
        icon={<i class="bi bi-check-lg"></i>}
      />
      <WidgetButton disabled className="primary dark" text="Primary dark" />
      <WidgetButton disabled className="secondary dark" text="Secondary dark" />
      <WidgetButton size="sm" className="primary dark" text="Primary dark" />
      <WidgetButton
        size="sm"
        className="secondary dark"
        text="Secondary dark"
      />
    </div>

    <div className="d-flex align-items-end flex-wrap gap-2 mb-2">
      <WidgetButton
        text="Danger"
        className="danger"
        icon={<i class="bi bi-trash" />}
      />
      <WidgetButton
        text="Danger"
        className="danger secondary"
        icon={<i class="bi bi-trash" />}
      />
      <WidgetButton
        text="Danger"
        className="danger primary"
        icon={<i class="bi bi-trash" />}
      />
    </div>

    <div className="d-flex align-items-end flex-wrap gap-2 mb-2">
      <WidgetButton
        size="sm"
        className="secondary dark"
        icon={<i class="bi bi-share"></i>}
      />
      <WidgetButton
        disabled
        size="sm"
        className="secondary dark"
        icon={<i class="bi bi-share"></i>}
      />
    </div>

    <h4>Link Button</h4>
    <div className="d-flex align-items-end flex-wrap gap-2">
      <WidgetButton type="Link" text="Primary" className="primary dark" />
      <WidgetButton type="Link" text="Secondary" className="secondary dark" />
      <div className="bg-dark">
        <WidgetButton
          type="Link"
          text="Secondary"
          inverse={true}
          className="secondary dark"
        />
      </div>
    </div>

    <h4>Tag</h4>
    <div className="d-flex align-items-end flex-wrap gap-2 mb-2">
      <Widget
        src={`${contract}/widget/NDC.StyledComponents`}
        props={{ Tag: { title: "Lorem ipsum", className: "dark" } }}
      />
      <Widget
        src={`${contract}/widget/NDC.StyledComponents`}
        props={{ Tag: { title: "Lorem ipsum" } }}
      />
      <Widget
        src={`${contract}/widget/NDC.StyledComponents`}
        props={{
          Tag: {
            title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
          },
        }}
      />
    </div>

    <h4>Select</h4>
    <WidgetSelect />

    <h4>Input</h4>
    <WidgetInput type="Input" />
    <WidgetInput type="TextArea" />
  </Container>
);
