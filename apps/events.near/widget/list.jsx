const { Item } = props;

if (!Item)
  Item = ({ item, onRemove }) => (
    <div>
      {item.id}
      <button onClick={() => onRemove(item.id)}>Remove</button>
    </div>
  );

const [items, setItems] = useState(props.items ?? []);

const handleAdd = () => {
  setItems([...items, { id: items.length }]);
};

const handleRemove = (id) => {
  setItems(items.filter((item) => item.id !== id));
};

return (
  <div>
    <button onClick={handleAdd}>Add Item</button>
    {items.map((item) => (
      <Item key={item.id} item={item} onRemove={handleRemove} />
    ))}
  </div>
);
