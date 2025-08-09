function ContactForm() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [messageText, setMessageText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    setSubmitting(true);

    try {
      const { data } = await axios.post('/api/contact', {
        contact_name: name,
        contact_email: email,
        contact_message: messageText,
      });

      if (data?.ok) {
        setSubmitted(true); // show success view
        setName('');
        setEmail('');
        setMessageText('');
      } else {
        setErr(data?.error || 'Failed to send message.');
      }
    } catch (error) {
      console.error(error);
      setErr('Failed to send message.');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    // This shows after submit; on refresh the form will be back (state resets)
    return (
      <>
        <h2 className="tm-section-title tm-red-text">Let's Connect</h2>
        <div className="alert alert-success mt-3">
          ✅ Your message was received! I’ll get back to you soon.
        </div>
      </>
    );
  }

  return (
    <>
      <h2 className="tm-section-title tm-red-text">Let's Connect</h2>
      <p>Feel free to reach out to discuss opportunities, innovative projects, or ways we can collaborate.</p>

      {err && <div className="alert alert-danger">{err}</div>}

      <form className="tm-contact-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="text"
            id="contact_name"
            name="contact_name"
            className="form-control"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <div className="form-group">
          <input
            type="email"
            id="contact_email"
            name="contact_email"
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <div className="form-group">
          <textarea
            id="contact_message"
            name="contact_message"
            className="form-control"
            rows="5"
            placeholder="Message"
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            required
            style={{ color: 'black' }}
          />
        </div>
        <button type="submit" className="tm-btn" disabled={submitting}>
          {submitting ? 'Submitting…' : 'Submit'}
        </button>
      </form>
    </>
  );
}
