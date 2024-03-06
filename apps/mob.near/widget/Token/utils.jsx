const bigToString = (b, p, len) => {
  if (b === null || b === undefined) {
    return "???";
  }
  b = Big(b);
  let s = b.toFixed();
  let pos = s.indexOf(".");
  p = p || 6;
  len = len || 7;
  if (pos > 0) {
    let ap = Math.min(p, Math.max(len - pos, 0));
    if (ap > 0) {
      ap += 1;
    }
    if (pos + ap < s.length) {
      s = s.substring(0, pos + ap);
    }
  } else {
    pos = s.length;
  }
  for (let i = pos - 4; i >= 0; i -= 3) {
    s = s.slice(0, i + 1) + "," + s.slice(i + 1);
  }

  if (s === "0.000000" && p === 6 && len === 7) {
    return "<0.000001";
  }

  return s;
};

function MutedDecimals(props) {
  const value = props.value;

  const dotPos = value.indexOf(".");
  if (dotPos > 0) {
    return (
      <span className="d-inline-flex">
        {value.charAt(0) === "<" ? (
          <>
            <span className="text-secondary">{"<"}</span>
            {value.substring(1, dotPos)}
          </>
        ) : (
          value.substring(0, dotPos)
        )}
        <span className="text-secondary">{value.substring(dotPos)}</span>
      </span>
    );
  }
  return value;
}

return { bigToString, MutedDecimals };
