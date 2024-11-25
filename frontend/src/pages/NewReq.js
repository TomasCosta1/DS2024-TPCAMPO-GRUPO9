import React from 'react';
import ReqForm from '../components/ReqForm';
import Header from '../components/Header';
import { useContext, useEffect } from 'react';
import { UserContext } from '../context/UserContext';

const NewReq = () => {
    const { verify } = useContext(UserContext);
    verify();
    return (
        <>
        <Header />
        <ReqForm />
        </>
    )
}

export default NewReq;