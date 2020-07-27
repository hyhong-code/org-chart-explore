import React, { useState, useEffect } from "react";
import { Modal, Form } from "react-bootstrap";
import { connect } from "react-redux";

import dispatchToast from "../../utils/toast";
import { updateNode } from "../../actions/orgChartActions";
import "./EditEmployeeModal.scss";

const EditEmployeeModal = ({ selectedNode, updateNode, ...otherProps }) => {
  const [formData, setFormData] = useState({ name: "", title: "", email: "" });
  const { name, title, email } = formData;

  useEffect(() => {
    setFormData({
      name: selectedNode ? selectedNode.name : "",
      title: selectedNode ? selectedNode.title : "",
      email: selectedNode ? selectedNode.email : "",
    });
  }, [selectedNode]);

  const handleChange = (evt) => {
    const { name, value } = evt.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (name && title && email) {
      updateNode(selectedNode.id, formData);
      otherProps.setEditModalShow(false);
    } else {
      dispatchToast("Missing fields!");
    }
  };

  return (
    <Modal
      {...otherProps}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="chart-control-modal"
    >
      <Modal.Header className="header" closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          EDIT EMPLOYEE
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Control
              className="modal-input"
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="modal-input"
              type="text"
              placeholder="Title"
              name="title"
              value={title}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              className="modal-input"
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <button className="close-btn" onClick={otherProps.onHide}>
          Back
        </button>
        <button className="confirm-btn" onClick={handleSubmit}>
          Confirm
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default connect(null, { updateNode })(EditEmployeeModal);
