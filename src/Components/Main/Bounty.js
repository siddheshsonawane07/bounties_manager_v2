 import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "./Bounty.css";
import CardComponent from "../Card/CardComponent";
import NavbarComponent from "../Navbar/Navbar";
import "./Submission.css";
import DemoCarousel from "../Carousel";

const Bounties = ({ contract, account }) => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

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
  const [SubmissionList, setSubmissionList] = useState("");

  useEffect(() => {
    async function getNumBounties() {
      const numBounty = await contract.getNumBounties();
      SetnoOfBOunties(parseInt(numBounty));
      // console.log("Available bounties : ", parseInt(numBounty));
      const newCards = [];
      for (let i = 0; i < parseInt(numBounty); i++) {
        // Get the bounty detailss
        const bounty = await contract.bountyList(i);
        const val = 1000000000000000000;
        // console.log(
        //   parseInt(bounty.reward) / val,
        //   bounty.deadline * 1000,
        //   bounty.description
        // );
        // console.log(cards);
        const newCard = {
          _reward: parseInt(bounty.reward) / val,
          _deadLine: bounty.deadline * 1000,
          _desc: bounty.description,
          _owner: bounty.owner,
          _submissionList: bounty.SubmissionLists,
        };
        newCards.push(newCard);
      }
      setCards([...cards, ...newCards]);
    }
    getNumBounties();
  }, [noOfBOunties]);

  useEffect(() => {
    const str = title + " / " + description + " / " + detail;
    setDesc(str);
  }, [title, detail, description]);

  useEffect(() => {
    async function getNumBounties() {
      const numBounty = await contract.getNumBounties();
      SetnoOfBOunties(parseInt(numBounty));
    }
    getNumBounties();
  });

  useEffect(() => {
    const filtered = cards.filter((card) => card._owner === account);
    setFilteredCards(filtered);
  }, [cards]);

  const handleGithubLinkChange = (event) => {
    setGithubLink(event.target.value);
  };

  const handleBountyIndex = (e) => {
    setBountyIndex(e.target.value);
  };
  const handleSubmission = (e) => {
    setSubmission(e.target.value);
  };

  const handleCreateSubmission = async (e) => {
    e.preventDefault();
    const createSubmit = await contract.bountySubmission(
      BountyIndex,
      githubLink
    );
    await createSubmit.wait();
    console.log("created submission : ", {
      "bounty index ": BountyIndex,
      "submission ": Submission,
    });
  };

  const handleCardClick = (card) => {
    setDescription(card._desc);
    setReward(card._reward);
    setDeadLine(card._deadLine);
    setBountyIndex(card._index);
    setTitle(card._desc);
    setDetail(card._desc);
    setHomepage(false);
  };

  const handleSelectWinner = async (e) => {
    e.preventDefault();
    const createSubmit = await contract.selectBountyWinner(BountyIndex, [
      SubmissionIndex,
    ]);
    await createSubmit.wait();
    console.log(
      "winner selected for bounty ",
      BountyIndex,
      " is ",
      SubmissionIndex
    );
  };

  const SubmissionComponent = () => {
    const separator = "/";
    const paragraph = desc;
    const sentences = paragraph.split(separator);
    const _title = sentences[0].trim();
    const _description = sentences[1].trim();
    const _details = sentences[2].trim();
    return (
      <div className="form-Container">
        <Col className="submission-container containerTemplate">
          <Row>
            <h4>Title</h4>
            <p className="w-50 justify-items-start">{_title}</p>
          </Row>
          <Row>
            <h4 className="content">Description</h4>
            <p className="w-70 justify-items-start">{_description}</p>
          </Row>
          <Row>
            <h4 className="content">Details</h4>
            <p className="w-85 justify-items-start">{_details}</p>
          </Row>
          <Row>
            <Col>
              <h5>Reward : </h5>
            </Col>
            <Col lg={10} md={5} xs={4}>
              <p>{reward}</p>
            </Col>
          </Row>
          <Row>
            <Col>
              <h5>Deadline : </h5>
            </Col>
            <Col lg={10} md={5} xs={4}>
              <p>{deadLine}</p>
            </Col>
          </Row>
          <Row>
            {/* <Col>Github Link: </Col>
            <Col lg={10} md={5} xs={4}>
              <input className="w-100 input-Box"></input>
            </Col> */}
          </Row>

          <Row>
            <Col>
              <DemoCarousel></DemoCarousel>
            </Col>
          </Row>
        </Col>
      </div>
    );
  };

  return (
    <div>
      <NavbarComponent account={account} />
      {homepage ? (
        <>
          <h1 className="car-title">💰Your Bounties</h1>
          <Row xs={1} md={2} lg={3} className="g-3 cont-card">
            {filteredCards.map((card) => {
              return (
                <Col className="card-column">
                  <CardComponent
                    key={card._desc}
                    _reward={card._reward}
                    _deadLine={card._deadLine}
                    _desc={card._desc}
                    _owner={card._owner}
                    _title={card._desc}
                    _index={card._index}
                    handleCardClick={handleCardClick}
                  ></CardComponent>
                </Col>
              );
            })}
          </Row>
        </>
      ) : (
        <SubmissionComponent
          _title={title} // Pass title as prop
          _description={description} // Pass description as prop
          _reward={reward} // Pass reward as prop
          _deadLine={deadLine} // Pass deadLine as prop
          _index={BountyIndex}
          _onSubmit={handleCreateSubmission}
          _githubLink={githubLink}
          _setGithubLink={setGithubLink}
          _handleGithubLinkChange={handleGithubLinkChange}
          _detail={detail}
        />
      )}

      {/* <br />
      <h2>create Submission : </h2>
      <Row>
        <Form onSubmit={handleCreateSubmission}>
          <Form.Group className="mb-3" value="bountyindx">
            <Form.Control
              type="input"
              onChange={handleBountyIndex}
              placeholder="Enter bounty index"
            />
          </Form.Group>
          <Form.Group className="mb-3" value="submission">
            <Form.Control
              type="input"
              onChange={handleSubmission}
              placeholder="Enter github link"
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Row>
      <br />
      <p>Select bounty winner : </p>
      <Row></Row> */}
    </div>
  );
};

export default Bounties;
