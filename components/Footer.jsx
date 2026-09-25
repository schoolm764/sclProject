
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerGrid">
        <div>
          <h3>Madhyabindu Sky Line Academy</h3>
          <p>
            Inspiring young minds and building bright futures
            through quality education.
          </p>
        </div>

        <div>
          <h4>Explore</h4>

          <a href="#about">About</a>
          <a href="#academics">Academics</a>
          <a href="#notices">Notices</a>
          <a href="#admissions">Admissions</a>
          <a href="#contact">Contact</a>
        </div>

        <div className="contact-section">
          <h4>Contact Us</h4>
          <p><strong>Address:</strong> Kawasoti-2, Nawalpur, Nepal</p>
          <p><strong>Phone (Mobile):</strong> <a href="tel:+9779744343400">+977 974-4343400</a></p>
          <p><strong>Phone (Landline):</strong> <a href="tel:078541155">078-541155</a></p>
          <p><strong>Email:</strong> <a href="mailto:msakawasoti41155@gmail.com">msakawasoti41155@gmail.com</a></p>
        </div>
      </div>

      <div className="footerBottom">
        © {new Date().getFullYear()} Madhyabindu Skyline Academy.
        All rights reserved.
      </div>
    </footer>
  );
}