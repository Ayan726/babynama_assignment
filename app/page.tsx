"use client";

import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { FaPauseCircle } from "react-icons/fa";
import { FaCirclePlay } from "react-icons/fa6";

export default function Home() {
  const [inp, setInp] = useState<string>("");
  const [sec, setSec] = useState<number>(0);
  const [pause, setPause] = useState<boolean>(true);
  let intervalId: NodeJS.Timeout | null = null;

  useEffect(() => {
    if (!pause) {
      setInp("");
      if (sec === 0) return alert("set time!!");
      intervalId = setInterval(() => {
        setSec((prev) => {
          if (prev === 1) {
            clearInterval(intervalId as NodeJS.Timeout);
            setPause((prev) => !prev);
            return 0;
          } else return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalId) clearInterval(intervalId as NodeJS.Timeout);
    };
  }, [pause]);

  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <input
          value={inp}
          disabled={!pause}
          className={styles.input}
          onChange={(e) => {
            setInp(e.target.value);
            setSec(Number(e.target.value || "0") * 60);
          }}
          type="number"
          placeholder="Enter minutes here"
        />
        <div>
          <h3 className={styles.timer}>
            <div onClick={() => setPause((prev) => !prev)}>
              {pause && <FaCirclePlay />}
              {!pause && <FaPauseCircle />}
            </div>
            {String(Math.floor(sec / 3600)).length === 1 && "0"}
            {Math.floor(sec / 3600)}:
            {String(Math.floor((sec % 3600) / 60)).length === 1 && "0"}
            {Math.floor((sec % 3600) / 60)}:
            {String((sec % 3600) % 60).length === 1 && "0"}
            {(sec % 3600) % 60}
          </h3>
        </div>
      </div>
    </main>
  );
}
