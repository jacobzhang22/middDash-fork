"use client";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import UserTabs from "@/components/layout/UserTabs";
import useProfile from "@/components/UseProfile";

export default function ReportsPage() {
  const [reports, setReports] = useState([]);
  const [error, setError] = useState("");
  const { loading: profileLoading, data: profileData } = useProfile();

  function fetchReports() {
    fetch("/api/report")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch reports");
        }
        return res.json();
      })
      .then((data) => {
        setReports(data.reports);
        setError("");
      })
      .catch((error) => {
        console.error("Error fetching reports:", error);
        setError(error.message);
        setReports([]);
      });
  }

  useEffect(() => {
    fetchReports();
  }, []);

  function toggleReportStatus(reportId, currentStatus) {
    fetch(`/api/report/${reportId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ isResolved: !currentStatus }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update report status");
        }
        return response.json();
      })
      .then(() => {
        fetchReports();
        toast.success(
          `Report ${currentStatus ? "marked as unresolved" : "marked as resolved"}`
        );
      })
      .catch((error) => {
        console.error("Error updating report status:", error);
        toast.error("Failed to update report status");
      });
  }

  function formatDate(isoString) {
    const date = new Date(isoString);
    return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
  }

  if (profileLoading) {
    return "Loading user info...";
  }

  if (!profileData.isAdmin) {
    return "Not an admin";
  }

  return (
    <section className="mt-8 max-w-2xl mx-auto">
      <UserTabs isAdmin={profileData.isAdmin} />
      <div>
        <h2 className="mt-8 text-lg text-gray-500">Reports:</h2>
        {error ? (
          <p>{error}</p>
        ) : reports?.length > 0 ? (
          reports.map((report) => (
            <div
              key={report.id}
              className={`rounded-xl p-4 mb-4 shadow-sm ${report.isResolved ? "bg-green-100" : "bg-red-100"}`}
            >
              <h3 className="text-lg font-semibold">Report ID: {report.id}</h3>
              <div className="text-gray-600 mt-2">
                <p>
                  <strong>Title:</strong> {report.title}
                </p>
                <p>
                  <strong>Content:</strong> {report.content}
                </p>
                <p>
                  <strong>Reported by:</strong> {report.user?.name}
                </p>
                <p>
                  <strong>Email:</strong> {report.user?.email}
                </p>
                <p>
                  <strong>Phone Number:</strong> {report.user?.phone}
                </p>
                <p>
                  <strong>Report Created:</strong>{" "}
                  {formatDate(report.createdAt)}
                </p>
              </div>
              <div className="mt-4 flex gap-1">
                <button
                  onClick={() =>
                    toggleReportStatus(report.id, report.isResolved)
                  }
                  type="submit"
                  className="my-2"
                >
                  {report.isResolved
                    ? "Mark as Unresolved"
                    : "Mark as Resolved"}
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No reports found.</p>
        )}
      </div>
    </section>
  );
}
