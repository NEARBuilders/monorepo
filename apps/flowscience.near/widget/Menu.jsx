const pizzaData = [
  {
    id: 1,
    category: "meat",
    name: "Pepperoni Pizzazz",
    description: "A dazzling display of pepperoni majesty on a crispy crust",
    price: "$15",
    image:
      "https://ipfs.io/ipfs/Qmar7EuchJancv5xbL7YPWByaxek8PBCBS467Q4s4oRDxg?filename=pepperoni.jpg",
    alt: "pepperoni pizza",
  },
  {
    id: 2,
    category: "meat",
    name: "Proud Pineapple",
    description:
      "Pineapple definitely goes on pizza. It's ok to disagree, you're allowed to be wrong",
    price: "$16",
    image:
      "https://ipfs.io/ipfs/QmbMbWf7k9QrjN6H6uJEwLEzHSU3mEQehBsCpsWMPYmgfk?filename=pineapple.jpg",
    alt: "pineapple pizza",
  },
  {
    id: 3,
    category: "vegetarian",
    name: "Very Veggie",
    description: "A collection of fresh veggies fit for a rabbit",
    price: "$18",
    image:
      "https://ipfs.io/ipfs/QmaXRPUt1pfAPrUjzrPUVVPqk1X1csxyK8LHPBVc2tEdDk?filename=veggie.jpg",
    alt: "vegetable pizza",
  },
];

return (
  <div>
    <h1>Welcome to Totally Ok Pizza Co.</h1>
    <h2>Take a look at our menu and select your favorites!</h2>
    <div>
      {pizzaData.map((item) => (
        <div key={item.id}>
          <Widget src="flowscience.near/widget/MenuItem" props={{ item }} />
        </div>
      ))}
    </div>
  </div>
);
