import './Footer.css';

function Footer() {
  return(
    <section className="footer">
      <p className="footer__copyright">&copy; <span>{ new Date().getFullYear() }</span> My D&amp;D Campaign</p>
    </section>
  );
}

export default Footer;