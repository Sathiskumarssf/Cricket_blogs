import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/Footer.module.css'; // Import CSS module
import facebookIcon from '../assets/facebook.png';
import instagramIcon from '../assets/Instagram-Logo.jpg';
import twitterIcon from '../assets/twitter.png';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.leftSide}>
          <h1 className={styles.footerHeading}>Follow To Talk</h1>
          <hr className={styles.divider} />
          <div className={styles.socialMedia}>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
              <Image src={facebookIcon} alt="Facebook"  className={styles.socialmediaimage} />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
              <Image src={instagramIcon} alt="Instagram" className={styles.socialmediaimage}  />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
              <Image src={twitterIcon} alt="Twitter"  className={styles.socialmediaimage} />
            </a>
          </div>
        </div>
        <div className={styles.rightSide}>
          <h1 className={styles.footerHeading}>Services</h1>
          <hr className={styles.divider} />
          <nav className={styles.nav}>
            <ul>
              <li><Link href="/">Home</Link></li>
              <li><Link href="/about">About</Link></li>
              <li><Link href="/services">Services</Link></li>
              <li><Link href="/contact">Contact</Link></li>
            </ul>
          </nav>
          <div className={styles.copy}>
            <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
