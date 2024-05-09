import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Table,
  Container,
  Modal,
  Card,
  Row,
  Col,
} from "react-bootstrap";
import axios from "axios";

const Booking = () => {
  const [name, setName] = useState("");
  const [specialism, setSpecialism] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [bookings, setBookings] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialist, setSelectedSpecialist] = useState("");

  useEffect(() => {
    const fetchPokemon = async () => {
      let pokemonList = [];
      for (let i = 0; i < 6; i++) {
        const randomId = Math.floor(Math.random() * 800) + 1; // Pokemon API currently goes up to 898
        const res = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${randomId}`
        );
        pokemonList.push(res.data.name);
      }
      setSpecialists(pokemonList);
    };

    fetchPokemon();
  }, []);
  useEffect(() => {
    const GetBookings = async () => {
      try {
        const response = await axios.get("http://localhost:8085/booking/get");
        setBookings(response.data);
      } catch (error) {
        console.error("Error fetching bookings:", error);
      }
    };
    GetBookings();
  }, []);

  const handleSubmittwo = async (e) => {
    e.preventDefault();
    const newBooking = {
      name,
      specialism,
      specialists: selectedSpecialist,
      date,
      time,
    };

    try {
      await axios.post("http://localhost:8085/booking/create", newBooking);

      setBookings([...bookings, newBooking]);
      setCurrentBooking(newBooking);
      setShowModal(true);
      console.log("posted");
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };
  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleSpecialismChange = (e) => {
    setSpecialism(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newBooking = {
      name,
      specialism,
      date,
      time,
      specialists: selectedSpecialist,
    };
    setBookings([...bookings, newBooking]);
    setCurrentBooking(newBooking);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setName("");
    setSpecialism("");
    setSelectedSpecialist("");
    setDate("");
    setTime("");
    setCurrentBooking(null);
  };

  const handleDelete = (index) => {
    const updatedBookings = [...bookings];
    updatedBookings.splice(index, 1);
    setBookings(updatedBookings);
  };

  const getAvailableTimes = (date) => {
    const times = [
      "09:00",
      "10:00",
      "11:00",
      "12:00",
      "13:00",
      "14:00",
      "15:00",
      "16:00",
      "17:00",
    ];
    const bookedTimes = bookings
      .filter((booking) => booking.date === date)
      .map((booking) => booking.time);
    return times.filter((time) => !bookedTimes.includes(time));
  };
  const specialisms = [
    "Debt Management",
    "Mortgage Advice",
    "Pension Advice",
    "Investment Advice",
    "Tax Planning",
    "Retirement Planning",
    "Estate Planning",
    "Insurance Advice",
    "Savings Advice",
    "Other",
  ];

  return (
    <Container>
        <Row>
        <Col md={6} className="mx-auto">

        <Card className="login-card" style={{  fontFamily: 'crimsonpro', backgroundColor: 'rgba(255, 255, 255, 0.91)'}} >
        <h4
            className="mb-4 text-center"
          >
            Book an appoitment
          </h4>   
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Name:</Form.Label>
                <Form.Control
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                />
              </Form.Group>
              <Row>
                <Col md={6}>
                  <Form.Group controlId="specialism">
                    <Form.Label>Specialism:</Form.Label>
                    <Form.Control
                      as="select"
                      value={specialism}
                      onChange={(e) => setSpecialism(e.target.value)}
                    >
                      <option selected hidden value="">Select a specialism </option>
                      {specialisms.map((specialism) => (
                        <option key={specialism} value={specialism}>
                          {specialism}
                          {/* {isBooked} */}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col md={6}>
                  <Form.Group controlId="specialism">
                    <Form.Label>Specialists:</Form.Label>
                    <Form.Control
                      as="select"
                      value={selectedSpecialist}
                      onChange={(e) => setSelectedSpecialist(e.target.value)}
                    >
                      <option selected hidden value="">Select a specialist </option>
                      {specialists.map((specialist) => (
                        <option key={specialist} value={specialist}>
                          {specialist}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
              </Row>
              <Row>
              <Col md={6}>

              <Form.Group className="mb-3">
                <Form.Label>Date:</Form.Label>
                <Form.Control
                  type="date"
                  value={date}
                  onChange={handleDateChange}
                />
              </Form.Group>
              </Col>                <Col md={6}>

              <Form.Group className="mb-3">
                <Form.Label>Time:</Form.Label>
                <Form.Select value={time} onChange={handleTimeChange}>
                  <option selected hidden value="">Select a time</option>
                  {getAvailableTimes(date).map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              </Col>
              </Row>
              <Button style={{
                 backgroundColor: '#a87388', 
                 border: 'none',
                 color: 'white',
                 padding: '10px',
                 textAlign: 'center',
                 display: 'inline-block',
                 fontSize: '14px',
                 margin: '4px 2px',
                 borderRadius: '10px',
              }} onClick={handleSubmittwo} variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Card>
          </Col>

        </Row>
      {currentBooking && (
        <Modal
          style={{ color: "black" }}
          show={showModal}
          onHide={handleCloseModal}
        >
          <Modal.Header closeButton>
            <Modal.Title>Booking Confirmed</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Name: {currentBooking.name}</p>
            <p>Specialism: {currentBooking.specialism}</p>
            <p>Specialist: {currentBooking.specialists}</p>
            <p>Date: {currentBooking.date}</p>
            <p>Time: {currentBooking.time}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
      <br/>
        <Col md={6} className="mx-auto">
      <Table striped bordered hover style={{  fontFamily: 'crimsonpro',  }}>
        <thead             className="mb-4 text-center"
>
          <tr>
            <th>Name</th>
            <th>Specialism</th>
            <th>Specialist</th>
            <th>Date</th>
            <th>Time</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody             className="mb-4 text-center"
>
          {bookings.map((booking, index) => {
            const dateObj = new Date(booking.date);
            const formattedDate = `${dateObj
              .getDate()
              .toString()
              .padStart(2, "0")}/${(dateObj.getMonth() + 1)
              .toString()
              .padStart(2, "0")}/${dateObj.getFullYear()}`;
            return (
              <tr key={index}>
                <td>{booking.name}</td>
                <td>{booking.specialism}</td>
                <td>{booking.specialists}</td>
                <td>{formattedDate}</td>
                <td>{booking.time}</td>
                <td>
                  <Button style={{
                    backgroundColor: '#FF7171',
                  }} onClick={() => handleDelete(index)}>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
      </Col>
    </Container>
  );
};

export default Booking;
