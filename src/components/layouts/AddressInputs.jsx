const AddressInputs = ({addressProp, setAddressProp}) => {
    const {phoneno, streetaddress, pincode, city, country} = addressProp;
  return (
    <>
      <label>Phone Number</label>
      <input
        type="tel"
        placeholder="Phone Number"
        value={phoneno}
        onChange={(ev) => setAddressProp('phoneno', ev.target.value)}
      />
      <label>Street Address</label>
      <input
        type="text"
        placeholder="Street Address"
        value={streetaddress}
        onChange={(ev) => setAddressProp('streetaddress', ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>PIN Code</label>
          <input
            type="text"
            placeholder="PIN Code"
            value={pincode}
            onChange={(ev) => setAddressProp('pincode', ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp('city', ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProp('country', ev.target.value)}
      />
    </>
  );
};

export default AddressInputs;
