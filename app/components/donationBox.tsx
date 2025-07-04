"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

const DONATION_AMOUNTS = [50, 25, 10, 5];

export default function DonationBox() {
  const [selected, setSelected] = useState<number | "custom" | null>(null);
  const [custom, setCustom] = useState("");
  const router = useRouter();

  const handleDonate = () => {
    const amount = selected === "custom" ? custom : selected;
    if (amount && Number(amount) > 0) {
      router.push(`/donate?amount=${amount}`);
    }
  };

  return (
    <div
      style={{
        marginTop: "5rem",
        background: "#E8EDDF",
        borderRadius: "16px",
        padding: "1.2rem 2rem",
        boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
        maxWidth: 450,
        width: "100%",
        textAlign: "center",
        fontFamily: 'Rubik',
      }}
    >
      <h2
        style={{
          fontFamily: 'Rubik',
          fontWeight: 600,
          marginBottom: "1.5rem",
          color: "#6B4A1B",
          fontSize: "2.5rem",
          lineHeight: 1.15,
          whiteSpace: "normal",
        }}
      >
        THANK YOU FOR<br />YOUR SUPPORT
      </h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "1.2rem", marginBottom: "1.2rem" }}>
        {DONATION_AMOUNTS.map((amt) => (
          <button
            key={amt}
            onClick={() => {
              if (selected === amt) {
                setSelected(null);
              } else {
                setSelected(amt);
                setCustom("");
              }
            }}
            style={{
              fontFamily: 'Rubik',
              flex: "1 1 40%",
              padding: "1rem 0",
              borderRadius: "8px",
              border: selected === amt ? "3px solid #6B4A1B" : "3px solid transparent",
              background: "#F6C452",
              color: "#6B4A1B",
              fontWeight: 700,
              fontSize: "1.3rem",
              cursor: "pointer",
              transition: "border 0.2s, background 0.2s",
              boxSizing: "border-box",
            }}
          >
            ${amt}
          </button>
        ))}
      </div>
      <div
        style={{
          fontFamily: 'Rubik',
          display: "flex",
          alignItems: "center",
          gap: "0.7rem",
          marginBottom: "0.5rem",
          padding: "0.7rem",
          background: "#F6C452",
          borderRadius: "8px",
        }}
      >
        <span style={{ fontFamily: 'Rubik', fontWeight: 700, color: "#6B4A1B", fontSize: "1.2rem" }}>CUSTOM</span>
        <input
          type="number"
          min={1}
          placeholder="$"
          value={custom}
          onFocus={() => setSelected("custom")}
          onChange={e => { setCustom(e.target.value); setSelected("custom"); }}
          style={{
            fontFamily: 'Rubik',
            flex: 1,
            padding: "0.7rem",
            borderRadius: "8px",
            border: selected === "custom" ? "3px solid #F6C452" : "3px solid #F6C452",
            outline: "none",
            fontSize: "1.2rem",
            background: "#fff",
            color: "#6B4A1B",
            fontWeight: 700,
            transition: "border 0.2s",
          }}
        />
      </div>
      <button
        onClick={handleDonate}
        style={{
          fontFamily: 'Rubik',
          width: "100%",
          padding: "1rem 0",
          borderRadius: "8px",
          background: "#664C43",
          color: "#fff",
          fontWeight: 700,
          fontSize: "1.3rem",
          border: "none",
          cursor: "pointer",
          letterSpacing: "1px",
          transition: "background 0.2s",
        }}
        disabled={
          (selected === null) ||
          (selected === "custom" && (!custom || Number(custom) <= 0))
        }
      >
        DONATE
      </button>
    </div>
  );
}