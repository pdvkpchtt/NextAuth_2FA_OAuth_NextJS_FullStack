import "./CircularProggressBar.css";

const CircularProggressBar = ({
  size = 150,
  progress = 0,
  maxWal = 100,
  trackWidth = 10,
  trackColor = `#ddd`,
  indicatorWidth = 10,
  indicatorColor = `#07c`,
  indicatorCap = `round`,
  spinnerMode = false,
  spinnerSpeed = 1,
}) => {
  const center = size / 2,
    radius =
      center - (trackWidth > indicatorWidth ? trackWidth : indicatorWidth),
    dashArray = 2 * Math.PI * radius,
    dashOffset = dashArray * ((maxWal - progress) / maxWal);

  return (
    <>
      <div className="svg-pi-wrapper" style={{ width: size, height: size }}>
        <svg className="svg-pi" style={{ width: size, height: size }}>
          <circle
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            className={`${trackColor} transition duration-[250ms] svg-pi-track`}
            strokeWidth={trackWidth}
          />
          <circle
            className={`svg-pi-indicator transition duration-[250ms] ${
              spinnerMode ? "svg-pi-indicator--spinner" : ""
            } ${indicatorColor}`}
            style={{ animationDuration: spinnerSpeed * 1000 }}
            cx={center}
            cy={center}
            fill="transparent"
            r={radius}
            strokeWidth={indicatorWidth}
            strokeDasharray={dashArray}
            strokeDashoffset={dashOffset}
            strokeLinecap={indicatorCap}
          />
        </svg>
      </div>
    </>
  );
};

export default CircularProggressBar;
