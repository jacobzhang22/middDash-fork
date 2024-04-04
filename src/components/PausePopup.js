"use client";

import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";
import { usePathname } from "next/navigation";

export default function ControlledPopup() {
  const path = usePathname();

  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);

  useEffect(() => {
    if (path !== "/dash") {
      setOpen(true);
    }
  }, [path]);

  return (
    <div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="modal w-[100%] md:w-[500px] h-[300px] bg-gray-50 flex justify-center items-center shadow-[rgba(0,0,1,0.2)_10px_10px_10px_1000px] rounded-md relative px-10 ">
          <a
            className="close absolute top-2 right-5 text-[30px] cursor-pointer "
            onClick={closeModal}
          >
            &times;
          </a>
          <div>
            <h1 className="text-[25px] font-bold text-center pb-5 ">
              Not currently accepting orders
            </h1>
            <h1 className="text-[15px] text-center py-5 ">
              We apologize for the inconvenience
            </h1>
            <h1 className="text-[15px] text-center ">
              We are short staffed. To help MiddDash provide delivery, please
              apply to become a dasher{" "}
              <a target="_blank" href="/dash" className="text-blue-500">
                here{" "}
              </a>
            </h1>
          </div>
        </div>
      </Popup>
    </div>
  );
}
