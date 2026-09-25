
export default function Contact() {
  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="sectionHeading">
          <span>GET IN TOUCH</span>
          <h2>Contact the Academy</h2>
        </div>

        <div className="contactGrid">
          <div className="contactDetails">
            <div className="contactItem">
              <span>📍</span>
              <div>
                <strong>Address</strong>
                <p>Kawasoti-2, Nawalpur, Nepal</p>
              </div>
            </div>

            <div className="contactItem">
              <span>☎</span>
              <div>
                <strong>Phone</strong>
                <a href="tel:+9779744343400">+977 974-4343400</a>
              </div>
            </div>

            <div className="contactItem">
              <span>✉</span>
              <div>
                <strong>Email</strong>
                <a href="mailto:msakawasoti41155@gmail.com">msakawasoti41155@gmail.com</a>
              </div>
            </div>

            <div className="contactItem">
              <span>🕐</span>
              <div>
                <strong>Office Hours</strong>
                <p>Monday – Friday</p>
              </div>
            </div>
          </div>

          <div className="mapContainer">
            <iframe
              src="https://www.google.com"
              loading="lazy"
              title="School location"
            />
          </div>
        </div>
      </div>
    </section>
  );
}