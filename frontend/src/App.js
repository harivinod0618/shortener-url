

// import React, { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// import LinkForm from "./components/LinkForm";
// import ShortLink from "./components/ShortLink";
// import "./styles.css";

// function App() {
//   const [links, setLinks] = useState([]);

//   // Load saved links from localStorage
//   useEffect(() => {
//     const saved = JSON.parse(localStorage.getItem("shortLinks")) || [];
//     setLinks(saved);
//   }, []);

//   // Save links whenever they change
//   useEffect(() => {
//     localStorage.setItem("shortLinks", JSON.stringify(links));
//   }, [links]);

//   const handleShorten = async (url, timeLimit) => {
//     try {
//       const response = await fetch("http://localhost:5000/api/shorten", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ url, timeLimit }),
//       });
//       if (!response.ok) throw new Error("Failed to shorten");
//       const data = await response.json();

//       setLinks((prev) => {
//         const newLinks = [data.shortUrl, ...prev];
//         return newLinks.slice(0, 5);
//       });

//       // return shortUrl in case the form wants it
//       return data.shortUrl;
//     } catch (err) {
//       console.error("Shorten error:", err);
//       throw err;
//     }
//   };

//   return (
//     <div className="app-container">
//       {/* <h1 className="app-title">URL Shortener with Expiry</h1> */}

//       <LinkForm onShorten={handleShorten} />

//       <div className="shortlink-list">
//         {links.map((link, idx) => (
//           <ShortLink key={idx} shortLink={link} />
//         ))}
//       </div>

//       {/* Single ToastContainer for the whole app */}
//       <ToastContainer
//         position="top-center"
//         autoClose={1500}
//         hideProgressBar
//         closeOnClick
//         pauseOnHover={false}
//         draggable={false}
//       />
//     </div>
//   );
// }

// export default App;



import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LinkForm from "./components/LinkForm";
import ShortLink from "./components/ShortLink";
import "./styles.css";

function App() {
  const [links, setLinks] = useState([]);

  // Load saved links from localStorage
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("shortLinks")) || [];
    setLinks(saved);
  }, []);

  // Save links whenever they change
  useEffect(() => {
    localStorage.setItem("shortLinks", JSON.stringify(links));
  }, [links]);

  const handleShorten = async (url, timeLimit) => {
    try {
      const response = await fetch("http://localhost:5000/api/shorten", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url, timeLimit }),
      });
      if (!response.ok) throw new Error("Failed to shorten");
      const data = await response.json();

      setLinks((prev) => {
        const newLinks = [data.shortUrl, ...prev];
        return newLinks.slice(0, 5); // Keep only last 5
      });

      return data.shortUrl;
    } catch (err) {
      console.error("Shorten error:", err);
      throw err;
    }
  };

  const handleDelete = (linkToDelete) => {
    setLinks((prev) => prev.filter((link) => link !== linkToDelete));
    toast.info("Link deleted");
  };

  return (
    <div className="app-container">
      {/* <h1 className="app-title">URL Shortener with Expiry</h1> */}

      <LinkForm onShorten={handleShorten} />

      <div className="shortlink-list">
        {links.map((link, idx) => (
          <ShortLink
            key={idx}
            shortLink={link}
            onDelete={handleDelete}
          />
        ))}
      </div>

      <ToastContainer
        position="top-center"
        autoClose={1500}
        hideProgressBar
        closeOnClick
        pauseOnHover={false}
        draggable={false}
      />
    </div>
  );
}

export default App;
