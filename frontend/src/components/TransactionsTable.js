import React, { useEffect, useState } from "react";
import { Table, Button, Dropdown, DropdownButton, Modal, Form, Container } from "react-bootstrap";
import axios from "axios";
import { getTransactions, deleteTransactions, addTransaction } from "../utils/ApiRequest";

const TransactionsTable = () => {
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [filterTimeFrame, setFilterTimeFrame] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [newTransaction, setNewTransaction] = useState({
    amount: "",
    type: "income",
    category: "",
    description: "",
    date: "",
    paymentMethod: ""
  });

  useEffect(() => {
    fetchTransactions();
  }, []);

  const fetchTransactions = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) return;
      const { data } = await axios.get(getTransactions, { params: { userId: user._id } });
      setTransactions(Array.isArray(data) ? data : []);
      setFilteredTransactions(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error fetching transactions:", error.response?.data || error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${deleteTransactions}/${id}`);
      setTransactions((prev) => prev.filter((txn) => txn._id !== id));
      setFilteredTransactions((prev) => prev.filter((txn) => txn._id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
    }
  };

  const filterByTimeFrame = (timeFrame) => {
    const now = new Date();
    let startDate;
    if (timeFrame === "week") {
      startDate = new Date();
      startDate.setDate(now.getDate() - 7);
    } else if (timeFrame === "month") {
      startDate = new Date();
      startDate.setMonth(now.getMonth() - 1);
    } else if (timeFrame === "year") {
      startDate = new Date();
      startDate.setFullYear(now.getFullYear() - 1);
    } else {
      setFilteredTransactions(transactions);
      setFilterTimeFrame(null);
      return;
    }
    setFilteredTransactions(transactions.filter((txn) => txn.date && new Date(txn.date) >= startDate));
    setFilterTimeFrame(timeFrame);
  };

  const handleAddTransaction = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) return;
      const transactionData = { ...newTransaction, userId: user._id };
      const response = await axios.post(addTransaction, transactionData);
      setTransactions((prev) => [...prev, response.data]);
      setFilteredTransactions((prev) => [...prev, response.data]);
      setShowModal(false);
      setNewTransaction({
        amount: "",
        type: "income",
        category: "",
        description: "",
        date: "",
        paymentMethod: ""
      });
    } catch (error) {
      console.error("Error adding transaction:", error.response?.data || error);
    }
  };

  return (
    <Container>
      <h3 className="mb-3">Transaction History</h3>
      <div className="d-flex gap-2 mb-3">
        <Button variant="success" onClick={() => setShowModal(true)}>Add Transaction</Button>
        <DropdownButton id="filter-timeframe" title="Filter by Timeframe">
          <Dropdown.Item onClick={() => filterByTimeFrame("week")}>Last Week</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByTimeFrame("month")}>Last Month</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByTimeFrame("year")}>Last Year</Dropdown.Item>
          <Dropdown.Item onClick={() => filterByTimeFrame(null)}>Reset Time Filter</Dropdown.Item>
        </DropdownButton>
      </div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Category</th>
            <th>Description</th>
            <th>Date</th>
            <th>Payment Method</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTransactions.length > 0 ? (
            filteredTransactions.map((txn, index) => (
              <tr key={txn._id || index}>
                <td>{index + 1}</td>
                <td>${txn.amount}</td>
                <td>{txn.type}</td>
                <td>{txn.category}</td>
                <td>{txn.description}</td>
                <td>{txn.date ? new Date(txn.date).toLocaleDateString() : "N/A"}</td>
                <td>{txn.paymentMethod}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(txn._id)}>Delete</Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </Table>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add Transaction</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {Object.keys(newTransaction).map((key) => (
              <Form.Group className="mb-3" key={key}>
                <Form.Label>{key.charAt(0).toUpperCase() + key.slice(1)}</Form.Label>
                <Form.Control
                  type={key === "amount" ? "number" : key === "date" ? "date" : "text"}
                  value={newTransaction[key]}
                  onChange={(e) => setNewTransaction({ ...newTransaction, [key]: e.target.value })}
                />
              </Form.Group>
            ))}
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleAddTransaction}>Add Transaction</Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default TransactionsTable;
