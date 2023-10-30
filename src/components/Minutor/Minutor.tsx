"use client";
import React, { useEffect, useState } from "react";
import style from "./Minutor.module.scss";

const Minutor = () => {
  const [minutes, setMinutes] = useState(19);
  const [seconds, setSeconds] = useState(59);

  useEffect(() => {
    if (seconds <= 0) {
      setMinutes(minutes - 1);
      setSeconds(59);
    }
    if (minutes <= 0) {
      setMinutes(19);
      setSeconds(59);
    }

    setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);
  }, [seconds, minutes]);

  return (
    <div className={style.timer}>
      {minutes} : {seconds < 10 ? `0${seconds}` : seconds}
    </div>
  );
};

export default Minutor;
