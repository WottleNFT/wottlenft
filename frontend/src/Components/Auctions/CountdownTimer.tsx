import { useState, useEffect } from "react";

import { defaultRemainingTime } from "../../types/CountdownTime";
import { getRemainingTimeUntilTimestamp } from "./CountdownTimerUtils";

const CountdownTimer = ({
  countdownTimestamp,
}: {
  countdownTimestamp: number;
}) => {
  const [remainingTime, setRemainingTime] = useState(defaultRemainingTime);

  useEffect(() => {
    const intervalId = setInterval(() => {
      updateRemainingTime(countdownTimestamp);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [countdownTimestamp]);

  function updateRemainingTime(countdown: number) {
    setRemainingTime(getRemainingTimeUntilTimestamp(countdown));
  }

  return (
    <div className="countdown-timer">
      <span>{remainingTime.days}</span>
      <span>days</span>
      <span className="two-numbers">{remainingTime.hours}</span>
      <span>hours</span>
      <span className="two-numbers">{remainingTime.minutes}</span>
      <span>minutes</span>
      <span className="two-numbers">{remainingTime.seconds}</span>
      <span>seconds</span>
    </div>
  );
};

export default CountdownTimer;
