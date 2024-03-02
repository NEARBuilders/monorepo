const text = props.text ?? "Hello World";
const fontFamily = props.fontFamily ?? "Arial, sans-serif";
const fontSize = props.fontSize ?? "20px";
const textColor = props.textColor ?? "white";
const backgroundColor = props.backgroundColor ?? "black";
const height = props.height ?? "60px";
const width = props.width ?? "100%";

const code = `
    <style>
      body {
        margin: 0
      }

      .marquee {
        white-space: nowrap;
        overflow: hidden;
        position: relative;
        color: ${textColor};
        background-color: ${backgroundColor};
        font-family: ${fontFamily};
        font-size: ${fontSize};
        height: ${height};
        width: ${width};
        display: flex;
        align-items: center;
        justify-content: start;
      }

      .marquee span {
        display: inline-block;
        padding-left: 100%;
        animation: marquee 15s linear infinite;
      }

      @keyframes marquee {
        0% { transform: translate(0, 0); }
        100% { transform: translate(-100%, 0); }
      }
    </style>

    <div class="marquee">
      <span>${text}</span>
    </div>
  `;

return (
  <iframe className="w-100" srcDoc={code} style={{ height, backgroundColor }} />
);
