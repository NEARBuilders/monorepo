/*
---props---

props.a: string ("bozon.near/widget/PrivateMailBox@86202305")

props.b: string ("bozon.near/widget/PrivateMailBox@76092781")

props.findUniqueResult(
  lineCountDeleted: number, 
  lineCountInserted: inserted,
  lineCountCurrentCode: number,
  lineCountPrevCode: number,
  allLineCount: number
)?: function

props.showLineNumber?: bool

*/
let { a, b } = props;

if (!a || !b) return "require props.a and props.b";

function split(src) {
  const parts = src.split("@");
  return { src: parts[0], blockHeight: parseInt(parts[1]) || "final" };
}

a = split(a);
b = split(b);
console.log(a, b);

a.code = Social.get(a.src, a.blockHeight);
b.code = Social.get(b.src, b.blockHeight);

if (a.code === null || b.code === null) {
  return "Loading";
}

return (
  <Widget
    src="bozon.near/widget/CodeDiff"
    props={{ currentCode: b.code, prevCode: a.code, ...props }}
  />
);
