
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3534.6845579781!2d84.12545907516869!3d27.63428462871063!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399451d45088d1c9%3A0xa7a8a9cdf657dab5!2sMadhyabindu%20Skyline%20Academy!5e0!3m2!1sen!2snp!4v1790337150934!5m2!1sen!2snp" width="600" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
          </div>
        </div>
      </div>
    </section>
  );
}