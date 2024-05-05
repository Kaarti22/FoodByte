"use client";

// import Image from "next/legacy/image";
import { Image } from "cloudinary-react";
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
  const [profileImage, setProfileImage] = useState(user?.profileImage || "");

  const handleAddressChange = (propName, value) => {
    if (propName === "phoneno") setPhoneno(value);
    if (propName === "pincode") setPINcode(value);
    if (propName === "streetaddress") setStreetAddress(value);
    if (propName === "city") setCity(value);
    if (propName === "country") setCountry(value);
  };

  // console.log(profileImage);

  const uploadImage = async (ev) => {
    const files = ev.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "n19id3qw");

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/duyvi6pzk/image/upload`,
      {
        method: "POST",
        body: data,
      }
    );

    const file = await res.json();

    setProfileImage(file.secure_url);
  };

  return (
    <div className="md:flex gap-6">
      <div className="w-[20%]">
        {!profileImage && (
          <div className="flex items-center justify-center w-full mt-2">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-2xl cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-3">
                <svg
                  className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <div className="mb-2 text-sm text-gray-500 dark:text-gray-400 flex flex-col gap-0.5 justify-center items-center">
                  <span>Upload</span>
                  <span>your photo</span>
                </div>
              </div>
              <input
                id="dropzone-file"
                type="file"
                className="hidden"
                onChange={uploadImage}
              />
            </label>
          </div>
        )}
        {profileImage && (
          <div className="flex flex-col items-center gap-2 justify-between">
            <Image
              cloudName="duyvi6pzk"
              publicId={profileImage}
              className="w-32 h-32 rounded-full mt-2 overflow-hidden"
            />
            <button
              className="w-20 h-10 flex items-center justify-center text-sm"
              onClick={() => setProfileImage("")}
            >
              Remove
            </button>
          </div>
        )}
      </div>
      <form
        className="grow"
        onSubmit={(ev) =>
          onSave(ev, {
            name: userName,
            phoneno,
            pincode,
            streetaddress,
            city,
            country,
            profileImage,
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
        <AddressInputs
          addressProp={{
            phoneno,
            streetaddress,
            pincode,
            city,
            country,
          }}
          setAddressProp={handleAddressChange}
        />
        <button type="submit" className="hover:bg-blue-400 rounded-full">
          Save
        </button>
      </form>
    </div>
  );
};

export default Userform;