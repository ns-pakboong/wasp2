import React from 'react';
import './Navigation_Bar.css'; // Import CSS file for styling

function NavigationBar() {
  // JavaScript for adding active class to the current navigation item
  var currentLocation = window.location.href;
  var links = [
    { href: '#home', text: 'Home' },
    { href: '#news', text: 'News' },
    { href: '#contact', text: 'Contact' },
    { href: '#about', text: 'About' }
  ];

  return (
    <ul>
      {links.map((link, index) => (
        <li key={index}>
          <a href={link.href} className={currentLocation === link.href ? 'active' : ''}>
            {link.text}
          </a>
        </li>
      ))}
    </ul>
  );
}

export default NavigationBar;
