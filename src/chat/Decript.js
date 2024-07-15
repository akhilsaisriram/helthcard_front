import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import CryptoJS from 'crypto-js';
function Decript({ socket }) {
    const [cipherText, setCipherText] = useState(socket);
    const [decryptedText, setDecryptedText] = useState('');

    useEffect(() => {
 const bytes = CryptoJS.AES.decrypt(cipherText, 'secretKey');
    const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
    setDecryptedText(decryptedText);
    },[cipherText]);

return(
   <>
   
{decryptedText.length>200? <div>pdf or image
    {(socket.slice(0, 50)).includes("pdf")?
     <embed src={socket} type="application/pdf" width="100%" height="330px"/>:<img alt="imagedsend" src={socket} type="application/pdf" width="100%" height="330px"/>
    }
   
    </div>:<h>{decryptedText}</h>}

</>
)

}
export default Decript;