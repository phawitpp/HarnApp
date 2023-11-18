"use client";

import { FormEvent, Suspense, useEffect, useState } from "react";
import Image from "next/image";
import MobileDetect from "mobile-detect";
import Tab1 from "./tab1";
import Tab2 from "./tab2";
const HanForm = () => {
  const [tab, setTab] = useState(1);
  const md = new MobileDetect(window.navigator.userAgent);

  useEffect(() => {
    document.getElementById("agent")?.append(window.navigator.userAgent);
  });
  return (
    <>
      {md.os() == "iPadOS" ||
      md.is("iPad") ||
      md.match("Macintosh; Intel Mac OS X") ? (
        <div className="alert lg:w-1/2" id="info">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-info shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>สำหรับคนใช้ iPad ให้อัพเดท IOS เป็น version ล่าสุด</span>
          <div>
            <button
              className="btn btn-sm"
              onClick={() => {
                document.getElementById("info")?.remove();
              }}
            >
              ปิด
            </button>
          </div>
        </div>
      ) : (
        <></>
      )}
      <div className="tabs tabs-lifted w-full max-w-xs">
        <a
          className={tab == 1 ? "tab tab-active text-lg" : "tab"}
          onClick={() => setTab(1)}
        >
          หารเท่า
        </a>

        <a
          className={tab == 2 ? "tab tab-active text-lg" : "tab"}
          onClick={() => setTab(2)}
        >
          หารไม่เท่า
        </a>
      </div>
      {tab == 1 ? <Tab1 /> : <Tab2 />}
    </>
  );
};

export default HanForm;
