import React, {  } from 'react';
import pako from 'pako';
import Button from "@mui/material/Button";

const PdfViewer = ({ base64Data }) => {


  // Function to compress and decompress PDF


  // Function to download decompressed PDF


  // const handleDownload = () => {

    
  //          console.log("got", base64Data);
  //         const uint8Array = new Uint8Array(base64Data);
       
  //   if (uint8Array) {
  //     const decompressedData = pako.ungzip(uint8Array);
  //     const blob = new Blob([decompressedData]);
  //     const url = URL.createObjectURL(blob);

  //     const a = document.createElement('a');
  //     a.style.display = 'none';
  //     a.href = url;
  //     a.download = 'decompressed.pdf';
  //     document.body.appendChild(a);
  //     a.click();
  //     window.URL.revokeObjectURL(url);
  //   }
  // };
  const handleDownload = () => {
    try {
      // Ensure the base64 string does not contain the data URL prefix
      const cleanedBase64 = base64Data.split(",")[1] || base64Data;

      // Decode the base64 string
      const binaryString = atob(cleanedBase64);
      const binaryLen = binaryString.length;
      const bytes = new Uint8Array(binaryLen);
      for (let i = 0; i < binaryLen; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }

      let decompressedData;

      try {
        // Attempt to decompress the byte array using pako
        decompressedData = pako.ungzip(bytes);
      } catch (e) {
        // If decompression fails, assume the data is not compressed
        decompressedData = bytes;
      }

      // Create a Blob from the decompressed data
      const blob = new Blob([decompressedData], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);

      // Create a link to download the Blob
      const a = document.createElement('a');
      a.style.display = 'none';
      a.href = url;
      a.download = 'downloaded.pdf';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error during PDF download:', error);
    }
  };

  return (
    <div>
      {/* <Button onClick={()=>{console.log(base64Data)}}>ckkk pdf</Button> */}
      <Button onClick={handleDownload}>Download pdf</Button>
    </div>
  );
};

export default PdfViewer;