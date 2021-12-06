import { useCallback, useEffect, useRef, useState } from "react";
import styles from "./SliderContainer.module.css";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

const SliderContainer = ({
  min,
  max,
  value,
  title,
  onChange,
  valueFormatter = undefined,
}) => {
  const formatValue = useCallback(
    (num) => (valueFormatter ? valueFormatter(num) : num.toString()),
    [valueFormatter]
  );
  const [isEditing, setIsEditing] = useState(false);
  const inputRef = useRef(null);

  const handleBlur = () => {
    if (isEditing && (value > max || value < min)) {
      const outOfBoundaryValue = value > max ? max : min;
      onChange(outOfBoundaryValue);
    }
    setIsEditing((ie) => !ie);
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleBlur();
    }
  };
  useEffect(() => {
    if (isEditing) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [isEditing]);

  return (
    <div className={styles["slider-container"]}>
      <div className={styles["title-value"]}>
        <div className={styles["title"]}>{title}</div>
        <div className={styles["value-container"]}>
          {isEditing ? (
            <input
              type="number"
              value={value}
              onChange={onChange}
              className={styles["value-input"]}
              ref={inputRef}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
            />
          ) : (
            <div
              className={styles["value-input-formatted"]}
              onClick={handleBlur}
            >
              {formatValue(value)}
            </div>
          )}
        </div>
      </div>
      <div className={styles["slider"]}>
        <Slider
          min={min}
          max={max}
          defaultValue={min}
          value={value}
          onChange={onChange}
        />
      </div>
      <div className={styles["min-max-labels"]}>
        <div>{formatValue(min)}</div>
        <div>{formatValue(max)}</div>
      </div>
    </div>
  );
};
export default SliderContainer;
