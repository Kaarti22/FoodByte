"use client";

import { useState as state } from "react";

const updateAdmin = ({label, onUpdate, user}) => {

    const [showConfirm, setShowConfirm] = state(false);

    if(showConfirm){
        return (
            <div className="fixed bg-black/80 inset-0 flex items-center h-full justify-center z-10">
                <div className="bg-white p-4 rounded-lg text-lg">
                    <div className="flex justify-center items-center">
                        Are you sure you want to update this user role ?
                    </div>
                    <div className="flex gap-2 mt-1">
                        <button type="button" onClick={() => setShowConfirm(false)}>
                            Cancel
                        </button>
                        <button onClick={(ev) => {
                            onUpdate(ev, user);
                            setShowConfirm(false);
                        }}>
                            Yes,&nbsp; update!
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <button type="button" onClick={() => setShowConfirm(true)}>
            {label}
        </button>
    )
}

export default updateAdmin;