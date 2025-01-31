import React, { useState, useEffect } from 'react';
import PropertyCard from './PropertyCard';
import PropertyTable from './PropertyTable';
import LocalStorageModal from './LocalStorageModal';
import Button from 'react-bootstrap/Button';
import toast, { Toaster } from 'react-hot-toast';

const initialPropertyCount = 2;

const notify = (message) => toast.success(message);

export default function PropertyComparisonTool() {

    const maxCount = 5;
    const minCount = 2;
    const localStorageDataKey = "propertyData";

    const [propertyCount, setPropertyCount] = useState(initialPropertyCount);

    const [propertyArray, setPropertyArray] = useState(new Array(initialPropertyCount).fill({}));

    const [showModal, setShowModal] = useState(false);

    const [showRestoreButton, setShowRestoreButton] = useState(false);

    const [savedPropertyData, setSavedPropertyData] = useState(null);

    const toggleModal = () => {
        setShowModal(!showModal);
    }

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
        if (newPropertyCountVal < minCount || newPropertyCountVal > maxCount) {
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
            console.log('why did this happen?');
        } else {
            console.warn('input changed but theres a problem with the if condition');
        }
    }

    const saveLocally = () => {
        console.log('save data to local storage', propertyArray);
        // TODO add expiration date
        const dataAsStr = JSON.stringify(propertyArray);
        localStorage.setItem(localStorageDataKey, dataAsStr);
        // show toast
        notify('Your data has been saved to this device');
    }

    const getLocalStorageData = () => {
        const localStorageData = localStorage.getItem(localStorageDataKey);
        if (localStorageData) {
            return JSON.parse(localStorageData);
        } else {
            return null;
        }
    }

    const clearLocalStorageData = () => {
        if (window.confirm("Do you really want to erase your saved data?")) {
            localStorage.removeItem(localStorageDataKey);
            setShowRestoreButton(false);
            notify('Previously saved data has been deleted');
        }
    }

    const restoreSavedData = () => {
        const localStorageData = getLocalStorageData();
        if (localStorageData ) {
            console.log('local data:', localStorageData );
            console.log('length of array',  localStorageData.length);
            if (localStorageData.length > propertyCount) {
                setPropertyCount(localStorageData.length);
                updatePropertyArray(localStorageData.length);
            }
            setSavedPropertyData(localStorageData);
        } else {
            console.log('no local data');
        }
    }

    useEffect(() => {
        window.addEventListener('message', receiveMessageFromIframe, false);
        
        return () => {
            window.removeEventListener('message', receiveMessageFromIframe);
        }
    }, [propertyArray]);

    useEffect(() => {
        const localData = getLocalStorageData();
        if (localData) {
            console.log('Show restore button');
            setShowRestoreButton(true);
        } else {
            console.log('no local data');
        }
    }, []);

    return (
        <div>
            <div className="row no-print" id="property-quantity-control">
                <div className="col">
                    <div className="d-flex flex-wrap justify-content-center mb-3">
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
                        {showRestoreButton &&
                            <div className="mx-2">
                                <div className="input-group">
                                    <button className="btn btn-primary" onClick={restoreSavedData}>Restore saved data</button>
                                    <button className="btn btn-secondary" onClick={clearLocalStorageData}>Clear saved data</button>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>

            <div id="property-keenform-iframes-container" className="no-print">
                {
                    propertyArray.map((propertyData, index) => {
                        const iframeId = `property-card-container-${(index+1)}`;
                        let thisPropertyCardProps = {
                            propertyNumber: (index+1),
                            // propertyData: {propertyData}
                        };
                        if (savedPropertyData) {
                            thisPropertyCardProps.savedPropertyData = savedPropertyData[index];
                        }
                        return (
                            <div
                                id={iframeId} 
                                className="property-card-container" 
                                key={index}>
                                <PropertyCard 
                                    {...thisPropertyCardProps} />
                            </div>
                        );
                    })

                }
            </div>

            <div className="row" id="property-table-comparison">
                <div className="col">
                    <PropertyTable 
                        propertyData={propertyArray}
                        saveLocally={saveLocally}
                    />
                </div>
            </div>

            <LocalStorageModal 
                show={showModal} 
                onClose={toggleModal}
            />

            <Toaster />
        </div>

    );
}
