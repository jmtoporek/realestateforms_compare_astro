import React, { useState, useEffect, createContext } from 'react';
import PropertyCard from './PropertyCard';
import PropertyTable from './PropertyTable';
import PropertyCountController from './PropertyCountController';
import toast, { Toaster } from 'react-hot-toast';

const initialPropertyCount = 2;

const notify = (message) => toast.success(message);

export const PropertyCountContext = createContext();

export default function PropertyComparisonTool() {

    const maxCount = 5;
    const minCount = 2;
    const localStorageDataKey = "propertyData";

    const [propertyCount, setPropertyCount] = useState(initialPropertyCount);
    const [propertyArray, setPropertyArray] = useState(new Array(initialPropertyCount).fill({}));
    const [showRestoreButton, setShowRestoreButton] = useState(false);
    const [savedPropertyData, setSavedPropertyData] = useState(null);

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

    /**
     * allows number input to be set through input
     * if event.target.value is VALID then set the input
     * otherwise leave input as is
     * @param {*} event 
     */
    const updatePropertyCount = (event) => {
        const newPropertyCountVal = parseInt(event.target.value);
        if (newPropertyCountVal !== NaN && newPropertyCountVal >= minCount && newPropertyCountVal <= maxCount) {
            setPropertyCount(newPropertyCountVal);
            updatePropertyArray(newPropertyCountVal);
        } else {
            console.warn('invalid number passed');
            // should we show some sort of toast or error message?
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
        const dataAsStr = JSON.stringify(propertyArray);
        localStorage.setItem(localStorageDataKey, dataAsStr);
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
            setShowRestoreButton(true);
        } else {
            console.log('no local data');
        }
    }, []);

    return (
        <PropertyCountContext.Provider value={propertyCount}>
            <div>
                <PropertyCountController 
                    increment={increment} 
                    decrement={decrement}
                    updatePropertyCount={updatePropertyCount}
                    minCounterValue={minCount}
                    maxCounterValue={maxCount}>
                        {showRestoreButton &&
                            <div className="mx-2">
                                <div className="input-group">
                                    <button className="btn btn-primary" onClick={restoreSavedData}>Restore saved data</button>
                                    <button className="btn btn-secondary" onClick={clearLocalStorageData}>Clear saved data</button>
                                </div>
                            </div>
                        }
                </PropertyCountController>

                <div id="property-keenform-iframes-container" className="no-print">
                    {
                        propertyArray.map((propertyData, index) => {
                            const iframeId = `property-card-container-${(index+1)}`;
                            let thisPropertyCardProps = {
                                propertyNumber: (index+1),
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

                <Toaster />
            </div>
        </PropertyCountContext.Provider>
    );
}
