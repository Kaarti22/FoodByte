"use client";

import { useEffect, useState } from "react";
import { UserTabs } from "@/components/layouts/UserTabs";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import Link from "next/link";
import { Image } from "cloudinary-react";
import DeleteButton from "@/components/DeleteButton";
import { useParams, useRouter } from "next/navigation";

const IndividualCategoryPage = () => {
  const { id } = useParams();
  const router = useRouter();
  const { loading: profileLoading, data: profileData } = useProfile();
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
  }, [id]);

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

    router.replace(router.asPath);
  }

  const handleDeleteClick = async (_id) => {
    try {
      await fetch(`/api/Categories/${_id}`, {
        method: "DELETE",
      });
      const promises = menuItems.map(async (menuItem) => {
        await fetch(`/api/menuitems/${menuItem._id}`, {
          method: "DELETE",
        });
      });
      await Promise.all(promises);
      toast.success("Deleted...");
      router.push("/categories");
    } catch (error) {
      toast.error("Error");
    }
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
                legacyBehavior
              >
                <a className="bg-gray-200 rounded-lg p-4 flex flex-col justify-center items-center">
                  <Image
                    cloudName="duyvi6pzk"
                    publicId={imageURL}
                    className="w-20 h-20 rounded-full"
                  />
                  <div className="text-center mt-2">{item.name}</div>
                </a>
              </Link>
            ) 
          })}
      </div>
    </section>
  );
};

export default IndividualCategoryPage;
