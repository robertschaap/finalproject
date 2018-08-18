import React from 'react';

const TestAnswer = ({ answer, nextQuestion }) => (
  <section id='test_body'>
    <div id='result'>
      <p>The correct answer was:<br />{answer}</p>
      <input id='next_button' type='button' value='Next Question' onClick={nextQuestion}/>
    </div>
  </section>
);

export default TestAnswer;
