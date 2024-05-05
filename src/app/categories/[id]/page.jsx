"use client";

import { useEffect , useState } from "react";
import { UserTabs } from "@/components/layouts/UserTabs";
import { useProfile as profile} from "@/components/UseProfile";
import { redirect, useParams , useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
// import Image from "next/legacy/image";
import { Image } from "cloudinary-react";
import DeleteButton from "@/components/DeleteButton";

const individualCategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { loading: profileLoading, data: profileData } = profile();
  const [editedCategory, setEditedCategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [categoryname, setCategoryName] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  let imageURL = "";

  useEffect(() => {
    fetch("/api/Categories").then((res) => {
      res.json().then((categories) => {
        const category = categories.find((i) => i._id === id);
        setCategory(category);
        setCategoryName(category?.name);
        setEditedCategory(category);
      });
    });
    fetch("/api/menuitems").then((res) => {
      res.json().then((menuItems) => {
        const filteredMenuItems = menuItems.filter((i) => i.category === id);
        setMenuItems(filteredMenuItems);
      });
    });
  }, []);

  async function handleCategorySubmit(ev) {
    ev.preventDefault();
    const creationPromise = new Promise(async (resolve, reject) => {
      const data = { name: categoryname };
      if (editedCategory) data._id = editedCategory._id;
      const response = await fetch("/api/Categories", {
        method: editedCategory ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) resolve();
      else reject();
    });

    await toast.promise(creationPromise, {
      loading: editedCategory
        ? "Updating the category..."
        : "Creating your new Category...",
      success: editedCategory
        ? "Updated category successfully"
        : "Category created successfully",
      error: "Error Occurred!..",
    });

    router.refresh();
  }

  const handleDeleteClick = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response1 = await fetch("/api/Categories?_id=" + _id, {
        method: "DELETE",
      });
      menuItems.forEach(async (menuItem) => {
        const response2 = await fetch("/api/menuitems?_id=" + menuItem._id, {
          method: "DELETE",
        });
        if (response2.ok) {
          resolve();
        } else {
          reject();
        }
      });
      if (response1.ok) {
        resolve();
      } else {
        reject();
      }
    });

    toast.promise(promise, {
      loading: "Deleting...",
      success: "Deleted...",
      error: "Error",
    });

    router.push("/categories");
  };

  if (profileLoading) {
    return "Loading User Profile";
  }

  if (!profileData.admin) {
    return "Not an Admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isadmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              <div className="flex gap-1">
                <div>Update Category</div>
              </div>
            </label>
            <input
              type="text"
              value={categoryname}
              onChange={(ev) => setCategoryName(ev.target.value)}
            />
          </div>
          <div className="pb-2 flex gap-2">
            <button className="border border-primary" type="submit">
              {editedCategory ? "Update" : "Create"}
            </button>
            <DeleteButton
              label={"Delete"}
              iscategory={true}
              onDelete={() => handleDeleteClick(category._id)}
            />
          </div>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-2 mt-8">
        {menuItems?.length > 0 &&
          menuItems.map((item) => {

            imageURL = item?.imageURL;

            return (
              <Link
                key={item._id}
                href={"/menuitems/edit/" + item._id}
                className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center"
              >
                <Image
                  cloudName="duyvi6pzk"
                  publicId={imageURL}
                  className="w-20 h-20 rounded-full"
                />
                <div className="text-center mt-2">{item.name}</div>
              </Link>
            ) 
          })}
      </div>
    </section>
  );
};

export default individualCategoryPage;
