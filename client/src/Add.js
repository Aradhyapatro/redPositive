import axios from 'axios';
import React from 'react'
import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";

const Add = () => {

    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");
    const navigate = useNavigate();

    useEffect(() => {

    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const fetchData = async () => {
            const { data } = await axios.post('http://localhost:8000/api/post', { name, email, phone, hobbies }, config);
            if (data) {
                navigate("/");
            }
        };
        fetchData();
    };

    return (
        <>
            <Link to={'/'} className='btn btn-light m-3'>Go Back</Link>
            <FormContainer>
                <h1>Edit Data</h1>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId='name'>
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type='name'
                            placeholder='Enter name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='phone'>
                        <Form.Label>Phone</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter price'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Form.Group controlId='email'>
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter category'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        ></Form.Control>
                    </Form.Group>


                    <Form.Group id="Hobbies">
                        <Form.Label>Hobbies</Form.Label>
                        <Form.Control
                            type='text'
                            placeholder='Enter Brand'
                            value={hobbies}
                            onChange={(e) => setHobbies(e.target.value)}
                        ></Form.Control>
                    </Form.Group>

                    <Button type="submit" variant="primary">
                        Add
                    </Button>
                </Form >
            </FormContainer>
        </>

    );
}

export default Add