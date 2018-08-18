import React from 'react';

const TestQuestion = ({ question, validateAnswer }) => (
  <section id='test_body'>
    <div id='answer_a'>
      <p>{question.answer_a}</p>
      <input id='answer_a_button' type='button' onClick={validateAnswer} value='A'/>
    </div>
    <div id='answer_b'>
      <p>{question.answer_b}</p>
      <input id='answer_a_button' type='button' onClick={validateAnswer} value='B'/>
    </div>
  </section>
);

export default TestQuestion;
