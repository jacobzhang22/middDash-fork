import { useState } from "react";

function PaymentConfirmationPopup({ onConfirm, subtotal }) {
  const [showPopup, setShowPopup] = useState(false);

  return (
    <div className="fixed bg-black/80 inset-0 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <div>
          {`You will have to venmo $${subtotal} to your dasher when they accept your order.`}
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
