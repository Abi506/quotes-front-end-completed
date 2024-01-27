import { Component } from "react";
import Cookies from "js-cookie";
import { ThreeCircles } from "react-loader-spinner";
import Header from "../Header";

import "./index.css";

const status = {
  initial: "INITIAL",
  success: "SUCCESS",
  failure: "FAILURE",
  in_progress: "IN_PROGRESS",
};

const authorsData = [
  {
    id: 1,
    authorName: "Abdul Kalam",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/abdul_kalam_xyuozp.webp",
    aboutAuthor:
      "Abdul Kalam, often referred to as the Missile Man of India, was a renowned Indian scientist and politician who served as the 11th President of India from 2002 to 2007.He played a pivotal role in India's missile development and nuclear weapons program.",
  },
  {
    id: 2,
    authorName: "Albert Einstein",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353020/alber_einstein_nes7g8.jpg",
    aboutAuthor:
      "Albert Einstein was a German-born theoretical physicist who revolutionized our understanding of space, time, and gravity.His groundbreaking theory of relativity, summarized in the equation E=mc², transformed physics",
  },
  {
    id: 3,
    authorName: "Mahatma Gandhi",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/gandhi_kxvtly.jpg",
    aboutAuthor:
      "Mahatma Gandhi, born Mohandas Karamchand Gandhi, was a prominent leader of the Indian independence movement against British colonial rule. He advocated for nonviolent civil disobedience as a means to achieve political and social change. ",
  },
  {
    id: 4,
    authorName: "Nelson Mandela",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/nelson_mandela_l900iu.jpg",
    aboutAuthor:
      "Nelson Mandela was a South African anti-apartheid revolutionary, political leader, and philanthropist who served as President of South Africa from 1994 to 1999.He spent 27 years in prison for his activism against apartheid.",
  },
  {
    id: 5,
    authorName: "Abraham Lincoln",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353020/abrham_lincoln_b4idkk.jpg",
    aboutAuthor:
      "Abraham Lincoln was the 16th President of the United States, serving from 1861 until his assassination in 1865. He led the nation through the American Civil War, preserving the Union and ending slavery with the Emancipation Proclamation.",
  },
  {
    id: 6,
    authorName: "Swami Vivekananda",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/swami_vivekananda_icvaym.webp",
    aboutAuthor:
      "Swami Vivekananda was an Indian Hindu monk and philosopher who played a key role in introducing Indian philosophies of Vedanta and Yoga to the Western world. He was a disciple of the Indian mystic Ramakrishna Paramahamsa and founded the Ramakrishna Math and the Ramakrishna Mission.",
  },
  {
    id: 7,
    authorName: "Ambedkar",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/ambedkar_ca8uaa.png",
    aboutAuthor:
      "B. R. Ambedkar, born Bhimrao Ramji Ambedkar, was an Indian jurist, economist, and social reformer who campaigned against social discrimination faced by the Dalit community in India.He was the chief architect of the Indian Constitution and served as Law Minister of India.",
  },
  {
    id: 8,
    authorName: "Napoleon Hill",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/napolean_hill_kppshs.jpg",
    aboutAuthor:
      "Napoleon Hill was an American self-help author known for his seminal work Think and Grow Rich, which remains one of the best-selling books of all time. He studied successful individuals and distilled their principles into practical advice for achieving success. ",
  },
  {
    id: 9,
    authorName: "William Shakespeare",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/william_shakespear_jsaz4h.jpg",
    aboutAuthor:
      "William Shakespeare was an English playwright, poet, and actor, widely regarded as the greatest writer in the English language and the world's pre-eminent dramatist. His works, including plays like Hamlet, Romeo and Juliet and Macbeth, have been translated into every major living language .",
  },
  {
    id: 10,
    authorName: "Sai Baba",
    authorImg:
      "https://res.cloudinary.com/dkmnh0kwl/image/upload/v1706353019/sai_baba_nnzyom.jpg",
    aboutAuthor:
      "Sai Baba, also known as Shirdi Sai Baba, was a revered spiritual master and saint who lived in the late 19th and early 20th centuries in Shirdi, Maharashtra, India. He is widely worshipped by devotees of various faiths for his teachings on love, tolerance, charity, and the unity of all religions.",
  },
];

class Authors extends Component {
  state = {
    data: [],
    apiStatus: status.initial,
    displayAuthor: true,
    author: "",
  };

  componentDidMount() {
    this.getData();
  }

  eventTriggered = (value) => {
    console.log(value);
    const { displayAuthor } = this.state;
    this.setState({ displayAuthor: !displayAuthor, author: value }, () => {
      this.getData();
    });
  };

  getData = async () => {
    const { author } = this.state;
    console.log(author, "author");
    this.setState({ apiStatus: status.in_progress });
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:3001/author-quotes/?author=${author}`;
    console.log(url);
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: "GET",
    };
    const response = await fetch(url, options);
    if (response.ok) {
      const data = await response.json();
      const formattedData = data.map((each) => ({
        author: each.author,
        explanation: each.explanation,
        id: each.id,
        quote: each.quote,
      }));
      console.log(formattedData, "formatted Data");
      this.setState({ apiStatus: status.success, data: formattedData });
    } else {
      this.setState({ apiStatus: status.failure });
    }
  };

  backButtonTriggered = () => {
    const { displayAuthor } = this.state;
    this.setState({ displayAuthor: !displayAuthor });
  };

  renderLoader = () => (
    <div className="loader-container">
      <ThreeCircles type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  );

  renderSuccess = () => {
    const { displayAuthor, data } = this.state;
    return (
      <>
        <Header />
        <div className="authors-container">
          {displayAuthor === true && (
            <ul className="authors-list">
              {authorsData.map((each) => (
                <li
                  key={each.id}
                  className="each-author-authors-page"
                  onClick={() => this.eventTriggered(each.authorName)}
                >
                  <div className="author-image-name-container">
                    <div className="author-image-container">
                      <img
                        src={each.authorImg}
                        className="author-image"
                        alt={each.authorName}
                      />
                    </div>
                    <h1 className="author-name">{each.authorName}</h1>
                  </div>
                  <div className="about-author-container">
                    <p className="about-author-para">{each.aboutAuthor}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
          {displayAuthor === false && (
            <ul className="author-quotes-author-page">
              {data.map((each) => (
                <li className="each-quote-author-page" key={each.id}>
                  <h1 className="quote-heading-authors-page">"{each.quote}"</h1>
                  <p className="explanation-para-authors-page">
                    {each.explanation}
                  </p>
                </li>
              ))}
              <div className="back-button-container">
                <button
                  type="button"
                  className="back-button-styles"
                  onClick={this.backButtonTriggered}
                >
                  back
                </button>
              </div>
            </ul>
          )}
        </div>
      </>
    );
  };

  renderFail = () => (
    <div className="bookshelves-failed-container">
      <div>
        <img
          src="https://res.cloudinary.com/dkmnh0kwl/image/upload/v1699932471/Group_7522_b4fynz.png"
          alt="failure view"
          className="bookshelves-failed-image"
        />
      </div>
      <p className="failed-para">Something went wrong. Please try again</p>
      <div>
        <button
          type="button"
          className="failed-button"
          onClick={this.retryEvent}
        >
          Try Again
        </button>
      </div>
    </div>
  );

  renderFinal = () => {
    const { apiStatus } = this.state;
    switch (apiStatus) {
      case status.in_progress:
        return this.renderLoader();
      case status.success:
        return this.renderSuccess();
      default:
        return this.renderFail();
    }
  };

  render() {
    return <div>{this.renderFinal()}</div>;
  }
}
export default Authors;
