import Link from "next/link";
import Right from "../icons/Right";

export default function Header() {
  return (
    <section className="flex justify-center items-center my-8">
      <Link
        className="flex justify-center bg-primary uppercase items-center gap-2 text-white px-8 py-2 rounded-full cursor-pointer "
        href="/report"
      >
        Report
        <Right />
      </Link>
    </section>
  );
}
