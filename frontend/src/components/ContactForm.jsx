import React, { useState } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const onChange = (e) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e) => {
    e.preventDefault();
    setErr("");
    setSending(true);
    try {
      const { data } = await axios.post(`${API_BASE}/api/contact`, form, {
        headers: { "Content-Type": "application/json" },
      });
      if (data?.ok) {
        setOk(true);
        setForm({ name: "", email: "", message: "" });
      } else {
        setErr("Something went wrong. Please try again.");
      }
    } catch (e) {
      console.error("Contact submit error:", e);
      setErr("Failed to send. Please try again later.");
    } finally {
      setSending(false);
    }
  };

  if (ok) {
    return (
      <div className="alert alert-success mt-3 mb-0" role="alert">
        ✅ Your message was received! I’ll get back to you soon.
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="tm-contact-form">
      {err && <div className="alert alert-danger py-2">{err}</div>}

      <div className="form-group">
        <input
          type="text"
          id="contact_name"
          name="name"
          className="form-control"
          placeholder="Name"
          value={form.name}
          onChange={onChange}
          required
          style={{ color: "black" }}
        />
      </div>

      <div className="form-group">
        <input
          type="email"
          id="contact_email"
          name="email"
          className="form-control"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          required
          style={{ color: "black" }}
        />
      </div>

      <div className="form-group">
        <textarea
          id="contact_message"
          name="message"
          className="form-control"
          rows="5"
          placeholder="Message"
          value={form.message}
          onChange={onChange}
          required
          style={{ color: "black" }}
        />
      </div>

      <button type="submit" className="tm-btn" disabled={sending}>
        {sending ? "Sending..." : "Submit"}
      </button>
    </form>
  );
}
