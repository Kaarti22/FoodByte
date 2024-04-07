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

  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: logginInUserData } = useProfile();

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
        <div className="bg-gray-200 p-4 rounded-3xl">
          <Image
            src={"/Avatar.jpg"}
            width={128}
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
        <label>First And Last Name</label>
        <input
          type="text"
          placeholder="First and last Name"
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
        {logginInUserData.admin && (
          <div>
            <label
              className="p-2 inline-flex items-center gap-2 mb-2"
              htmlFor="adminCb"
            >
              <input
                id="adminCb"
                type="checkbox"
                className=""
                value={"1"}
                checked={admin}
                onClick={(ev) => setAdmin(ev.target.checked)}
              />
              <span>Admin</span>
            </label>
          </div>
        )}
        <button type="submit" className="hover:bg-red-400 rounded-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default Userform;
