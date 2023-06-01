import React, { Component } from "react";
import ReactDOM from "react-dom";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

class DemoCarousel extends Component {
  render() {
    return (
      <Carousel autoPlay={true}>
        <div>
          <img src="Blockchain-Tech-Web3-NFT-placeholder.jpg" />
        </div>
        <div>
          <img src="Blockchain-Tech-Web3-NFT-placeholder.jpg" />
        </div>
        <div>
          <img src="Blockchain-Tech-Web3-NFT-placeholder.jpg" />
        </div>
      </Carousel>
    );
  }
}

export default DemoCarousel;
