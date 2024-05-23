import { useSelector } from "react-redux";

export default function FileViewer({ activeIndex }) {
  const { files } = useSelector((state) => state.chat);

  // Check if files and the file at activeIndex exist
  if (!files || !files[activeIndex]) {
    return (
      <div className="w-full max-w-[60%] flex justify-center items-center">
        <h1 className="dark:text-dark_text_2 text-2xl">No file selected</h1>
      </div>
    );
  }

  const file = files[activeIndex];

  return (
    <div className="w-full max-w-[60%]">
      {/* Container */}
      <div className="flex justify-center items-center">
        {file.type === "IMAGE" ? (
          <img
            src={file.fileData}
            alt=""
            className="max-w-[80%] object-contain hview"
          />
        ) : file.type === "VIDEO" ? (
          <video
            src={file.fileData}
            controls
            className="max-w-[80%] object-contain hview"
          ></video>
        ) : (
          <div className="min-w-full hview flex flex-col items-center justify-center">
            {/* File Icon Image */}
            <img
              src={`../../../../images/file/${file.type}.png`}
              alt={file.type}
            />
            {/* No preview text */}
            <h1 className="dark:text-dark_text_2 text-2xl">
              No preview available
            </h1>
            {/* File size / type */}
            <span className="dark:text-dark_text_2">
              {file.size} kB - {file.type}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
