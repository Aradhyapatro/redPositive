import React from 'react'
import axios from "axios"
import { LinkContainer } from 'react-router-bootstrap';
import { Table, Button, Row, Col } from 'react-bootstrap';
import { useEffect } from 'react';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";

const Main = () => {
    const [products, setProducts] = useState([])
    const navigate = useNavigate();

    let product = [
        {
            'id': 1,
            'name': "Aradhya",
            'phone': 70658734,
            'email': "temp@gmail.com",
            'hobbies': "Games asd .bkahdhgsadgiadghas gdhg asjhdg jashgdjhag sjdhg ajsdgh jashdg jhagsdj hgasjdg jasdgskdjdb ihdg ihsgdhgsjdhg ajsdhg jhasgd jhafsd jhgasjdjsadgh jhasgd jhasgd hasjd gajshdgj ashdgjhagsjd gjsdhg adhsg hdgs hh"
        }
    ]

    useEffect(() => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };

        const fetchData = async () => {
            const { data } = await axios.get('http://localhost:8000/api/', config);
            setProducts([...data])
        };
        fetchData();
    }, [products])

    const deleteHandler = (id) => {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        console.log(id);
        const fetchData = async () => {
            const { data } = await axios.delete(`http://localhost:8000/api/${id}`, config);
            setProducts([]);
        };
        fetchData();
    }

    const createHandler = (e) => {
        e.preventDefault();
        navigate('/Add')
    }

    const editHandler = (e) => {
        e.preventDefault();
        navigate('/edit');
    }

    return (
        <>
            <Row className='align-items-center'>
                <Col className='m-5 Text-Center'>
                </Col>
                <Col className='text-right mx-4'>
                    <Button style={{ marginLeft: 'auto', display: 'block', }} onClick={createHandler}>
                        <i className='fas fa-plus'></i> insert Data
                    </Button>
                </Col>
            </Row>
            <h1 className='Text-Center'>Table</h1>
            {
                <Table>
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Hobbies</th>
                            <th>Edit</th>
                            <th>delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map(product => (
                                <tr key={product.id}>
                                    <td>{product.id}</td>
                                    <td>{product.name}</td>
                                    <td>{product.phone}</td>
                                    <td>
                                        {product.email}
                                    </td>
                                    <td>{product.hobbies}</td>
                                    <td>
                                        <LinkContainer to={`/edit/${product.id}`}>
                                            <Button varient='light' className='btn-sm'>
                                                <FaEdit />
                                            </Button>
                                        </LinkContainer>

                                    </td>
                                    <td>
                                        <Button varient="danger" className="btn-sm padding" onClick={() => { deleteHandler(product.id) }}>
                                            <FaTrashAlt />
                                        </Button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            }
        </>
    )
}

export default Main