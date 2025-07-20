import React from "react";

/**
 * VoteFrame Card Component
 *
 * Props:
 * - title (string)         : main heading
 * - description (string)   : supporting text paragraph
 * - icon (ReactNode)       : icon element (optional)
 * - bgColor (string)       : tailwind/bg class or hex value (optional, default #EBE9D4)
 * - className (string)     : extra classes for outer container
 */
const VoteFrame = ({
  title,
  description,
  icon = null,
  bgColor = "#EBE9D4",
  className = "",
}) => {
  return (
    <div
      className={`rounded-lg p-8 flex flex-col gap-4 cursor-pointer transition-all duration-300 ease-out hover:shadow-xl hover:-translate-y-1 hover:brightness-95 active:shadow-md active:translate-y-0 active:scale-95 ${className}`}
      style={{ backgroundColor: bgColor }}
    >
      {/* Icon */}
      {icon ? (
        <div className="w-10 h-10 text-[#9A7614]">{icon}</div>
      ) : (
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
      )}

      {/* Title */}
      <h2 className="text-[#A67C00] text-3xl leading-tight font-baskervville baskervville-400">
        {title}
      </h2>

      {/* Description */}
      <p className="text-[#212121] text-md font-urbanist leading-relaxed urbanist-400">
        {description}
      </p>
    </div>
  );
};

export default VoteFrame;
