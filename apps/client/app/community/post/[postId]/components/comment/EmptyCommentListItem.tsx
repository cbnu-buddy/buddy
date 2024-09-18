import React from "react";

export default function EmptyCommentListItem() {
  return (
    <div
      className="flex flex-col items-center text-xs text-[#88909a] mb-10"
      style={{ alignContent: "center" }}
    >
      <svg
        width="88"
        height="88"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="scale-75"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M36 15c-13 0-24 11-24 24s11 24 24 24h2v9h1l10-9h3c13 0 24-11 24-24S65 15 52 15H36z"
          fill="#d1d2d3"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M47 39c0 2-1 3-3 3s-3-1-3-3 1-3 3-3 3 1 3 3zm-13 0c0 2-1 3-3 3s-3-1-3-3 1-3 3-3 3 1 3 3zm23 3c2 0 3-1 3-3s-1-3-3-3-3 1-3 3 1 3 3 3z"
          fill="#f9fafb"
        />
      </svg>
      <span className="text-inherit">가장 먼저 댓글을 남겨보세요!</span>
    </div>
  );
}
