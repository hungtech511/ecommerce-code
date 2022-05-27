import React, { useEffect, useState } from 'react';
import './Pagination.css';

function Pagination({ itemsPerPage, total, paginate, currentProducts }) {
    const [active, setActive] = useState(1);
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(total / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    const handleActive = (index) => {
        setActive(index);
    }

    // When you are in page 4 but search for something, it will return to page 1 & set active to 1
    useEffect(() => {
        if (currentProducts === undefined || currentProducts.length === 0) {
            setActive(1);
        }
    }, [currentProducts])

    const previousNumber = (active) => {
        if (active > 1) {
            setActive(active - 1);
            paginate(active - 1)
        }
    }
    const nextNumber = (active) => {
        if (active <= pageNumbers.length - 1) {
            setActive(active + 1);
            paginate(active + 1)
        }
    }
    return (
        <ul className="pagination">
            <li>
                <a onClick={() => previousNumber(active)} href="#!"><i className="fal fa-angle-left"></i></a>
            </li>
            {pageNumbers.map((number) => {
                return (
                    <li key={number}>
                        <a onClick={() => { paginate(number); handleActive(number) }} href="#!" className={active === number ? 'active' : null}>
                            {number}
                        </a>
                    </li>
                )
            })}
            <li>
                <a onClick={() => nextNumber(active)} href="#!"><i className="fal fa-angle-right"></i></a>
            </li>
        </ul>
    );
}

export default Pagination;