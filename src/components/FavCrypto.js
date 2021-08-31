import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button, Row } from "react-bootstrap";
import updateModal from "./updateModal";

class FavCrypto extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      favCrypto: [],
      updateObject: {},
      showUpdateModal: false,
    };
  }

  showingModal = (element) => {
    this.state({
      updateObject: element,
      showUpdateModal: true,
    });
  };

  componentDidMount() {
    axios
      .get(
        `${process.env.REACT_APP_SERVER}/fav?email=${this.props.auth0.user.email}`
      )
      .then((crypto) => {
        this.setState({
          favCrypto: crypto.data,
        });
      })
      .catch();
  }

  deleteFav = (id) => {
    axios
      .delete(`${process.env.REACT_APP_SERVER}/delete/${id}`)
      .then((results) => {
        this.setState({
          favCrypto: results.data,
        });
      });
  };

  updateFav = (event) => {
    const cryptoId = this.state.updateObject._id;
    const body = {
      title: event.target.title.value,
      toUSD: event.target.toUSD.value,
      image_url: event.target.image_url.value,
      description: event.target.description.value,
    };
    axios
      .put(`${process.env.REACT_APP_SERVER}/update/${cryptoId}`, body)
      .then((update) => {
        const newArray = this.state.favCrypto.map((crypto) => {
          if (crypto === cryptoId) {
            crypto.title = update.data.title;
            crypto.toUSD = update.data.toUSD;
            crypto.image_url = update.data.image_url;
            crypto.description = update.data.description;
            return crypto;
          }
          return crypto;
        });
      });
    this.setState({
      favCrypto: newArray,
      showUpdateModal: false,
      updateObject: {},
    });
  };



  render() {
    return (
      <>
        {this.showingModal && (
          <updateModal
            show={this.state.showUpdateModal}
            showingModal={this.showingModal}
            updateFav={this.updateFav}
            updateObject={this.state.updateObject}
          />
        )}

        <Row xs={1} md={4} className="g-4">
          {this.state.favCrypto.map((crypto, idx) => {
            return (
              <Card key={idx} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={crypto.image_url} />
                <Card.Body>
                  <Card.Title>{crypto.title}</Card.Title>
                  <Card.Text>{crypto.toUSD}</Card.Text>
                  <Card.Text>{crypto.description}</Card.Text>
                  <Button
                    onClick={() => this.deleteFav(crypto._id)}
                    variant="danger"
                  >
                    Delete
                  </Button>
                  <Button
                    onClick={() => this.showingModal(crypto)}
                    variant="primary"
                  >
                    Update
                  </Button>
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </>
    );
  }
}

export default withAuth0(FavCrypto);
