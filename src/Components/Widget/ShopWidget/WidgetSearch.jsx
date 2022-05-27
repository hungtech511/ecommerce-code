import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { searchItem } from '../../Slice/SearchSlice';

function WidgetSearch(props) {
    const dispatch = useDispatch();
    const search = useSelector((state) => state.search.searchData);
    const { register, handleSubmit } = useForm();


    const onSubmit = data => {
        const action = searchItem(data.searchData);
        dispatch(action)
    };
    return (
        <div className="search-widget widget">
            <h3 className="shop-title">Search by</h3>
            <form onSubmit={handleSubmit(onSubmit)} className="shop-search">
                <input defaultValue={search} placeholder="Your keyword..." type="text" {...register("searchData")} />
                <button type="submit"><i className="fa fa-search"></i></button></form>
        </div>
    );
}

export default WidgetSearch;