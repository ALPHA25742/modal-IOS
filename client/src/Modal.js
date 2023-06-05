import React from "react";
import ReactDom from "react-dom";

const Modal_styles = {
  position: "fixed",
  top: "50%",
  left: "50%",
  width: "80%",
  height: "inherit",
  transform: "translate(-50%, -50%)",
  backgroundColor: "#FFF",
  // padding: "50px",
  zIndex: 1000,
};

const Overlay_styles = {
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(68, 71, 77,0.7)",
  zIndex: 1000,
};

export default function Modal({ p, q, children }) {
  if (!p) return null;
  return ReactDom.createPortal(
    <>
      <div onClick={q} style={Overlay_styles}>
        <div style={Modal_styles}>
          <div style={{ height: "97vh" }}>
            <object
              data="finalScript.pdf#view=FitH&toolbar=0"
              type="application/pdf"
              width="100%"
              style={{ height: "inherit" }}
            >
              <p>
                Alternative text - include a link{" "}
                <a href="http://africau.edu/images/defzault/sample.pdf">
                  to the PDF!
                </a>
              </p>
            </object>
          </div>
        </div>
      </div>
    </>,
    document.getElementById("portal")
  );
}
