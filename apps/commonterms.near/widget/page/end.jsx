const [theme, setTheme] = useState("dark");
const [name, setName] = useState("");

const createButton = () => {
  Social.set(
    {
      widget: {
        evaporation: {
          "": 'return <button onClick={() => console.log("do something")}>click</button>;',
        },
      },
    },
    { force }
  );
};

return (
  <>
    <p>share your favorite's winnings</p>
    <p>this is how it happens</p>
    <p>this is when it happens</p>
    <p>this is what happens next</p>
  </>
);
