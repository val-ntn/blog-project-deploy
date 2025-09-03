// frontend/src/components/Admin/Forms/PostForm/PostForm.jsx

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import ImageSelector from "../../ImageSelector";
import styles from "./PostForm.module.css";
import ImageToolbar from "./ImageToolbar";
import RichTextEditor from "./RichTextEditor";
import CarouselSelector from "../../CarouselSelector";

export default function PostForm({ onCreateSuccess, initialData }) {
  const [users, setUsers] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [tags, setTags] = useState("");
  const [externalLinks, setExternalLinks] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [selectedCarousel, setSelectedCarousel] = useState(null);
  const [teaser, setTeaser] = useState("");
  const [thumbnail, setThumbnail] = useState("");

  const editorRef = useRef(null);
  const toolbarRef = useRef(null);
  const selectedImgRef = useRef(null);

  const nodeChangeHandler = useRef(null);

  // Selected sides state
  const [selectedSides, setSelectedSides] = useState(new Set(["all"]));

  // Fetch users on mount
  useEffect(() => {
    axios
      .get(`${API_BASE_URL}/users`, { withCredentials: true })
      .then((res) => setUsers(res.data))
      .catch(console.error);
  }, []);
  // Populate form if editing
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title ?? "");
      setContent(initialData.content ?? "");
      setAuthor(initialData.author ?? "");
      setCategory(initialData.category ?? "");
      setTags((initialData.tags ?? []).join(", "));
      setExternalLinks((initialData.externalLinks ?? []).join(", "));
      setExcerpt(initialData.excerpt ?? "");
      setTeaser(initialData.teaser ?? "");
      setThumbnail(initialData.thumbnail ?? "");
      setSelectedCarousel(initialData.carousel ?? null);
    }
  }, [initialData]);

  const clearForm = () => {
    setTitle("");
    setContent("");
    setAuthor("");
    setCategory("");
    setTags("");
    setExternalLinks("");
    setExcerpt("");
    setSelectedCarousel(null);
    setTeaser("");
    setThumbnail("");
    setSelectedSides(new Set(["all"]));
  };

  // Clear form if no initialData
  useEffect(() => {
    if (!initialData) clearForm();
  }, [initialData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      content,
      author,
      category,
      tags: tags
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      externalLinks: externalLinks
        .split(",")
        .map((l) => l.trim())
        .filter(Boolean),
      excerpt,
      teaser,
      thumbnail,
      ...(selectedCarousel && { carousel: selectedCarousel._id }),
    };

    try {
      if (initialData?._id) {
        await axios.put(`${API_BASE_URL}/posts/${initialData._id}`, payload, {
          withCredentials: true,
        });
        console.log("Post updated");
      } else {
        await axios.post(`${API_BASE_URL}/posts`, payload, {
          withCredentials: true,
        });
        console.log("Post created");
      }

      clearForm();
      onCreateSuccess?.();
    } catch (err) {
      console.error(
        `Error ${initialData ? "updating" : "creating"} post:`,
        err.response?.data || err.message
      );
    }
  };

  useEffect(() => {
    return () => {
      if (editorRef.current && nodeChangeHandler.current) {
        editorRef.current.off("NodeChange", nodeChangeHandler.current);
      }
    };
  }, []);

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

  const getIntStyle = (el, prop) => {
    if (el.style[prop]) {
      return parseInt(el.style[prop]) || 0;
    }
    const computed = window.getComputedStyle(el).getPropertyValue(prop);
    return parseInt(computed) || 0;
  };

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
    }
  };

  const showToolbarForImage = (img, editor) => {
    // Remove highlight from other images
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

  const hideToolbar = () => {
    if (toolbarRef.current) {
      toolbarRef.current.style.display = "none";
    }
    const editor = editorRef.current;
    if (editor && selectedImgRef.current) {
      editor.dom.removeClass(selectedImgRef.current, "margin-highlighted");
    }
    selectedImgRef.current = null;
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
    <>
      <h3>{initialData ? "Edit Blog Post" : "Create Blog Post"}</h3>

      <ImageToolbar
        selectedImgRef={selectedImgRef}
        toolbarRef={toolbarRef}
        selectedSides={selectedSides}
        setSelectedSides={setSelectedSides}
        onAction={handleToolbarAction}
      />

      <form onSubmit={handleSubmit} className={styles.formWrapper}>
        <label className={styles.label}>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className={styles.input}
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
              if (e.element.nodeName === "IMG") {
                showToolbarForImage(e.element, editor);
              } else {
                hideToolbar();
              }
            }}
          />
        </label>
        <label className={styles.label}>
          Excerpt (optional):
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            rows={3}
            placeholder="Write a short summary or leave blank to auto-generate."
            className={styles.textarea}
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
        <div className={styles.label}>
          <CarouselSelector
            selected={selectedCarousel}
            onSelect={setSelectedCarousel}
          />
          {selectedCarousel && (
            <div style={{ marginTop: "0.5rem", fontStyle: "italic" }}>
              Selected Carousel: <strong>{selectedCarousel.title}</strong>{" "}
              (Type: {selectedCarousel.type})
            </div>
          )}
        </div>

        <label className={styles.label}>
          Author:
          <select
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
            className={styles.select}
          >
            <option value="">Select author</option>
            {users.map((user) => (
              <option key={user._id} value={user._id}>
                {user.name || user.username}
              </option>
            ))}
          </select>
        </label>

        <label className={styles.label}>
          Category:
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          Tags (comma separated):
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </label>

        <label className={styles.label}>
          External Links (comma separated):
          <input
            type="text"
            value={externalLinks}
            onChange={(e) => setExternalLinks(e.target.value)}
          />
        </label>

        <button type="submit" className={styles.submitButton}>
          {initialData ? "Update Post" : "Create Post"}
        </button>
      </form>
    </>
  );
}
