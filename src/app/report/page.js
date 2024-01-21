export default function Report() {
  return (
    <>
      <div className="text-5xl text-gray-700 font-bold my-8 text-center">
        Report
      </div>

      <div className="flex gap-4">
        <form className="grow">
          <label>First and last name</label>
          <input type="text" placeholder="First and last name" />
          <label>Details</label>
          <textarea
            placeholder="Provide more details here..."
            rows="12"
            maxLength="1128"
            style={{ resize: "none" }}
          />
          <button type="submit" className="my-8">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
