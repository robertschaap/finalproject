import React from 'react';
import TestQuestion from './TestQuestion';
import TestAnswer from './TestAnswer';

class Test extends React.Component {
  constructor() {
    super();
    this.state = {
      questions: [],
      questionIndex: 0,
      questionCurrent: {
        category: '',
        identifier: '',
        question: '',
        answer_a: '',
        answer_b: '',
        right_answer: ''
      },
      showAnswer: false,
      cardCount: 0
    };
  }

  componentDidMount() {
    const headers = new Headers();
    headers.append('auth', localStorage.getItem('chip'));

    fetch('/api/cards', { headers: headers })
      .then(res => res.json())
      .then(data => {
        this.setState({
          questions: data,
          questionIndex: 0,
          questionCurrent: data[0]
        });
      });
  }

  toggleResult() {
    this.setState({
      showAnswer: !this.state.showAnswer
    });
  }

  validateAnswer(answer) {
    const { right_answer, identifier } = this.state.questionCurrent;
    const { changeScore } = this.props;

    if (answer.target.value === right_answer ) {
      changeScore(10, identifier);
    } else {
      changeScore(0, identifier);
    }
    this.toggleResult();
  }

  nextQuestion() {
    const { questionIndex, questions, cardCount } = this.state;

    if (questionIndex === questions.length -1 ) {
      this.setState({
        questionIndex: 0,
        questionCurrent: questions[0]
      });
    } else {
      this.setState({
        questionIndex: questionIndex + 1,
        questionCurrent: questions[questionIndex + 1],
        cardCount: cardCount + 1
      });
    }
    this.toggleResult();
  }

  render() {
    const {
      answer_a,
      answer_b,
      category,
      right_answer,
      question,
    } = this.state.questionCurrent;

    const { showAnswer } = this.state;

    let correctAnswer = right_answer === 'A' ? answer_a : answer_b;

    return (
      <main role='main'>
        <section id='test_container'>

          <section id='test_header'>
            <div id='question_header'>
              {category}:
            </div>
            <div id='question_body'>{question}</div>
          </section>

          {showAnswer
            ? <TestAnswer answer={correctAnswer} nextQuestion={this.nextQuestion.bind(this)}/>
            : <TestQuestion question={this.state.questionCurrent} validateAnswer={this.validateAnswer.bind(this)}/>
          }

        </section>
      </main>

    );
  }
}

export default Test;
