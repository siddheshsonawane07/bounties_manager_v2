import React from "react";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { ethers } from "ethers";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";
import NavbarComponent from "../Navbar/Navbar";
import "./CreateBounty.css";

const CreateBountyComponent = ({ contract, account }) => {
  const [desc, setDesc] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [detail, setDetail] = useState("");
  const [reward, setReward] = useState("");
  const [deadLine, setDeadLine] = useState("");
  const [BountyIndex, setBountyIndex] = useState("");

  const handlesetTitle = (e) => {
    setTitle(e.target.value);
  };

  const handlesetDescription = (e) => {
    setDescription(e.target.value);
  };
  const handlesetDetail = (e) => {
    setDetail(e.target.value);
  };
  const handleDeadChange = (e) => {
    const deadlineInput = e.target.value;
    // Convert date and time to epoch time
    const epochTime = new Date(deadlineInput).getTime() / 1000;
    setDeadLine(epochTime);
  };
  const handleRewardChange = (e) => {
    setReward(e.target.value);
  };

  useEffect(() => {
    const str = title + " / " + description + " / " + detail;
    setDesc(str);
  }, [title, detail, description]);

  //button function to create Bounty
  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    const rewardWei = ethers.utils.parseUnits(reward, "ether");
    console.log(desc);
    const createSubmit = await contract.createBounty(
      desc,
      rewardWei,
      deadLine,
      { value: rewardWei }
    );
    await createSubmit.wait();
    alert("Bounty Created");
    setTitle("");
    setDeadLine("");
    setDescription("");
    setReward("");
  };

  return (
    <>
      <NavbarComponent account={account} />
      <Row>
        <Form onSubmit={handleCreateSubmit} className="form-Container-Y">
          <h2>Create Bounty </h2>
          <Form.Group className="cont-form">
            <Form.Control
              className="form-boxex"
              type="input"
              onChange={handlesetTitle}
              placeholder="Enter Title"
            />
          </Form.Group>
          <Form.Group className="cont-form">
            <Form.Control
              className="form-boxex"
              type="input"
              onChange={handlesetDescription}
              placeholder="Enter Description"
            />
          </Form.Group>
          <Form.Group className="cont-form">
            <Form.Control
              className="form-boxex"
              type="input"
              onChange={handlesetDetail}
              placeholder="Enter Details"
            />
          </Form.Group>
          <Form.Group value="reward" className="cont-form">
            <Form.Control
              className="form-boxex"
              type="text"
              onChange={handleRewardChange}
              placeholder="Enter Reward"
            />
          </Form.Group>
          <Form.Group value="deadline" className="cont-form">
            <Form.Control
              className="form-boxex"
              type="datetime-local"
              onChange={handleDeadChange}
              placeholder="Enter Deadline"
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="btn-sub">
            Submit
          </Button>
        </Form>
      </Row>
    </>
  );
};

export default CreateBountyComponent;
