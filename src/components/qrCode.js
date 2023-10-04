import { useState, useRef, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";

const QrCode = ({value: valueProps, imageName}) => {
  const [value, setValue] = useState(null);
  const qrRef = useRef();

  const downloadQRCode = (e) => {
    e.preventDefault();
    let canvas = qrRef.current.querySelector("canvas");
    let image = canvas.toDataURL("image/png");
    let anchor = document.createElement("a");
    anchor.href = image;
    anchor.download = imageName ? `${imageName}.png`: `qr-code.png`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    setValue("");
  };

  const qrCodeEncoder = (e) => {
    setValue(e.target.value);
  };

  const qrcode = (
    <QRCodeCanvas
      id="qrCode"
      value={value}
      size={300}
      level={"H"}
    />
  );

  useEffect(() => { setValue(valueProps) }, [valueProps])

  return (
    <div className="section container">
        <div className="qrcode__container">
            <div ref={qrRef}>{qrcode}</div>
            <div className="input__group">
                <form onSubmit={downloadQRCode}>
                {!valueProps && (
                    <>
                        <label>Enter URL</label>
                        <input
                            className="qrcode__input"
                            type="text"
                            value={value}
                            onChange={qrCodeEncoder}
                            placeholder="https://hackernoon.com"
                        />
                    </>
                )}
                <button className="qrcode__submit_button" type="submit" disabled={!value}>
                    Download QR code
                </button>
                </form>
            </div>
        </div>
    </div>
  );
};

export default QrCode;