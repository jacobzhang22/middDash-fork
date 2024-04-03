import { useState } from "react";

function PaymentConfirmationPopup({ onConfirm, subtotal }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg max-w-[660px] text-center ">
        <div>
          <div className="text-[20px]">
            Your order will be submitted to the queue.
          </div>
          <div>
            You will get a notification when it has been{" "}
            <strong>accepted and placed </strong> by the dasher.
            <br />
            You will be venmo requested ${subtotal} by your dasher when they
            accept your order.
          </div>
          <div className="text-[20px]">
            You can cancel your order at any time <strong>before</strong> it has
            been accepted
          </div>
        </div>
        <div className="flex gap-2 mt-2">
          <button
            type="button"
            onClick={() => {
              onConfirm();
              setShowPopup(false);
            }}
            className="primary"
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}

export default PaymentConfirmationPopup;
