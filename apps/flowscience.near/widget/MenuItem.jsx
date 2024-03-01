const item = props.item;

return (
  <div>
    <div>
      <img src={item.image} alt={item.alt} width="120" height="200"></img>
      <h2>{item.name}</h2>
      <p>{item.description}</p>
      <h3>{item.price}</h3>
      <span>{item.category}</span>
    </div>
  </div>
);
