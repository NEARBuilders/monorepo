const items = JSON.parse(
  Storage.get("demo-cart-items", "efiz.near/widget/ShoppingCartDemo.list") ||
    "null"
);

return (
  <div className="border">
    <p>Cart: {items.length || 0}</p>
  </div>
);
