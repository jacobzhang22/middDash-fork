import Link from "next/link";

export default function reportConcern() {
  return (
    <div className="max-w-md max-h-md mx-auto mt-4 flex flex-col gap-4">
      <div className="text-center text-gray-500">
        <p>
          Please use the form below to submit any concerns or issues you have
          had working with MiddDash.
        </p>
        <p>We value your input and will get back to you as soon as possible.</p>
      </div>
      <input type="text" />
      <Link href="/dasherProfile">Submit</Link>
    </div>
  );
}
