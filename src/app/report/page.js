"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import toast from 'react-hot-toast';

export default function Report() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const { data: session, status } = useSession();



  async function handleReportSubmit(ev) {
    ev.preventDefault();
    const data = { title, content };
    
    const savingPromise = new Promise(async (resolve, reject) => {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        resolve();
        setTitle("");
        setContent("");
      }
      else reject();


      await toast.promise(savingPromise, {
        loading: 'Sending...',
        success: 'Report Submitted!',
        error: 'Error',
      });

    });
  }

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <>
      <div className="text-5xl text-gray-700 font-bold my-8 text-center">
        Report
      </div>
      {session ? (
        <div className="flex gap-4">
          <form className="grow" onSubmit={handleReportSubmit}>
            <label htmlFor="title">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter report title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <label htmlFor="content">Details</label>
            <textarea
              id="content"
              placeholder="Provide more details here..."
              rows="12"
              maxLength="1128"
              style={{ resize: "none" }}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />

            <button type="submit" className="my-8">
              Submit
            </button>
          </form>
        </div>
      ) : (
        <p>Please log in to submit a report.</p>
      )}
    </>
  );
}
