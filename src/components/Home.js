import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { withAuth0 } from "@auth0/auth0-react";
import { Card, Button, Row } from "react-bootstrap";
class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      crypto: [],
    };
  }

  componentDidMount() {
    axios
      .get(`${process.env.REACT_APP_SERVER}/api`)
      .then((crypto) => {
        this.setState({
          crypto: crypto.data,
        });
      })
      .catch();
  }

  addFav = (index) => {
    const body = {
      title: this.state.crypto[index].title,
      toUSD: this.state.crypto[index].toUSD,
      image_url: this.state.crypto[index].image_url,
      description: this.state.crypto[index].description,
      email: this.props.auth0.user.email,
    };
    axios.post(`${process.env.REACT_APP_SERVER}/add`, body).then((res) => {});
  };

  render() {
    return (
      <>
        <Row xs={1} md={4} className="g-4">
          {this.state.crypto.map((crypto, idx) => {
            return (
              <Card key={idx} style={{ width: "18rem" }}>
                <Card.Img variant="top" src={crypto.image_url} />
                <Card.Body>
                  <Card.Title>{crypto.title}</Card.Title>
                  <Card.Text>{crypto.toUSD}</Card.Text>
                  <Card.Text>{crypto.description}</Card.Text>
                  <Button onClick={() => this.addFav(idx)} variant="primary">
                    Add to Watch list
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

export default withAuth0(Home);
