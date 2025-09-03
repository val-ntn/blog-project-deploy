// frontend/src/components/Admin/Forms/ReportForm/ReportForm.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import ImageSelector from "../../ImageSelector";
import CarouselSelector from "../../CarouselSelector";
import styles from "./ReportForm.module.css";
import ImageToolbar from "./ImageToolbar";
import RichTextEditor from "./RichTextEditor";

export default function ReportForm({ onCreateSuccess, initialData }) {
  const [events, setEvents] = useState([]);
  const [users, setUsers] = useState([]);

  const [eventId, setEventId] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [selectedCarousel, setSelectedCarousel] = useState(null);
  const [teaser, setTeaser] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const [selectedSides, setSelectedSides] = useState(new Set(["all"]));
  const [loading, setLoading] = useState(false);

  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const selectedImgRef = useRef(null);

  // Fetch events and users on mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/events`, { withCredentials: true })
      .then((res) => setEvents(res.data))
      .catch(console.error);

    axios
      .get(`${API_BASE_URL}/users`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);

  // Populate form if editing existing report
  useEffect(() => {
    if (initialData) {
      setEventId(initialData.event?._id ?? initialData.event ?? "");
      setTitle(initialData.title ?? "");
      setContent(initialData.content ?? "");
      setAuthor(initialData.author?._id ?? initialData.author ?? "");
      setExcerpt(initialData.excerpt ?? "");
      setTeaser(initialData.teaser ?? "");
      setThumbnail(initialData.thumbnail ?? "");
      setSelectedCarousel(initialData.carousel ?? null);
    }
  }, [initialData]);

  // Clear form helper
  const clearForm = () => {
    setEventId("");
    setTitle("");
    setContent("");
    setAuthor("");
    setExcerpt("");
    setTeaser("");
    setThumbnail("");
    setSelectedCarousel(null);
    setSelectedSides(new Set(["all"]));
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      event: eventId,
      title,
      content,
      author,
      excerpt,
      teaser,
      thumbnail,
      ...(selectedCarousel ? { carousel: selectedCarousel._id } : {}),
    };

    try {
      if (initialData?._id) {
        await axios.put(
          `${API_BASE_URL}/event-reports/${initialData._id}`,
          payload,
          {
            withCredentials: true,
          }
        );
        console.log("Report updated");
      } else {
        await axios.post(`${API_BASE_URL}/event-reports`, payload, {
          withCredentials: true,
        });
        console.log("Report created");
        clearForm();
      }

      onCreateSuccess?.();
    } catch (err) {
      console.error(
        `Error ${initialData ? "updating" : "creating"} report:`,
        err.response?.data || err.message
      );
    } finally {
      setLoading(false);
    }
  };

  // Helpers to get int style for margin adjustments
  const getIntStyle = (el, prop) => {
    if (el.style[prop]) {
      return parseInt(el.style[prop]) || 0;
    }
    const computed = window.getComputedStyle(el).getPropertyValue(prop);
    return parseInt(computed) || 0;
  };

  // Toolbar image margin and alignment handler
  const handleToolbarAction = (action) => {
    const img = selectedImgRef.current;
    if (!img) return;
    const sides = selectedSides;

    const updateMargin = (side, delta) => {
      const propMap = {
        top: "marginTop",
        right: "marginRight",
        bottom: "marginBottom",
        left: "marginLeft",
      };
      const cssProp = propMap[side];
      if (!cssProp) return;
      const current = getIntStyle(img, cssProp);
      const newValue = Math.max(current + delta, 0);
      img.style[cssProp] = `${newValue}px`;
    };

    switch (action) {
      case "increase-margin":
        sides.forEach((side) => {
          if (side !== "all") updateMargin(side, 10);
        });
        break;
      case "decrease-margin":
        sides.forEach((side) => {
          if (side !== "all") updateMargin(side, -10);
        });
        break;
      case "align-left":
        img.style.float = "left";
        img.style.marginRight = "1em";
        img.style.marginBottom = "1em";
        break;
      case "align-right":
        img.style.float = "right";
        img.style.marginLeft = "1em";
        img.style.marginBottom = "1em";
        break;
      case "reset-styles":
        img.removeAttribute("style");
        break;
      default:
        break;
    }
  };

  // Hide image toolbar & remove highlights
  const hideToolbar = () => {
    if (toolbarRef.current) toolbarRef.current.style.display = "none";

    const editor = editorRef.current;
    if (editor && selectedImgRef.current) {
      editor.dom.removeClass(selectedImgRef.current, "margin-highlighted");
    }

    selectedImgRef.current = null;
  };

  // Show image toolbar & highlight image
  const showToolbarForImage = (img, editor) => {
    editor.dom.removeClass(
      editor.getBody().querySelectorAll("img"),
      "margin-highlighted"
    );
    editor.dom.addClass(img, styles.imageHighlighted);

    selectedImgRef.current = img;

    const rect = img.getBoundingClientRect();
    const top = rect.top + window.scrollY;
    const left = rect.left + window.scrollX;
    const toolbar = toolbarRef.current;

    if (toolbar) {
      toolbar.style.top = `${top + rect.height + 10}px`;
      toolbar.style.left = `${left}px`;
      toolbar.style.display = "flex";
      toolbar.style.flexWrap = "wrap";
    }
  };

  return (
    <>
      <h3>{initialData ? "Edit Report" : "Create Report"}</h3>

      <ImageToolbar
        selectedImgRef={selectedImgRef}
        toolbarRef={toolbarRef}
        selectedSides={selectedSides}
        setSelectedSides={setSelectedSides}
        onAction={handleToolbarAction}
      />

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <label className={styles.label}>
          Event:
          <select
            value={eventId}
            onChange={(e) => setEventId(e.target.value)}
            required
            className={styles.select}
            disabled={loading}
          >
            <option value="">Select event</option>
            {events.map((ev) => (
              <option key={ev._id} value={ev._id}>
                {ev.title}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
            disabled={loading}
          />
        </label>

        <label className={styles.label}>
          Content:
          <RichTextEditor
            value={content}
            onChange={setContent}
            editorRef={editorRef}
            onNodeChange={(e) => {
              const editor = editorRef.current;
              if (e.element?.nodeName === "IMG") {
                showToolbarForImage(e.element, editor);
              } else {
                hideToolbar();
              }
            }}
          />
        </label>

        <label className={styles.label}>
          Excerpt:
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="Short summary of report"
            className={styles.textarea}
            disabled={loading}
          />
        </label>
        <label className={styles.label}>
          Teaser (optional):
          <textarea
            value={teaser}
            onChange={(e) => setTeaser(e.target.value)}
            rows={2}
            placeholder="Short promotional teaser text"
            className={styles.textarea}
          />
        </label>
        <label className={styles.label}>
          Thumbnail:
          <div style={{ marginTop: "0.5rem" }}>
            <ImageSelector onSelect={(url) => setThumbnail(url)} />
            {thumbnail && (
              <div style={{ marginTop: "0.5rem" }}>
                <img
                  src={thumbnail}
                  alt="Thumbnail preview"
                  style={{ maxWidth: "150px", borderRadius: "4px" }}
                />
                <button
                  type="button"
                  onClick={() => setThumbnail("")}
                  style={{ marginLeft: "0.5rem" }}
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </label>

        <div style={{ margin: "1rem 0" }}>
          <ImageSelector
            onSelect={(url) => {
              if (editorRef.current) {
                editorRef.current.insertContent(
                  `<img src="${url}" alt="Image" />`
                );
              }
            }}
          />
        </div>

        <CarouselSelector
          onSelect={(carousel) => setSelectedCarousel(carousel)}
          disabled={loading}
        />

        {selectedCarousel && (
          <div>
            Selected Carousel: <strong>{selectedCarousel.title}</strong> (Type:{" "}
            {selectedCarousel.type})
          </div>
        )}

        <label className={styles.label}>
          Author:
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.select}
            disabled={loading}
          >
            <option value="">Select author</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.username}
              </option>
            ))}
          </select>
        </label>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={loading}
        >
          {loading
            ? initialData
              ? "Updating..."
              : "Creating..."
            : initialData
            ? "Update Report"
            : "Create Report"}
        </button>
      </form>
    </>
  );
}
