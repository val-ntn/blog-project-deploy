//src/components/Admin/Forms/EventForm.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../../../utils/api";
import styles from "./EventForm.module.css";

export default function EventForm({ initialData = null, onCreateSuccess }) {
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [location, setLocation] = useState("");
  const [contact, setContact] = useState("");
  const [schedule, setSchedule] = useState("");
  const [costs, setCosts] = useState("");
  const [source, setSource] = useState("");
  const [iconURL, setIconURL] = useState("");
  const [imageURL, setImageURL] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title || "");
      setStartDate(
        initialData.startDate ? initialData.startDate.slice(0, 10) : ""
      );
      setEndDate(initialData.endDate ? initialData.endDate.slice(0, 10) : "");
      setLocation(initialData.location || "");
      setContact(initialData.contact || "");
      setSchedule(initialData.schedule || "");
      setCosts(initialData.costs || "");
      setSource(initialData.source || "");
      setIconURL(initialData.iconURL || "");
      setImageURL(initialData.imageURL || "");
      setDescription(initialData.description || "");
    } else {
      clearForm();
    }
  }, [initialData]);

  const clearForm = () => {
    setTitle("");
    setStartDate("");
    setEndDate("");
    setLocation("");
    setContact("");
    setSchedule("");
    setCosts("");
    setSource("");
    setIconURL("");
    setImageURL("");
    setDescription("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      title,
      startDate,
      endDate,
      location,
      contact,
      schedule,
      costs,
      source,
      iconURL,
      imageURL,
      description,
    };

    try {
      if (initialData?._id) {
        await axios.put(`${API_BASE_URL}/events/${initialData._id}`, payload, {
          withCredentials: true,
        });
        console.log("Event updated");
      } else {
        await axios.post(`${API_BASE_URL}/events`, payload, {
          withCredentials: true,
        });
        console.log("Event created");
      }

      clearForm();
      onCreateSuccess?.();
    } catch (err) {
      console.error(
        `Error ${initialData ? "updating" : "creating"} event:`,
        err.response?.data || err.message
      );
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.formWrapper}>
      <h3>{initialData ? "Edit Event" : "Create Event"}</h3>

      <label className={styles.label}>
        Title
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Start Date
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        End Date
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          required
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Location
        <input
          type="text"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Contact
        <input
          type="text"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Description
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Enter a short description of the event"
          className={styles.textarea}
        />
      </label>

      <label className={styles.label}>
        Schedule
        <input
          type="text"
          value={schedule}
          onChange={(e) => setSchedule(e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Costs
        <input
          type="text"
          value={costs}
          onChange={(e) => setCosts(e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Source
        <input
          type="text"
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Icon URL
        <input
          type="text"
          value={iconURL}
          onChange={(e) => setIconURL(e.target.value)}
          className={styles.input}
        />
      </label>

      <label className={styles.label}>
        Image URL
        <input
          type="text"
          value={imageURL}
          onChange={(e) => setImageURL(e.target.value)}
          className={styles.input}
        />
      </label>

      <button type="submit" className={styles.submitButton}>
        {initialData ? "Update Event" : "Create Event"}
      </button>
    </form>
  );
}
