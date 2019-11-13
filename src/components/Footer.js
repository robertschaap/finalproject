import React from 'react';

const Footer = ({ user }) => {

  return (
    <footer role='contentinfo'>
      <section id='player_stats'>
        <p>
          {`
            ${user.name}: level
            ${user.level} -
            ${user.xp.current}/
            ${user.xp.goal} XP -
            ${Math.round(user.timesCorrect / user.timesTested * 100)}%
          `}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
