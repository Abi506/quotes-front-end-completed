import { Link } from "react-router-dom";

import "./index.css";

const QuotesItem = (props) => {
  const { details } = props;

  return (
    <ul className="list-of_quotes">
      {details.map((each) => (
        <Link to={`/all-quotes/${each.id}`} className="nav-link" key={each.id}>
          <li className="each-quotes-items">
            <h1 className="all-quotes-quote">{each.quote}</h1>
          </li>
        </Link>
      ))}
    </ul>
  );
};
export default QuotesItem;
