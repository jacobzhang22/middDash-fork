"use client";
import { useEffect, useState } from "react";
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
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ isResolved: !currentStatus }),
    })
    .then(response => response.json())
    .then(() => {
      // Update the local state to reflect the change
      setReports(reports.map(report => report.id === reportId ? { ...report, isResolved: !currentStatus } : report));
    })
    .catch(error => {
      console.error('Error updating report status:', error);
    });
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
        <h2 className="mt-8 text-sm text-gray-500">Reports:</h2>
        {error ? (
          <p>{error}</p>
        ) : reports?.length > 0 ? (
          reports.map((report) => (
            <div key={report.id} className={`rounded-xl p-4 mb-4 shadow-sm ${report.isResolved ? 'bg-green-100' : 'bg-red-100'}`}>
              <h3 className="text-lg font-semibold">{report.title}</h3>
              <p className="text-gray-600 mt-2">{report.content}</p>
              <p className="text-gray-500 text-sm mt-2">User ID: {report.userId}</p>
              <div className="mt-4 flex gap-1">
                <button 
                  onClick={() => toggleReportStatus(report.id, report.isResolved)}
                  type = "submit"
                  className = "my-2"
                >
                  {report.isResolved ? 'Mark as Unresolved' : 'Mark as Resolved'}
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
