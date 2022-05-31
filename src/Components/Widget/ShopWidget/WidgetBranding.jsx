import React, { useState, useEffect } from 'react';

import ecomApi from '../../../Api/ecomApi';
import { useDispatch } from 'react-redux';
import { brandingItem } from '../../Slice/BrandingSlice';
import { useSelector } from 'react-redux';

function WidgetBranding() {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const brandingData = useSelector((state) => state.branding.brandingData) || []


    useEffect(() => {
        const getProduct = async () => {
            const products = await ecomApi.getProducts();
            setItems(products.data)
        }
        getProduct();
    }, [])

    // Remove Duplicate Properties
    let arrayValue = []
    let getAllValueByProperties = Object.values(items.reduce((acc, cur) => Object.assign(acc, { [cur.branding]: cur }), {}));
    let newArray = getAllValueByProperties.filter(item => arrayValue.push(item.branding));

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
        let updatedList = [...brandingData];
        if (event.target.checked) {
            updatedList = [...brandingData, event.target.value];
        } else {
            updatedList.splice(brandingData.indexOf(event.target.value), 1);
        }
        const action = brandingItem(updatedList);
        dispatch(action)
    };


    return (
        <div className="widget">
            <h3 className="shop-title">Branding</h3>
            {newArray.length > 0 && newArray.map((item, index) => {
                return (
                    <div className="checkbox-widget" key={index}>
                        <input checked={brandingData.indexOf(item) >= 0} className="branding-radio" onChange={(e) => handleCheck(e)} type="checkbox" id={item} name="test" value={item} />
                        <label htmlFor={item}> {item}</label>
                    </div>
                )
            })}
        </div>
    );
}

export default WidgetBranding;