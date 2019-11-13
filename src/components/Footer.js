import React from 'react';

const Footer = ({ user }) => {
  const accuracyPercentage = Math.round(user.timesCorrect / user.timesTested * 100);

  return (
    <footer role='contentinfo'>
      <section id='player_stats'>
        <p>
          {`
            ${user.name}: level
            ${user.level} -
            ${user.xp.current}/
            ${user.xp.goal} XP -
            ${Number.isFinite(accuracyPercentage) ? accuracyPercentage : 0}%
          `}
        </p>
      </section>
    </footer>
  );
};

export default Footer;
