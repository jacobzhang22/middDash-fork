/* eslint-disable react/no-unescaped-entities */
const { default: SectionHeaders } = require("./SectionHeaders");

export default function LearnMore() {
  return (
    <section className="text-center my-16">
      <SectionHeaders mainHeader="Get Started" />
      <div className="text-gray-500 max-w-md mx-auto mt-4 flex flex-col gap-4">
        <p>
          <strong>1. Sign Up:</strong> Create an account or login with Google.
        </p>
        <p>
          <strong>2. Complete Your Profile:</strong> Enter in contact
          information and delivery details.
        </p>
        <p>
          <strong>3. Place Order:</strong> Browse through a wide selection of
          items from MiddXpress & The Grille.
        </p>
        <p>
          <strong>4. Dasher Accepts Order:</strong> A dedicated dasher ensures
          careful handling of your order.
        </p>
        <p>
          <strong>5. Venmo Dasher:</strong> Secure and hassle-free payment
          straight to your dasher.
        </p>
        <p>
          <strong>6. Enjoy Fast Delivery:</strong> Your order delivered in under
          15 minutes straight to your door.
        </p>
        <p>
          <strong>Need Help?:</strong> Our support team is ready to assist. Use
          the Report button down below for any issues.
        </p>
      </div>
    </section>
  );
}
