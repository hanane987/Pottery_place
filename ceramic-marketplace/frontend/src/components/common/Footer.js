const Footer = () => {
  return (
    <footer className="pottery-footer">
      <div className="pottery-container">
        <div className="footer-content">
          <div className="footer-brand">
            <h2 className="footer-logo">Pottery Studio</h2>
            <p className="footer-tagline">Handcrafted with passion since 1985</p>
            <address className="footer-address">400 University Drive Suite 200, Coral Gables, FL 33134 USA</address>
          </div>
          <div className="footer-bottom">
            <div className="copyright">© {new Date().getFullYear()} Pottery Studio. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;