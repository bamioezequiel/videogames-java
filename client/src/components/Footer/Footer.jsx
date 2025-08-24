import React from 'react';
import { NavLink } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaGlobe } from 'react-icons/fa';

import s from './Footer.module.css';

export default function Footer() {
  const socialLinks = [
    { href: 'https://www.facebook.com/profile.php?id=61579561078450', icon: <FaFacebookF /> },
    { href: 'https://bamio.vercel.app/', icon: <FaGlobe /> },
    { href: 'https://www.instagram.com/bamio.dev/', icon: <FaInstagram /> },
    { href: 'https://www.linkedin.com/in/ezequielbamio/', icon: <FaLinkedinIn /> },
  ];

  const pageLinks = [
    { to: '/about', label: 'About us' },
    { to: '/about', label: 'Privacy & Cookies' },
    { to: '/about', label: 'Terms & Conditions' },
    { to: '/about', label: 'FAQ' },
  ];

  return (
    <div className={s.footer_container}>
      <hr />
      <footer className={s.footer}>
        
        {/* Redes sociales */}
        <div className={s.footer_social}>
          {socialLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={s.footer_social_icon}
            >
              {link.icon}
            </a>
          ))}
        </div>

        {/* Enlaces */}
        <nav className={s.footer_links}>
          {pageLinks.map((link, idx) => (
            <React.Fragment key={idx}>
              <NavLink to={link.to} className={s.footer_link}>
                {link.label}
              </NavLink>
              {idx < pageLinks.length - 1 && <span>|</span>}
            </React.Fragment>
          ))}
        </nav>

        {/* Copyright */}
        <div className={s.footer_copyright}>
          <p>© {new Date().getFullYear()} Copyright. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
