"use client";
import { useState } from "react";

export default function Report() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  async function handleReportSubmit(ev) {
    ev.preventDefault();
    const data = { title, content };

    try {
      const response = await fetch("/api/report", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log(result); // Log or process the result

      // You can add further actions here, e.g., showing a success message, clearing the form, or redirecting the user
      setTitle("");
      setContent("");
      alert("Report submitted successfully!");
    } catch (error) {
      console.error("Error submitting the report:", error);
      alert("Error submitting the report. Please try again.");
    }
  }

  return (
    <>
      <div className="text-5xl text-gray-700 font-bold my-8 text-center">
        Report
      </div>

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
    </>
  );
}
