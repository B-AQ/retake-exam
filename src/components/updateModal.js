import React, { Component } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export class updateModal extends Component {
  render() {
    return (
      <Modal show={this.props.show} onHide={this.props.showingModal}>
        <Modal.Header>
          <Modal.Title>Update</Modal.Title>
        </Modal.Header>

        <Form onSubmit={(e) => this.props.updateFav(e)}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="title"
              name="Title"
              defaultValue={this.props.updateObject.Title}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="text"
              placeholder="image URL"
              name="image_url"
              efaultValue={this.props.updateObject.image_url}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>To USD</Form.Label>
            <Form.Control
              type="text"
              placeholder="USD"
              name="toUSD"
              efaultValue={this.props.updateObject.toUSD}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              placeholder="description"
              name="description"
              efaultValue={this.props.updateObject.description}
            />
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    );
  }
}

export default updateModal;
