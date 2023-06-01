import { Card } from "react-bootstrap";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./CardComponent.css";

const CardComponent = ({
  _reward,
  _deadLine,
  _desc,
  _title,
  _owner,
  handleCardClick,
  _index,
}) => {
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [homepage, setHomepage] = useState(true);
  const [githubLink, setGithubLink] = useState("");
  const [noOfBOunties, SetnoOfBOunties] = useState("");
  const [reward, setReward] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [BountyIndex, setBountyIndex] = useState("");
  const [Submission, setSubmission] = useState("");
  const [SubmissionIndex, setSubmissionIndex] = useState("");
  const [cards, setCards] = useState([]);
  const [filteredCards, setFilteredCards] = useState([]);
  console.log(_index);
  return (
    <Card
      className="CardEx"
      onClick={() =>
        handleCardClick({ _reward, _deadLine, _desc, _owner, _index })
      }
    >
      <Card.Img
        variant="top"
        src="Blockchain-Tech-Web3-NFT-placeholder.jpg"
        className="CardImg"
      />
      <Card.Body>
        <Card.Title>{_title.split(" / ")[0]}</Card.Title>
        <Card.Text>{_desc.split(" / ")[1]}</Card.Text>
        <Card.Text>
          <b>Reward:</b>
          {_reward}
        </Card.Text>
        <Card.Text>
          <b>Deadline:</b>
          {_deadLine}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default CardComponent;
