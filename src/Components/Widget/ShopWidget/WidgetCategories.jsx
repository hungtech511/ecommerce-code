import React, { useState, useEffect } from 'react';

import ecomApi from '../../../Api/ecomApi';
import { useDispatch } from 'react-redux';
import { categoriesItem } from '../../Slice/CategoriesSlice';
import { useSelector } from 'react-redux';

function WidgetCategories() {
    const dispatch = useDispatch();
    const [items, setItems] = useState([]);
    const categoriesData = useSelector((state) => state.categories.categoriesData) || []

    useEffect(() => {
        const getProduct = async () => {
            const products = await ecomApi.getProducts();
            setItems(products.data)
        }
        getProduct();
    }, [])

    // Remove Duplicate Properties
    let arrayValue = []
    let getAllValueByProperties = Object.values(items.reduce((acc, cur) => Object.assign(acc, { [cur.category]: cur }), {}));
    let newArray = getAllValueByProperties.filter(item => arrayValue.push(item.category));

    //// Convert 2D to 1D array if it has subarray inside
    function get1DArray(arr) {
        return arr.join().split(",");
    }
    //// Remove duplicate item in 1D array
    newArray = get1DArray(arrayValue).filter(function (elem, index, self) {
        return index === self.indexOf(elem);
    });
    //// Sort array by alphabet
    newArray = newArray.sort((a, b) => a.localeCompare(b))

    // Get Value From Input Checkbox
    const handleCheck = (event) => {
        let updatedList = [...categoriesData];
        if (event.target.checked) {
            updatedList = [...categoriesData, event.target.value];
        } else {
            updatedList.splice(categoriesData.indexOf(event.target.value), 1);
        }
        const action = categoriesItem(updatedList);
        dispatch(action)
    };

    return (
        <div className="widget">
            <h3 className="shop-title">Categories</h3>
            {newArray.length > 0 && newArray.map((item, index) => {
                return (
                    <div className="checkbox-widget" key={index}>
                        <input checked={categoriesData.indexOf(item) >= 0} onChange={handleCheck} type="checkbox" id={item} name={item} value={item} />
                        <label htmlFor={item}> {item}</label>
                    </div>
                )
            })}
        </div>
    );
}

export default WidgetCategories;