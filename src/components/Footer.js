import React from 'react';

import { rhythm } from '../utils/typography';

const Footer = () => (
  <footer
    style={{
      marginTop: rhythm(2.5),
      paddingTop: rhythm(1),
    }}
  >
    <a
      href="https://github.com/nialldbarber"
      target="_blank"
      rel="noopener noreferrer"
    >
      github
    </a>
  </footer>
);

export default Footer;
