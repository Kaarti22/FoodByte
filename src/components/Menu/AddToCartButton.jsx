const AddToCartButton = ({ hasSizesOrExtras, onClick, basePrice }) => {
  if (!hasSizesOrExtras) {
    return (
      <button
        type="button"
        className="mt-4 bg-primary text-white rounded-full px-4 py-2 hover:bg-blue-400 w-full"
        onClick={onClick}
      >
        Add to cart ₹{basePrice}
      </button>
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-4 py-2 hover:bg-blue-400 w-full"
    >
      <span>Add to Cart (From ₹{basePrice})</span>
    </button>
  );
};

export default AddToCartButton;