import React, { useState, useEffect } from "react";
import "./styles/ContestNotification.css";

const ContestNotification = () => {
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activePlatform, setActivePlatform] = useState("All");
  const [copiedMessage, setCopiedMessage] = useState("");

  // Helper function to format date
  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const options = {
      day: "numeric",
      month: "long",
      weekday: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("en-US", options);
  };

  // Helper function to format time in IST
  const formatTimeIST = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Kolkata",
    });
  };

  // Generate contest link based on platform
  const getContestLink = (contest) => {
    if (contest.site === "Codeforces") {
      // Extract contest ID from name or use a default
      const contestId = "1234"; // You'll need to modify this based on your data
      return `https://codeforces.com/contests/${contestId}`;
    } else if (contest.site === "AtCoder") {
      // Format AtCoder URL
      const contestId = contest.name.toLowerCase().replace(/\s+/g, "_");
      return `https://atcoder.jp/contests/${contestId}`;
    }
    return "#";
  };

  // Format WhatsApp message
  const formatWhatsAppMsg = (contest) => {
    // const date = new Date(contest.timestamp);
    const timeIST = formatTimeIST(contest.timestamp);
    return `${contest.name} will start on ${formatDate(
      contest.timestamp
    )} at ${timeIST} IST.\nContest duration is ${
      contest.duration
    }.\nContest link: ${getContestLink(contest)}\nHappy Coding! 😀`;
  };

  // Format Facebook message
  const formatFacebookMsg = (contest) => {
    const timeIST = formatTimeIST(contest.timestamp);
    return `Upcoming Contest: 𝐂𝐨𝐝𝐞𝐟𝐨𝐫𝐜𝐞𝐬 𝐑𝐨𝐮𝐧𝐝 (𝐃𝐢𝐯. 𝟐)\nDate: ${formatDate(
      contest.timestamp
    )}\nContest Timing: ${timeIST} 𝐈𝐒𝐓\nDuration: ${
      contest.duration
    }\nContest link: ${getContestLink(contest)}\nHappy Coding! 😀`;
  };

  // Copy to clipboard function
  const copyToClipboard = async (text, messageType) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedMessage(`${messageType} copied!`);
      setTimeout(() => setCopiedMessage(""), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const fetchCodeforcesContests = async () => {
    try {
      const response = await fetch("https://codeforces.com/api/contest.list");
      const data = await response.json();
      if (data.status === "OK") {
        const upcoming = data.result
          .filter((contest) => contest.phase === "BEFORE")
          .map((contest) => ({
            site: "Codeforces",
            name: contest.name,
            duration: Math.round(contest.durationSeconds / 3600) + " hrs",
            start_time: new Date(
              contest.startTimeSeconds * 1000
            ).toLocaleString(),
            timestamp: contest.startTimeSeconds * 1000,
          }));
        return upcoming;
      }
      return [];
    } catch (error) {
      console.error("Error fetching Codeforces contests:", error);
      return [];
    }
  };

  const fetchAtcoderContests = async () => {
    try {
        const response = await fetch("http://localhost:5000/atcoder-contests");
        const data = await response.json();
        console.log(data);
        return data;
    } catch (error) {
        console.error("Error fetching AtCoder contests:", error);
        return [];
    }
};


  const fetchPlatformContests = async (platform) => {
    setLoading(true);
    setContests([]);
    setActivePlatform(platform); // Update active platform

    try {
      const contestList =
        platform === "Codeforces"
          ? await fetchCodeforcesContests()
          : await fetchAtcoderContests();

      setContests(contestList.sort((a, b) => a.timestamp - b.timestamp));
    } catch (error) {
      console.error(`Error fetching ${platform} contests:`, error);
    } finally {
      setLoading(false);
    }
  };
  const sortContestsByDateTime = (contests) => {
    return contests.sort((a, b) => {
      const dateA = new Date(a.timestamp || new Date(a.start_time).getTime());
      const dateB = new Date(b.timestamp || new Date(b.start_time).getTime());
  
      return (
        dateA.getFullYear() - dateB.getFullYear() || // Compare year first
        dateA.getMonth() - dateB.getMonth() || // Then compare month
        dateA.getDate() - dateB.getDate() || // Then compare day
        dateA.getTime() - dateB.getTime() // Finally compare time
      );
    });
  };
  
  const fetchAllContests = async () => {
    setLoading(true);
    setActivePlatform("All"); // Update active platform
  
    try {
      const [codeforcesContests, atcoderContests] = await Promise.all([
        fetchCodeforcesContests(),
        fetchAtcoderContests(),
      ]);
  
      // Convert AtCoder start_time to timestamp manually
      const formattedAtcoderContests = atcoderContests.map((contest) => ({
        ...contest,
        timestamp: new Date(contest.start_time).getTime(),
      }));
  
      const allContests = sortContestsByDateTime([
        ...codeforcesContests,
        ...formattedAtcoderContests,
      ]);
  
      setContests(allContests);
    } catch (error) {
      console.error("Error fetching all contests:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAllContests();
  }, []);

  return (
    <div className="container">
      <h1 className="title">Upcoming Contests</h1>
      <div className="button-group">
        <button
          onClick={fetchAllContests}
          className={`btn ${activePlatform === "All" ? "active-btn" : ""}`}
        >
          All Platforms
        </button>
        <button
          onClick={() => fetchPlatformContests("Codeforces")}
          className={`btn ${
            activePlatform === "Codeforces" ? "active-btn" : ""
          }`}
        >
          Codeforces
        </button>
        <button
          onClick={() => fetchPlatformContests("AtCoder")}
          className={`btn ${activePlatform === "AtCoder" ? "active-btn" : ""}`}
        >
          AtCoder
        </button>
      </div>

      {loading && <p className="loading"></p>}
      {copiedMessage && (
        <div className="copy-notification">{copiedMessage}</div>
      )}

      <div className="contest-list">
        {contests.length > 0
          ? contests.map((contest, index) => (
              <div
                key={`${contest.site}-${contest.name}-${index}`}
                className="contest-card"
              >
                <h2 className="contest-platform">{contest.site}</h2>
                <p className="contest-name">{contest.name}</p>
                <p className="contest-duration">Duration: {contest.duration}</p>
                <p className="contest-start">Starts at: {contest.start_time}</p>

                <div className="contest-actions">
                  <button
                    className="action-btn whatsapp"
                    onClick={() =>
                      copyToClipboard(
                        formatWhatsAppMsg(contest),
                        "WhatsApp message"
                      )
                    }
                  >
                    <i className="fab fa-whatsapp"></i> Copy WhatsApp
                  </button>
                  <button
                    className="action-btn facebook"
                    onClick={() =>
                      copyToClipboard(
                        formatFacebookMsg(contest),
                        "Facebook message"
                      )
                    }
                  >
                    <i className="fab fa-facebook"></i> Copy Facebook
                  </button>
                  <a
                    href={getContestLink(contest)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="action-btn link"
                  >
                    <i className="fas fa-external-link-alt"></i> Contest Link
                  </a>
                </div>
              </div>
            ))
          : !loading && <p className="no-contests">No contests available</p>}
      </div>
    </div>
  );
};

export default ContestNotification;
