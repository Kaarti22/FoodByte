"use client";
import { UserTabs } from "@/components/layouts/UserTabs";
import { useEffect, useState } from "react";
import { useProfile } from "@/components/UseProfile";
import toast from "react-hot-toast";
import DeleteButton from "@/components/DeleteButton";

export default function CategoriesPage() {
  const { loading: profileLoading, data: profileData } = useProfile();
  const [categories, setCategories] = useState([]);
  const [categoryname, setCategoryName] = useState("");
  const [editedCategory, setEditedCategory] = useState(null);

  useEffect(() => {
    fetchcategories();
  }, []);

  function fetchcategories() {
    fetch("/api/Categories").then((req) => {
      req.json().then((categories) => {
        setCategories(categories);
      });
    });
  }

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
      setCategoryName("");
      fetchcategories();
      setEditedCategory(null);

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
  }

  const handleDeleteClick = async (_id) => {
    const promise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/Categories?_id=" + _id, {
        method: "DELETE",
      });
      if (response.ok) {
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

    fetchcategories();
  };

  if (profileLoading) {
    return "Loading User Profile";
  }

  if (!profileData.admin) {
    return "Not an Admin";
  }

  return (
    <section className="mt-8 max-w-xl mx-auto">
      <UserTabs isadmin={true} />
      <form className="mt-8" onSubmit={handleCategorySubmit}>
        <div className="flex gap-2 items-end">
          <div className="grow">
            <label>
              <div className="flex gap-1">
                <div>
                  {editedCategory ? "Update Category" : "New Category Name"}
                </div>
                <div>
                  {editedCategory && <div>: {editedCategory.name}</div>}
                </div>
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
            <button
              type="button"
              onClick={() => {
                setEditedCategory(null);
                setCategoryName("");
              }}
            >
              Cancel
            </button>
          </div>
        </div>
      </form>
      <div>
        <h2 className="mt-8 text-gray-900 text-base">Existing categories: </h2>
        {categories?.length > 0 &&
          categories.map((c) => (
            <div className="bg-gray-100 rounded-xl p-2 px-4 flex gap-1 mb-1 items-center">
              <div className="grow">{c.name}</div>
              <div className="flex gap-1">
                <button
                  type="button"
                  onClick={() => {
                    setEditedCategory(c);
                    setCategoryName(c.name);
                  }}
                >
                  Edit
                </button>
                <DeleteButton
                  label={"Delete"}
                  onDelete={() => handleDeleteClick(c._id)}
                />
              </div>
            </div>
          ))}
      </div>
    </section>
  );
}
