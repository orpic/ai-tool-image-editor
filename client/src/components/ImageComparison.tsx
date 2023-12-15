import { useState } from "react";

interface ImageComparisonProps {
  imageBeforeObjectUrl: string;
  imageAfter: string;
}

export const ImageComparison: React.FC<ImageComparisonProps> = ({
  imageBeforeObjectUrl,
  imageAfter,
}) => {
  const [exposure, setExposure] = useState(50); // Initial exposure value
  const thumbSize = "15px";

  const handleSliderChange = (
    event: React.InputHTMLAttributes<HTMLInputElement>
  ) => {
    const newExposure = event.target.value;
    setExposure(newExposure);
  };

  const imageCompareStyle: React.CSSProperties = {
    position: "relative",
    height: "384px",
    width: "512px",
  };

  const image2Style: React.CSSProperties = {
    display: "block",
    position: "absolute",
    top: 0,
    clipPath: `polygon(${exposure}% 0, 100% 0, 100% 100%, ${exposure}% 100%)`,
    height: "384px",
    width: "512px",
    objectFit: "cover",
  };

  const visuallyHiddenStyle: React.CSSProperties = {
    border: "0",
    clip: "rect(0 0 0 0)",
    height: "1px",
    margin: "-1px",
    overflow: "hidden",
    padding: "0",
    position: "absolute",
    width: "1px",
  };

  const imageComparelabelStyle: React.CSSProperties = {
    /* Position the label over the images */
    position: "absolute",
    top: "0",
    left: "0",
    bottom: "0",
    right: "0",
    alignItems: "stretch",
    display: "flex",
  };

  const imageCompareInputStyle: React.CSSProperties = {
    margin: `0 calc(${thumbSize} / -2)`,
    width: `calc(100% + ${thumbSize})`,
    appearance: "none",
    WebkitAppearance: "none",
    background: "none",
    border: "none",
    cursor: "col-resize",
    //
    MozAppearance: "none", // Firefox
  };

  const image2Wrapper: React.CSSProperties = {
    filter: "drop-shadow(-2px 0 0 hsla(0, 0%, 0%, 0.9))",

    display: "block",
    position: "absolute",
    top: "0",
    width: "100%",
  };

  return (
    <div
      style={{
        marginTop: "3rem",
      }}
    >
      <div className="image-compare" style={imageCompareStyle}>
        <img
          className="image-1"
          src={imageBeforeObjectUrl}
          alt="alt text 1"
          style={{
            height: "384px",
            width: "512px",
            objectFit: "cover",
          }}
        />
        <span className="image-2-wrapper" style={image2Wrapper}>
          <img
            className="image-2"
            src={imageAfter}
            alt="alt text 2"
            style={image2Style}
          />
        </span>
        <label className="image-compare-label" style={imageComparelabelStyle}>
          <span className="visually-hidden" style={visuallyHiddenStyle}>
            Select what percentage of the bottom image to show
          </span>

          <input
            type="range"
            min="0"
            max="100"
            value={exposure}
            onChange={handleSliderChange}
            className="image-compare-input"
            style={imageCompareInputStyle}
          />
        </label>
        <p
          style={{
            position: "absolute",
            bottom: "15px",
            left: "15px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
            color: "white",
            fontSize: "1.4rem",
          }}
        >
          Before
        </p>
        <p
          style={{
            position: "absolute",
            bottom: "15px",
            right: "15px",
            textShadow: "2px 2px 4px rgba(0, 0, 0, 1)",
            fontSize: "1.4rem",
            color: "white",
          }}
        >
          After
        </p>
      </div>
    </div>
  );
};
