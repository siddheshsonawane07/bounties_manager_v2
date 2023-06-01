import React, { useEffect, useState } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import CardComponent from "../Card/CardComponent";
import "./Submission.css";
import NavbarComponent from "../Navbar/Navbar";

const SubmissionComponent = ({
  deadLine,
  reward,
  desc,
  _handleGithubLinkChange,
  _onSubmit,
  githubLink,
  BountyIndex,
}) => {
  console.log("index ", BountyIndex);
  const separator = "/";
  const paragraph = desc;
  const sentences = paragraph.split(separator);
  const _title = sentences[0].trim();
  const _description = sentences[1].trim();
  const _details = sentences[2].trim();
  return (
    <div className="form-Container-X">
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
          <Col>Github Link: </Col>
          <Col lg={10} md={5} xs={4}>
            <input
              onChange={_handleGithubLinkChange}
              className="w-100 input-Box"
            ></input>
          </Col>
          <br />
          <Col>
            <button
              onClick={() => _onSubmit(BountyIndex, githubLink)}
              className="btn-sub"
            >
              Submit
            </button>
          </Col>
        </Row>
      </Col>
    </div>
  );
};

const AllBountiesComponent = ({ contract, account }) => {
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
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    async function getNumBounties() {
      const numBounty = await contract.getNumBounties();
      SetnoOfBOunties(parseInt(numBounty));
      console.log("Available bounties : ", parseInt(numBounty));
      const newCards = [];
      for (let i = 0; i < parseInt(numBounty); i++) {
        // Get the bounty details
        const bounty = await contract.bountyList(i);
        const val = 1000000000000000000;
        // console.log(
        //   parseInt(bounty.reward) / val,
        //   bounty.deadline * 1000,
        //   bounty.description
        // );
        // console.log(cards);
        const newCard = {
          _index: i,
          _reward: parseInt(bounty.reward) / val,
          _deadLine: bounty.deadline * 1000,
          _desc: bounty.description,
          _owner: bounty.owner,
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

  const handleCardClick = (card) => {
    setDescription(card._desc);
    setReward(card._reward);
    setDeadLine(card._deadLine);
    setBountyIndex(card._index);
    setTitle(card._desc);
    setDetail(card._desc);
    setHomepage(false);

    // ... Do something ...
  };

  const handleCreateSubmission = async (BountyIndex, githubLink) => {
    // // e.preventDefault();
    // console.log(BountyIndex, githubLink);
    const createSubmit = await contract.bountySubmission(
      BountyIndex,
      githubLink
    );
    await createSubmit.wait();
    console.log("created submission : ", {
      "bounty index ": BountyIndex,
      "submission ": githubLink,
    });
  };

  const handleGithubLinkChange = (event) => {
    const updatedGithubLink = event.target.value;
    setGithubLink(updatedGithubLink);
  };

  return (
    <div>
      <NavbarComponent account={account} />
      {homepage ? (
        <>
          <h1 className="car-title">💰Available Bounties</h1>
          <Row xs={5} md={4} lg={3} className="g-4 cont-card cardExternal">
            {cards.map((card) => {
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
          BountyIndex={BountyIndex}
          githubLink={githubLink}
          _title={title} // Pass title as prop
          desc={description} // Pass description as prop
          reward={reward} // Pass reward as prop
          deadLine={deadLine} // Pass deadLine as prop
          _index={BountyIndex}
          _onSubmit={handleCreateSubmission}
          _setGithubLink={setGithubLink}
          _handleGithubLinkChange={handleGithubLinkChange}
          _detail={detail}
        />
      )}
    </div>
  );
};

export default AllBountiesComponent;
