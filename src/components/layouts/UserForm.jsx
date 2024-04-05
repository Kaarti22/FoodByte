"use client";

import Image from "next/legacy/image";
import { useState } from "react";
import { useProfile } from "../UseProfile";

const Userform = ({ user, onSave }) => {
  const [userName, setUserName] = useState(user?.name || "");
  const [phoneno, setPhoneno] = useState(user?.phoneno || "");
  const [pincode, setPINcode] = useState(user?.pincode || "");
  const [streetaddress, setStreetAddress] = useState(user?.streetAddress || "");
  const [city, setCity] = useState(user?.city || "");
  const [country, setCountry] = useState(user?.country || "");

  const [admin, setAdmin] = useState(user?.admin || false);

  const { data: logginInUserData } = useProfile();

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
        onSubmit={(ev) =>
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
        <label>Phone Number</label>
        <input
          type="tel"
          placeholder="Phone Number"
          value={phoneno}
          onChange={(ev) => setPhoneno(ev.target.value)}
        />
        <label>Street Address</label>
        <input
          type="text"
          placeholder="Street Address"
          value={streetaddress}
          onChange={(ev) => setStreetAddress(ev.target.value)}
        />
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label>PIN Code</label>
            <input
              type="text"
              placeholder="PIN Code"
              value={pincode}
              onChange={(ev) => setPINcode(ev.target.value)}
            />
          </div>
          <div>
            <label>City</label>
            <input
              type="text"
              placeholder="City"
              value={city}
              onChange={(ev) => setCity(ev.target.value)}
            />
          </div>
        </div>
        <label>Country</label>
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(ev) => setCountry(ev.target.value)}
        />
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
