import React, { useState } from "react";
import apiClient from "../services/apiClient";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setSubmitting(true);

    try {
      const { data } = await apiClient.post("/api/contact", {
        contact_name: form.name,
        contact_email: form.email,
        contact_message: form.message,
      });

      if (data?.ok || data?.success) {
        setSubmitted(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setError(data?.error || "I could not send the message. Please try again.");
      }
    } catch (err) {
      setError(err?.response?.data?.error || "I could not send the message. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="form-success" role="status">
        <span>Message received.</span>
        <p>Thank you for reaching out. I’ll get back to you soon.</p>
        <button type="button" className="text-button" onClick={() => setSubmitted(false)}>
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {error && <div className="form-error" role="alert">{error}</div>}

      <label>
        Name
        <input
          type="text"
          name="name"
          autoComplete="name"
          value={form.name}
          onChange={updateField}
          required
        />
      </label>

      <label>
        Email
        <input
          type="email"
          name="email"
          autoComplete="email"
          value={form.email}
          onChange={updateField}
          required
        />
      </label>

      <label>
        Message
        <textarea
          name="message"
          rows="5"
          value={form.message}
          onChange={updateField}
          required
        />
      </label>

      <button className="primary-button" type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
