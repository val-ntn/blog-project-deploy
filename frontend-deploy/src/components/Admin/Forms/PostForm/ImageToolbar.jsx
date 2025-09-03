// frontend/src/components/Admin/PostForm/ImageToolbar.jsx
import { useRef } from "react";
import styles from "./PostForm.module.css";

export default function ImageToolbar({
  selectedImgRef,
  toolbarRef,
  selectedSides,
  setSelectedSides,
  onAction,
}) {
  const toggleSide = (side) => {
    setSelectedSides((prev) => {
      const newSet = new Set(prev);
      if (side === "all") {
        newSet.clear();
        newSet.add("all");
        newSet.add("top");
        newSet.add("right");
        newSet.add("bottom");
        newSet.add("left");
      } else {
        newSet.delete("all");
        if (newSet.has(side)) {
          newSet.delete(side);
        } else {
          newSet.add(side);
        }
        if (["top", "right", "bottom", "left"].every((s) => newSet.has(s))) {
          newSet.add("all");
        }
      }
      return newSet;
    });
  };

  const getButtonStyle = (side) => ({
    fontWeight: selectedSides.has(side) ? "bold" : "normal",
    backgroundColor: selectedSides.has(side) ? "#d0e6ff" : "transparent",
    border: "1px solid #ccc",
    borderRadius: "3px",
    padding: "2px 6px",
    cursor: "pointer",
    userSelect: "none",
  });

  return (
    <div ref={toolbarRef} className={styles.toolbar}>
      <button
        onClick={() => toggleSide("all")}
        style={getButtonStyle("all")}
        title="All sides"
      >
        ■
      </button>
      <button
        onClick={() => toggleSide("top")}
        style={getButtonStyle("top")}
        title="Top margin"
      >
        ▀
      </button>
      <button
        onClick={() => toggleSide("right")}
        style={getButtonStyle("right")}
        title="Right margin"
      >
        ▐
      </button>
      <button
        onClick={() => toggleSide("bottom")}
        style={getButtonStyle("bottom")}
        title="Bottom margin"
      >
        ▄
      </button>
      <button
        onClick={() => toggleSide("left")}
        style={getButtonStyle("left")}
        title="Left margin"
      >
        ▌
      </button>
      <button
        onClick={() => onAction("increase-margin")}
        title="Increase margin"
      >
        ➕
      </button>
      <button
        onClick={() => onAction("decrease-margin")}
        title="Decrease margin"
      >
        ➖
      </button>
      <button onClick={() => onAction("align-left")} title="Align Left">
        ▌
      </button>
      <button onClick={() => onAction("align-right")} title="Align Right">
        ▐
      </button>
      <button onClick={() => onAction("reset-styles")} title="Reset styles">
        ⟲
      </button>
    </div>
  );
}
