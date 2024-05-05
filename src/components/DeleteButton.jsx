"use client";

import { useState } from "react";

const DeleteButton = ({ label, onDelete, iscategory }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  if (showConfirm) {
    return (
      <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center z-10">
        <div className="bg-white p-4 rounded-lg text-lg">
          {iscategory && (
            <div>
              If you delete this category, all items linked with will also get deleted.
            </div>
          )}
          <div className="flex justify-center items-center">Are you sure you want to delete ?</div>
          <div className="flex gap-2 mt-1">
            <button type="button" onClick={() => setShowConfirm(false)}>
              Cancel
            </button>
            <button
              onClick={() => {
                onDelete();
                setShowConfirm(false);
              }}
              type="button"
              className="primary"
            >
              Yes,&nbsp;delete!
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button type="button" onClick={() => setShowConfirm(true)} className="hover:bg-slate-200">
      {label}
    </button>
  );
};

export default DeleteButton;
