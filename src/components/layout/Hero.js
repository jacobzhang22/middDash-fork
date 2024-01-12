import Image from "next/image";
import Link from "next/link";
import Right from "../icons/Right";

export default function Hero() {
  return (
    <section className="hero mt-4">
      <div className="py-12">
        <h1 className="text-4xl font-semibold">
          Delivering straight
          <br />
          to your door from MiddXpress!
        </h1>
        <p className="my-6 text-gray-500 text-sm">
          Stock up on your favorite grille foods, snacks, or candies all
          delivered in under 15 minutes!
        </p>
        <div className="flex justify-center items-center gap-4 text-sm">
          <Link className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-4 py-2 rounded-full cursor-pointer w-full " href = "/menu">
            Order now
            <Right />
          </Link>
          <Link className="flex items-center border-0 gap-2 py-2 text-gray-600 font-semibold w-full " href = "/#about">
            Learn more
            <Right />
          </Link>
        </div>
      </div>
      <div
        className="relative flex justify-center items-center"
        style={{ height: "400px" }}
      >
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
