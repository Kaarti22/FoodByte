"use client";

import Image from "next/legacy/image";
import { useState } from "react";
import { useProfile } from "../UseProfile";
import AddressInputs from "./AddressInputs";

const Userform = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [phoneno, setPhoneno] = useState(user?.phoneno || "");
  const [pincode, setPINcode] = useState(user?.pincode || "");
  const [streetaddress, setStreetAddress] = useState(user?.streetaddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

  const handleAddressChange = (propName, value) => {
    if(propName === 'phoneno') setPhoneno(value);
    if(propName === 'pincode') setPINcode(value);
    if(propName === 'streetaddress') setStreetAddress(value);
    if(propName === 'city') setCity(value);
    if(propName === 'country') setCountry(value);
  }

  return (
    <div className="flex gap-2">
      <div>
        <div className="bg-gray-200 rounded-full">
          <Image
            src={"/profilepic.png"}
            width={130}
            height={128}
            alt="avatar"
            className="mx-auto rounded-full "
          />
        </div>
      </div>
      <form
        className="grow"
        onSubmit={ev =>
          onSave(ev, {
            name: userName,
            phoneno,
            pincode,
            admin,
            streetaddress,
            city,
            country,
          })
        }
      >
        <label>Full Name</label>
        <input
          type="text"
          placeholder="Enter your name"
          value={userName}
          onChange={(ev) => setUserName(ev.target.value)}
        />
        <label>Email</label>
        <input
          type="email"
          disabled={true}
          value={user?.email}
          placeholder={"Email"}
        />
        <AddressInputs addressProp={{
          phoneno, streetaddress, pincode, city, country
        }} setAddressProp={handleAddressChange}/>
        <button type="submit" className="hover:bg-blue-400 rounded-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default Userform;
