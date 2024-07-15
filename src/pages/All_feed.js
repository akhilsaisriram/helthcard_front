import React from "react";
import "./AllFeed.css";
import { Image } from "antd";
import PdfViewer from "../chat/pdfviewr";

const All_feed = ({ data }) => {
  console.log("da", data);

  return (
    <div className="containera">
      {data &&
        data.medicine_1.map((item) => (
          <div key={item.id} className="item">
            <div className="avatar-name">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong>
                  <h style={{ margin: 0 }}>Date uploaded</h>
                </strong>
                <h style={{ margin: 0 }}>
                  {new Date(item.dateadded).toLocaleString()}
                </h>
              </div>
            </div>
            {item.image.slice(0, 50).includes("image") ? (
              <Image
                src={`${item.image}`}
                alt="User provided content"
                className="image"
              />
            ) : (
              <PdfViewer base64Data={item.image} />
            )}

            {item.date && (
              <div>
                <p>
                  <strong>Date the medicines took:</strong>{" "}
                  {item.date.toLocaleString()}
                </p>
              </div>
            )}
            <h>Reason</h>
            <p>{item.content}</p>
          </div>
        ))}

      {data &&
        data.medicine_2.map((itema) => (
          <div key={itema.id} className="item">
            <div className="avatar-name">
              <div style={{ display: "flex", flexDirection: "column" }}>
                <strong>
                  <h style={{ margin: 0 }}>Date uploaded</h>
                </strong>
                <h style={{ margin: 0 }}>
                  {new Date(itema.dateadded).toLocaleString()}
                </h>
              </div>
            </div>
            {itema.image.slice(0, 50).includes("image") ? (
              <Image
                src={`${itema.image}`}
                alt="User provided content"
                className="image"
              />
            ) : (
              <PdfViewer base64Data={itema.image} />
            )}

            {itema.date && (
              <div>
                <p>
                  <strong>Date the medicines took:</strong>{" "}
                  {itema.date.toLocaleString()}
                </p>
              </div>
            )}
            <h>Reason</h>
            <p>{itema.content}</p>
          </div>
        ))}
    </div>
  );
};

export default All_feed;
