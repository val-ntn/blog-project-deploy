// frontend/src/components/admin/CarouselSelector.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../../utils/api";
import PropTypes from "prop-types";
import CarouselList from "../Images-Carousels/CarouselList";
import Button from "../UI/Button";

export default function CarouselSelector({ onSelect }) {
  const [open, setOpen] = useState(false);
  const [carousels, setCarousels] = useState([]);
  const [viewMode, setViewMode] = useState("grid");

  /*   useEffect(() => {
    if (!open) return;
    axios
      .get(`${API_BASE_URL}/carousels`, { withCredentials: true })
      .then((res) => setCarousels(res.data))
      .catch(console.error);
  }, [open]);

  const handleSelect = (carousel) => {
    onSelect(carousel);
    setOpen(false);
  };
 */

  useEffect(() => {
    if (open) {
      axios
        .get(`${API_BASE_URL}/carousels`, { withCredentials: true })
        .then((res) => setCarousels(res.data))
        .catch(console.error);
    }
  }, [open]);

  const handleSelect = (carousel) => {
    onSelect(carousel);
    setOpen(false);
  };

  return (
    <div>
      <Button type="button" onClick={() => setOpen(!open)} variant="primary">
        Insert Carousel
      </Button>

      {open && (
        <div>
          <button
            type="button"
            onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
          >
            Switch to {viewMode === "grid" ? "List View" : "Grid View"}
          </button>

          <CarouselList
            carousels={carousels}
            onSelect={handleSelect}
            disableDelete={true}
            viewMode={viewMode}
          />
        </div>
      )}
    </div>
  );
}

CarouselSelector.propTypes = {
  onSelect: PropTypes.func.isRequired, // must be a function
};