import { useState } from "react";
import { Container, Row, Col, Card, Form, Button, Dropdown } from "react-bootstrap";
const Feedback: React.FC = () => {

    const [formData, setFormData] = useState({
        studentName: "",
        course: "",
        rating: "",
        comments: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSelect = (eventKey: string | null) => {
        if (eventKey) {
            setFormData({ ...formData, course: eventKey });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!formData.studentName || !formData.course || !formData.rating || !formData.comments) {
            alert("Ensure all fields are filled");
            return;
        }

        try {
            const res = await fetch("http://localhost:5000/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    studentName: formData.studentName,
                    course: formData.course,
                    rating: parseInt(formData.rating),
                    comments: formData.comments,
                }),
            });
            const data = await res.json();
            alert(data.message);

            setFormData({
                studentName: "",
                course: "",
                rating: "",
                comments: "",
            });

        } catch (error) {
            console.error(error);
            alert("Failed to submit feedback");
        }
    };

    return (
        <Container
            fluid
            className="d-flex align-items-center justify-content-center p-3"
            style={{ backgroundColor: "#c7dbf5dc" }} >
            <Row className="w-100 justify-content-center">
                <Col md={8} lg={5}>
                    <Card className="shadow border-0 rounded-4">
                        <Card.Body className="p-5">
                            <h2 className="fw-bold mb-4 text-center">Course Feedback</h2>

                            <Form onSubmit={handleSubmit}>

                                {/* Student Name */}
                                <Form.Group className="mb-4" controlId="studentName">
                                    <Form.Label className="fw-bold">Student Name</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="studentName"
                                        placeholder="Enter your name"
                                        value={formData.studentName}
                                        onChange={handleChange}
                                    />
                                </Form.Group>

                                {/* Course */}
                                <Form.Group className="mb-4" controlId="course">
                                    <Form.Label className="fw-bold" >Course</Form.Label>

                                    <Dropdown onSelect={handleSelect} >
                                        <Dropdown.Toggle 
                                            className="w-100 text-start py-2 px-3"
                                        >
                                            {formData.course || "Select Course"}
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu className="w-100" >
                                            <Dropdown.Item eventKey="BS in Information Technology">
                                                BS in Information Technology
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="BS in Computer Science">
                                                BS in Computer Science
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="BS in Computer Engineering">
                                                BS in Computer Engineering
                                            </Dropdown.Item>
                                            <Dropdown.Item eventKey="BS in Information System">
                                                BS in Information System
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Form.Group>

                                {/* Rating */}
                                <Form.Group className="mb-4" controlId="rating">
                                    <Form.Label className="fw-bold">Rate the Course</Form.Label>

                                    {[5, 4, 3, 2, 1].map((num) => {
                                        const labels: any = {
                                            5: "Excellent",
                                            4: "Very Good",
                                            3: "Good",
                                            2: "Fair",
                                            1: "Poor"
                                        };

                                        return (
                                            <Form.Check
                                                key={num}
                                                type="radio"
                                                name="rating"
                                                id={`rating-${num}`}
                                                value={num.toString()}
                                                label={`${num} - ${labels[num]}`}
                                                checked={formData.rating === num.toString()}
                                                onChange={handleChange}
                                            />
                                        );
                                    })}
                                </Form.Group>

                                {/* Comments */}
                                <Form.Group className="mb-4" controlId="comments">
                                    <Form.Label className="fw-bold">Comments</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="comments"
                                        value={formData.comments}
                                        onChange={handleChange}
                                        placeholder="Share your thoughts..."
                                    />
                                </Form.Group>

                                <Button variant="primary" type="submit" className="w-100 py-2">
                                    Submit Feedback 
                                </Button>

                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
}

export default Feedback