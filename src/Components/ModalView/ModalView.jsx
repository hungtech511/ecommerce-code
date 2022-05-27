import React, { useEffect, useState } from 'react';
import './ModalView.css'
import ProductDetailItem from '../ProductDetailItem/ProductDetailItem';
import { useDispatch } from 'react-redux'
import { closeModal } from '../Slice/ModalSlice'

function ModalView({ item, toggleModal }) {
    const dispatch = useDispatch()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 1500)
    }, [])

    const handleCloseModal = () => {
        let html = document.querySelector("html");
        const action = closeModal();
        dispatch(action)
        html.classList.remove('prevent-scroll')
    }


    return (
        <>
            <div onClick={() => handleCloseModal()} className="modal-background"></div>
            <div className={toggleModal ? "modal-product fade" : "modal-product"}>
                <div className="modal-dialog">
                    {item && <div className="modal-content">
                        <ProductDetailItem item={item} isLoading={isLoading}></ProductDetailItem>
                        <i onClick={() => handleCloseModal()} className="fa fa-times modal-icon"></i>
                    </div>
                    }
                </div>
            </div >
        </>
    );
}

export default ModalView;