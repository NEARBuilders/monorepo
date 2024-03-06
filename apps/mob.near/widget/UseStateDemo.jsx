const [a, setA] = useState(() => {
  console.log("Init 'a'");
  return "Y";
});

const [b, setB] = useState("B");
const [sum, setSum] = useState(0);

useEffect(() => {
  setSum(a.length + b.length);
  return () => {
    console.log("cleanup");
  };
}, [a, b]);

return (
  <div>
    A = {a}
    <br />B = {b}
    <br />
    Length sum = {sum}
    <div>
      <button onClick={() => setA((s) => s + "O")}>A</button>
      <button onClick={() => setB(b + "O")}>B</button>
    </div>
  </div>
);
