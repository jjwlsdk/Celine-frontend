import React from "react";
import ShoppingMethod from "./ShoppingMethod";
import Service from "./Service";
import Payment from "./Payment";
import "./CheckOut.scss";

class CheckOut extends React.Component {
  constructor() {
    super();
    this.state = {
      btnClick: "Payment",
      shoppingMethod: {
        firstName: "",
        lastName: "",
        company: "",
        streetName: "",
        aptFloor: "",
        city: "",
        contryCode: "+82",
        title: "MRS.",
        contactPhone: "",
        zip: "",
      },
      service: {},
      payment: {
        nameOfCard: "",
        cardNumber: "",
        expDate: "",
        securityCode: "",
      },
    };
  }

  visibleHandler = (e) => {
    this.setState({
      btnClick: e.target.name,
    });
  };

  shoppingMethodHandler = (e) => {
    this.setState({
      shoppingMethod: {
        ...this.state.shoppingMethod,
        [e.target.name]: e.target.value,
      },
    });
  };

  paymentHandler = (e) => {
    this.setState({
      payment: {
        ...this.state.payment,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {
    const { btnClick, service, payment, shoppingMethod } = this.state;
    return (
      <div className="CheckOut">
        <div className="largeTab">
          <div className="nameTab">1 EMAIL</div>
          <div className="mainTab">TEAGYU1058@GMAIL.COM</div>
        </div>
        <div className="largeTab">
          <div className="nameTab">2 SHOPPING METHOD</div>
          <div className="mainTab">
            <div
              className={
                btnClick !== "ShoppingMethod" ? "editDate" : "editDateNone"
              }
            >
              SHIP TO ADDRESS
              <button name="ShoppingMethod" onClick={this.visibleHandler}>
                EDIT
              </button>
            </div>
            <ShoppingMethod
              btnClick={btnClick}
              shoppingMethod={shoppingMethod}
              visibleHandler={(btnClick) => this.visibleHandler(btnClick)}
              shoppingMethodHandler={(e) => this.shoppingMethodHandler(e)}
            />
          </div>
        </div>
        <div className="largeTab">
          <div className="nameTab">3 SERVICE</div>
          <div className="mainTab">
            <div
              className={
                btnClick !== "Service" && btnClick !== "ShoppingMethod"
                  ? "editDate"
                  : "editDateNone"
              }
            >
              SHIP TO ADDRESS
              <button name="Service" onClick={this.visibleHandler}>
                EDIT
              </button>
            </div>
            <Service
              service={service}
              btnClick={btnClick}
              visibleHandler={(btnClick) => this.visibleHandler(btnClick)}
            />
          </div>
        </div>
        <div className="largeTab">
          <div className="nameTab">4 PAYMENT</div>
          <div className="mainTab">
            <Payment
              payment={payment}
              btnClick={btnClick}
              paymentHandler={(e) => this.paymentHandler(e)}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CheckOut;
