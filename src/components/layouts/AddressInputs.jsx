export default function AddressInputs({addressProp = {}, setAddressProp, disabled=false}) {

    const { pincode, city, country, phoneno, streetaddress,} = addressProp;
  return (
    <>
      <label>Phone Number</label>
      <input
        disabled={disabled}
        type="tel"
        placeholder="Phone Number"
        value={phoneno}
        onChange={(ev) => setAddressProp('phoneno', ev.target.value)}
      />
      <label>Street Address</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Street Address"
        value={streetaddress}
        onChange={(ev) => setAddressProp('streetaddress', ev.target.value)}
      />
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label>PIN Code</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="PIN Code"
            value={pincode}
            onChange={(ev) => setAddressProp('pincode', ev.target.value)}
          />
        </div>
        <div>
          <label>City</label>
          <input
            disabled={disabled}
            type="text"
            placeholder="City"
            value={city}
            onChange={(ev) => setAddressProp('city', ev.target.value)}
          />
        </div>
      </div>
      <label>Country</label>
      <input
        disabled={disabled}
        type="text"
        placeholder="Country"
        value={country}
        onChange={(ev) => setAddressProp('country', ev.target.value)}
      />
    </>
  );
}
