

// import React from "react";
// import { toast } from "react-toastify";

// export default function ShortLink({ shortLink, onDelete }) {
//   if (!shortLink) return null;

//   const handleCopy = async () => {
//     try {
//       if (navigator.clipboard && navigator.clipboard.writeText) {
//         await navigator.clipboard.writeText(shortLink);
//       } else {
//         const ta = document.createElement("textarea");
//         ta.value = shortLink;
//         ta.style.position = "fixed";
//         ta.style.top = "-1000px";
//         document.body.appendChild(ta);
//         ta.select();
//         document.execCommand("copy");
//         document.body.removeChild(ta);
//       }
//       toast.success(" Link copied!");
//     } catch (err) {
//       console.error("Copy failed:", err);
//       toast.error("❌ Copy failed");
//     }
//   };

//   const handleDelete = () => {
//     onDelete(shortLink);
//   };

//   return (
//     <div className="shortlink">
//       <p className="shortlink-title">Your Shortened Link:</p>

//       <a
//         href={shortLink}
//         target="_blank"
//         rel="noopener noreferrer"
//         className="shortlink-url"
//       >
//         {shortLink}
//       </a>

//       <div className="button-group">
//         <button onClick={handleCopy} className="copy-button">
//           Copy
//         </button>
//         <button onClick={handleDelete} className="delete-button">
//           Delete
//         </button>
//       </div>
//     </div>
//   );
// }



import React from "react";
import { toast } from "react-toastify";
import { Copy, Trash2 } from "lucide-react"; // icons

export default function ShortLink({ shortLink, onDelete }) {
  if (!shortLink) return null;

  const handleCopy = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shortLink);
      } else {
        const ta = document.createElement("textarea");
        ta.value = shortLink;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
      }
      toast.success(" Link copied!");
    } catch (err) {
      toast.error(" Copy failed");
    }
  };

  const handleDelete = () => {
    onDelete(shortLink);
  };

  return (
    <div className="shortlink">
      <p className="shortlink-title">Your Shortened Link:</p>

      <a
        href={shortLink}
        target="_blank"
        rel="noopener noreferrer"
        className="shortlink-url"
      >
        {shortLink}
      </a>

      <div className="button-group">
        <button onClick={handleCopy} className="icon-button copy-button">
          <Copy size={18} />
        </button>
        <button onClick={handleDelete} className="icon-button delete-button">
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
}
