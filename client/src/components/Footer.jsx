export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-left">
            <div className="footer-brand">
              ✈️ Travel<span>AI</span>
            </div>
            <div className="footer-copy">
              © {new Date().getFullYear()} TravelAI. Powered by Google Gemini.
            </div>
          </div>
          <div className="footer-links">
            <a href="/">Home</a>
            <a href="/planner">Plan a Trip</a>
            <a href="https://aistudio.google.com" target="_blank" rel="noopener noreferrer">
              Get API Key
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
