import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyTable from './PropertyTable';

const initialPropertyCount = 2;

export default function PropertyComparisonTool() {

    const [propertyCount, setPropertyCount] = useState(initialPropertyCount);

    // let initialPropertyArray = new Array(propertyCount);
    // initialPropertyArray = initialPropertyArray.map((item, index) => {
    //     return {};
    // });

    // console.log("initialPropertyArray", initialPropertyArray);

    const [propertyArray, setPropertyArray] = useState(new Array(initialPropertyCount).fill({}));

    const receiveMessageFromIframe = (event) => {
        const data = event.data;
        if (data?.messageType === "KeenformState") {
            let propertyData = data.formAttributeValues;
            const updatedData = propertyArray.map((obj, i) => {
                if (i+1 === propertyData.index) {
                    console.log('found property data', propertyData);
                    return propertyData;
                } else {
                    return obj;
                }
            });
            console.log('updatedData', updatedData);
            setPropertyArray(updatedData);
            console.log('get iframe height');

            // var iframe = document.getElementById('yourIframeID');
            // var iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
            // var height =iframeDoc.body.scrollHeight;
        }
    };

    const updatePropertyCount = (event) => {
        const propertyCount = event.target.value || 2;
        if (propertyCount < 2 || propertyCount > 5) {
            console.warn('entering an invalid number for property count');
        } else {
            setPropertyCount(event.target.value);
            if (propertyCount > propertyArray.length) {
                console.log('add new item to property array');
                const newItems = new Array(propertyCount - propertyArray.length).fill({});
                const updatedPropertyArray = propertyArray.concat(newItems);
                setPropertyArray(updatedPropertyArray);
            } else if (propertyCount < propertyArray.length) {
                console.log('remove item from property array');
                const updatedPropertyArray = propertyArray.filter((property, index) => {
                    return index < (propertyArray.length - 1);
                })
                setPropertyArray(updatedPropertyArray);
            } else if (propertyCount === propertyArray.length) {
                console.log('why did this happen?')
            } else {
                console.warn('input changed but theres a problem with the if condition')
            }
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
                            <input 
                                className="form-control"
                                name="quantity-of-properties"
                                type="number" 
                                value={propertyCount} 
                                onChange={updatePropertyCount}
                                max={5}
                                min={2} />
                        </div>
                    </div>
                </div>
            </div>

            <div className="row" id="property-keenform-iframes">
                {
                    propertyArray.map((propertyData, index) => {
                        const iframeId = `property-card-container-${(index+1)}`;
                        return (
                            <div
                                id={iframeId} 
                                className="col" 
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
