import React from 'react';
import profilePic from '../assets/profile-pic.jpg';
import { rhythm } from '../utils/typography';

const Bio = () => (
  <div
    style={{
      display: 'flex',
      marginBottom: rhythm(2),
    }}
  >
    <img
      src={profilePic}
      alt={`Niall Barber`}
      style={{
        marginRight: rhythm(1 / 2),
        marginBottom: 0,
        width: rhythm(2),
        height: rhythm(2),
        borderRadius: '50%',
      }}
    />
  </div>
);

export default Bio;
