import React, { Component } from "react";
import { Link } from "react-router-dom";
import ShopDetailsData from "./ShopDetailsData";
import Option from "./Option";
import TempText from "./TempText";
import config from "../../config";
import "./ShopDetails.scss";

export default class ShopDetails extends Component {
  constructor() {
    super();
    this.state = {
      detailData: {},
      imgClicked: "",
      zoomed: false,
      sidePanel: false,
      isSelectActive: false,
    };
  }

  componentDidMount() {
    fetch(`${config.API}/product?q=${this.props.match.params.id}`)
      .then((res) => res.json())
      .then((res) => this.setState({ detailData: res }));
  }

  showOriginal = (index) => {
    this.setState({ imgClicked: index });
  };

  zoomToggle = () => {
    this.setState({ zoomed: !this.state.zoomed });
  };

  funcSidePanel = () => {
    this.setState({ sidePanel: !this.state.sidePanel });
  };

  addToWishList = () => {
    fetch(`${config.addToWishList}/user/wishadd`, {
      method: "POST",
      body: JSON.stringify({
        product_id: ShopDetailsData.id,
      }),
      headers: {
        Authorization: config.token,
      },
    })
      .then((res) => res.json())
      .then((res) => console.log(res));
  };

  render() {
    const { detailData, imgClicked, zoomed, sidePanel } = this.state;
    const { showOriginal, zoomToggle, funcSidePanel } = this;

    return (
      <div className="ShopDetails">
        <div className="detailWrapper">
          <div className="returnToListing">
            <Link to="/">return to listing</Link>
          </div>
          <div className="detailContainer">
            <div
              className={sidePanel ? "sidePanel" : "hiddenPanel"}
              onClick={funcSidePanel}
            >
              <TempText />
            </div>
            <div className="detailedPictures">
              <ul>
                {detailData.img &&
                  detailData.img.map((picture, idx) => (
                    <li
                      key={idx}
                      className={
                        detailData.img.length % 2 ? "oddList" : "evenList"
                      }
                    >
                      <img
                        alt={`details ${idx + 1}`}
                        src={picture}
                        className={
                          imgClicked === idx && zoomed ? "clickedImg" : ""
                        }
                        onClick={() => {
                          showOriginal(idx);
                          zoomToggle();
                        }}
                      />
                    </li>
                  ))}
              </ul>
            </div>
            <div className="itemDescriptions">
              <h1>{detailData.name}</h1>
              <h1>{detailData.price} GBP</h1>
              <p>
                {detailData.description &&
                  detailData.description
                    .split("\n")
                    .map((p) => <div key={p}>{p}</div>)}
              </p>
              <div className="productDetails" onClick={funcSidePanel}>
                + product details
              </div>
              <div className="optionWrapper">
                <div className="option">
                  <div className="optionLabel">
                    <div className="option"></div>
                    <Option
                      title="colors"
                      optionName="color_names"
                      options="color_imgs"
                    />
                    <Option title="sizes" optionName="sizes" />
                  </div>
                  <div className="buttons">
                    <div onClick={funcSidePanel}>
                      RETURNS AND EXCHANGES (WITHIN 14 DAYS)
                    </div>
                    <div onClick={funcSidePanel}>
                      DELIVERY (2-5 BUSINESS DAYS)
                    </div>
                    <div>find in store</div>
                    <div className="contactUs">contact us</div>
                    <div className="addToWishlist" onClick={this.addToWishList}>
                      add to wishlist
                    </div>
                    <div className="saved">saved</div>
                    <div className="share">share</div>
                  </div>
                </div>
                <button onClick={this.addToWishList}>add to bag</button>
              </div>
            </div>
          </div>
          <div className="recentlyViewed">
            <h2>recently viewed</h2>
            <ul>
              {Object.keys(ShopDetailsData["recentlyViewed"]).map(
                (item, idx) => (
                  <li key={idx}>
                    <img
                      src={ShopDetailsData["recentlyViewed"][item]}
                      alt={item}
                    />
                  </li>
                )
              )}
            </ul>
          </div>
          <nav className="itemDirectory">
            <ul>
              <li>
                <Link to="/">Celine</Link>
              </li>
              {ShopDetailsData.directory.map((el) => (
                <li key={el}>
                  <Link to="/">{el}</Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
