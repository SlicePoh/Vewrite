import React, { useEffect, useState } from "react";
import {QuillDeltaToHtmlConverter} from "quill-delta-to-html"; // Import the library

const DeltaContent = ({ delta }) => {
  const [htmlContent, setHtmlContent] = useState("");

  useEffect(() => {
    const deltaConverter = new QuillDeltaToHtmlConverter(delta, {}); // Pass delta and optional options

    // Convert the Delta to HTML
    const convertedHtml = deltaConverter.convert();

    setHtmlContent(convertedHtml);
  }, [delta]);

  return <div dangerouslySetInnerHTML={{ __html: htmlContent }} />;
};

export default DeltaContent;
