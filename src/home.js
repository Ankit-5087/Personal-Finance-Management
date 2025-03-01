import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () => {
  // Dummy data for dashboard table
  const transactions = [
    { id: 1, date: '2025-02-23', description: 'Grocery', amount: '-$50' },
    { id: 2, date: '2025-02-22', description: 'Salary', amount: '+$5000' },
    { id: 3, date: '2025-02-21', description: 'Electricity Bill', amount: '-$100' },
  ];

  const Dashboard = () => (
    <div className="container mt-5">
      <h2 className="mb-4">Dashboard</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id}>
              <td>{txn.date}</td>
              <td>{txn.description}</td>
              <td>{txn.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button onClick={() => window.location.href = '/login'} className="mt-3">Logout</Button>
    </div>
  );

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Dashboard />
    </div>
  );
};

export default Home;
