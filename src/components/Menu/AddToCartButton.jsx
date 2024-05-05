// import FlyingButton from "react-flying-item";

const AddToCartButton = ({ hasSizesOrExtras, onClick, basePrice }) => {
  if (!hasSizesOrExtras) {
    return (
      // <div className="flying-button-parent mt-4">
      //   <FlyingButton targetTop={"5%"} targetLeft={"77%"} src="/menuimage.png">
          <button type="button" className="mt-4 bg-primary text-white rounded-full px-4 py-2" onClick={onClick}>Add to cart ₹{basePrice}</button>
        // </FlyingButton>
      // </div>
      
    );
  }
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-4 bg-primary text-white rounded-full px-4 py-2"
    >
      <span>Add to Cart (From ₹{basePrice})</span>
    </button>
  );
};

export default AddToCartButton;
