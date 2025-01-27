import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyTable from './PropertyTable';

const initialPropertyCount = 2;

export default function PropertyComparisonTool() {

    const maxCount = 5;
    const minCount = 2;

    const [propertyCount, setPropertyCount] = useState(initialPropertyCount);

    const [propertyArray, setPropertyArray] = useState(new Array(initialPropertyCount).fill({}));

    const receiveMessageFromIframe = (event) => {
        const data = event.data;
        if (data?.messageType === "KeenformState") {
            let propertyData = data.formAttributeValues;
            const updatedData = propertyArray.map((obj, i) => {
                if (i+1 === propertyData.index) {
                    return propertyData;
                } else {
                    return obj;
                }
            });
            setPropertyArray(updatedData);
        }
    };

    const increment = () => {
        const newVal = propertyCount + 1;
        if (newVal <= maxCount) {
            setPropertyCount(newVal);
            updatePropertyArray(newVal);
        }
    }

    const decrement = () => {
        const newVal = propertyCount - 1;
        if (newVal >= minCount) {
            setPropertyCount(newVal);
            updatePropertyArray(newVal);
        }
    }

    const updatePropertyCount = (event) => {
        const newPropertyCountVal = event.target.value || 2;
        if (newPropertyCountVal < 2 || newPropertyCountVal > 5) {
            console.warn('entering an invalid number for property count');
        } else {
            setPropertyCount(newPropertyCountVal);
            updatePropertyArray(newPropertyCountVal);
        }
    }

    const updatePropertyArray = (quantity) => {
        if (quantity > propertyArray.length) {
            const newItems = new Array(quantity - propertyArray.length).fill({});
            const updatedPropertyArray = propertyArray.concat(newItems);
            setPropertyArray(updatedPropertyArray);
        } else if (quantity < propertyArray.length) {
            const updatedPropertyArray = propertyArray.filter((property, index) => {
                return index < quantity;
            });
            setPropertyArray(updatedPropertyArray);
        } else if (quantity === propertyArray.length) {
            console.log('why did this happen?')
        } else {
            console.warn('input changed but theres a problem with the if condition')
        }
    }

    useEffect(() => {
        window.addEventListener('message', receiveMessageFromIframe, false);
        
        return () => {
            window.removeEventListener('message', receiveMessageFromIframe);
        }
    }, [propertyArray]);

    return (
        <div>
            <div className="row no-print" id="property-quantity-control">
                <div className="col">
                    <div className="d-flex justify-content-center mb-3">
                        <label 
                            className="col-sm-2 col-form-label"
                            htmlFor="quantity-of-properties">
                            <strong>Quanity of properties:</strong>
                        </label>
                        <div>
                            <div className="input-group">
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={decrement}
                                    disabled={propertyCount <= minCount}>-</button>
                                <input 
                                    className="form-control text-end"
                                    name="quantity-of-properties"
                                    type="number"
                                    value={propertyCount} 
                                    onChange={updatePropertyCount}
                                    max={maxCount}
                                    min={minCount} />
                                <button 
                                    className="btn btn-secondary" 
                                    onClick={increment}
                                    disabled={propertyCount >= maxCount}>+</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id="property-keenform-iframess-container">
                {
                    propertyArray.map((propertyData, index) => {
                        const iframeId = `property-card-container-${(index+1)}`;
                        return (
                            <div
                                id={iframeId} 
                                className="property-card-container" 
                                key={index}>
                                <PropertyCard 
                                    propertyNumber={(index+1)}
                                    propertyData={propertyData} />
                            </div>
                        );
                    })

                }
            </div>

            <div className="row" id="property-table-comparison">
                <div className="col">
                    <PropertyTable propertyData={propertyArray} />
                </div>
            </div>
        </div>

    );
}
