import React, { useState, useEffect } from 'react';

import ecomApi from '../../../Api/ecomApi';
import { useDispatch } from 'react-redux';
import { sizeItem } from '../../Slice/SizeSlice';
import { useSelector } from 'react-redux';

function WidgetSize() {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const sizeData = useSelector((state) => state.size.sizeData) || []

    useEffect(() => {
        const getProduct = async () => {
            const products = await ecomApi.getProducts();
            setItems(products.data)
        }
        getProduct();
    }, [])

    // Remove Duplicate Properties with nested object
    let arrayValue = []
    let getAllValueByProperties = Object.values(items.reduce((acc, cur) => Object.assign(acc, { [cur.details.size]: cur }), {}));
    let newArray = getAllValueByProperties.filter(item => arrayValue.push(item.details.size));

    //// Convert 2D to 1D array if it has subarray inside
    function get1DArray(arr) {
        return arr.join().split(",");
    }
    //// Remove duplicate item in 1D array
    newArray = get1DArray(arrayValue).filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });
    newArray = newArray.sort((a, b) => a.localeCompare(b))


    // Get Value From Input Checkbox
    const handleCheck = (event) => {
        let updatedList = [...sizeData];
        if (event.target.checked) {
            updatedList = [...sizeData, event.target.value];
        } else {
            updatedList.splice(sizeData.indexOf(event.target.value), 1);
        }
        const action = sizeItem(updatedList);
        dispatch(action)
    };



    return (
        <div className="widget">
            <h3 className="shop-title">Product Size</h3>
            {newArray.length > 0 && newArray.map((item, index) => {
                return (
                    <div className="checkbox-widget" key={index}>
                        <input checked={sizeData.indexOf(item) >= 0} onChange={handleCheck} type="checkbox" id={item} name={item} value={item} />
                        <label htmlFor={item}> {item}</label>
                    </div>
                )
            })}
        </div>
    );
}

export default WidgetSize;