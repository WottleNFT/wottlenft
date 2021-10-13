import { useState, useEffect } from "react";

import { IonCardSubtitle } from "@ionic/react";

import { defaultRemainingTime } from "../../types/CountdownTime";
import { getRemainingTimeUntilTimestamp } from "./CountdownTimerUtils";

interface Props {
  countdownTimestamp: number;
  [other: string]: any;
}

const CountdownTimer: React.FC<Props> = ({ countdownTimestamp, ...props }) => {
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
    <IonCardSubtitle {...props}>
      {`${remainingTime.days}d-${remainingTime.hours}h-${remainingTime.minutes}m-${remainingTime.seconds}s`}
    </IonCardSubtitle>
  );
};

export default CountdownTimer;
