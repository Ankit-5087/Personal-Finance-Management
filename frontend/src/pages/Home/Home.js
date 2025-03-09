import React, { useEffect, useState } from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import TransactionsTable from '../../components/TransactionsTable';

const Home = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log("Retrieved User:", user);  // ✅ Debug log
    if (!user || !user._id) {
      navigate('/login');
    } else {
      setUserId(user._id); // ✅ Ensure userId is being set
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Container className="mt-5">
      <h2>Welcome to Dashboard</h2>
      <Button variant="danger" onClick={handleLogout}>Logout</Button>
      {userId && <TransactionsTable userId={userId} />}  {/* ✅ Pass userId correctly */}
    </Container>
  );
};

export default Home;
