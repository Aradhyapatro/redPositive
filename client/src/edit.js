import axios from 'axios';
import React, { useEffect, useState } from "react";
import { Button, Form, Spinner, Row, Col } from "react-bootstrap";
import { Link, useNavigate, useParams, useSearchParams } from "react-router-dom";

const Edit = () => {
    const [name, setName] = useState("");
    const [phone, setPhone] = useState(0);
    const [email, setEmail] = useState("");
    const [hobbies, setHobbies] = useState("");

    const [searchParam, setSearchParam] = useSearchParams();

    const navigate = useNavigate();

    const { id } = useParams();



    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const fetchData = async () => {
            const { data } = await axios.get(`http://localhost:8000/api/${id}`, config);
            setName(data.name)
            setPhone(data.phone)
            setEmail(data.email)
            setHobbies(data.hobbies)
        };
        fetchData();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        e.preventDefault();
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const fetchData = async () => {
            const { data } = await axios.patch(`http://localhost:8000/${id}`, { id, name, email, phone, hobbies }, config);
            if (data) {
                navigate("/");
            }
        };
        fetchData();
    };


    return (
        <>
            <Link to={'/'} className='btn btn-light m-3'>Go Back</Link>
            <>
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
                        Update
                    </Button>
                </Form>
            </>
        </>

    );
};

export default Edit;