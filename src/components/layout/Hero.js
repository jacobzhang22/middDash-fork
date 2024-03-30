import Image from "next/image";
import Link from "next/link";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="flex flex-wrap mt-4">
      <div className="flex-1 py-12">
        {" "}
        {/* Adjusted this line to use flex-1 */}
        <h1 className="text-4xl font-semibold">
          Delivering straight
          <br />
          to your door from the Grille!
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Stock up on your favorite grille foods, snacks, or drinks all
          delivered in under 15 minutes!
        </p>
        <div className="flex justify-center items-center gap-4 text-sm">
          <Link
            className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full cursor-pointer w-full"
            href="/menu"
          >
            Order now
            <Right />
          </Link>
          <Link
            className="flex items-center border-0 uppercase gap-2 py-2 text-gray-600 font-semibold w-full"
            href="/#get-started"
          >
            Learn more
            <Right />
          </Link>
        </div>
        <div>
          <p className="mt-8 font-bold">
            NOTE: DELIVERY FEES WILL TEMPORARILY BE $5 TO LIMIT ORDERS TO NOT
            OVERWHELM THE GRILLE STAFF. WE WILL LOWER THE COST ONCE THE GRILLE
            THE GRILLE IS OPERATING AT 100%. ORDERS MAY BE TEMPORARILY FROZEN.
          </p>
        </div>
      </div>
      <div className="flex-none md:flex justify-center items-center hidden md:w-[400px]">
        {" "}
        {/* Adjusted this line to use flex-none and fixed width */}
        <Image
          src="/midd_panther2.png"
          alt="panther"
          width={300}
          height={300}
        />
      </div>
    </section>
  );
}
