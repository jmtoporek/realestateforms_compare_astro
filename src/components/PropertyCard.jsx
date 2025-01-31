
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Collapse from 'react-bootstrap/Collapse';
import { Plus, Dash } from 'react-bootstrap-icons';

const keenformFAKeys = [
    "propertyAddress",
    "purchasePrice",
    "downPaymentPercent",
    "interestRate",
    "numberOfYears",
    "taxes",
    "taxes1Frequency",
    "taxes2",
    "taxes2Frequency",
    "insurance",
    "insuranceFrequency",
    "associationFees1",
    "associationFee1Frequency",
    "associationFees2",
    "associationFee2Frequency",
    "otherFees",
    "otherFeesFrequency"
];

export default function PropertyCard(props) {
    console.log('props', props);
    const {propertyNumber, savedPropertyData} = props;

    const [reset, setReset] = useState(0);
    const [expanded, setExpanded] = useState(true);

    const clearForm = () => {
        setReset(reset+1);
    };

    const toggleCollapsed = () => {
        console.log('toggle expanded');
        setExpanded(!expanded);
    }

    const getIframeUrl = () => {
        let iframeSrc = "https://keenforms.com/keenforms/b7740ab6-17e8-4929-bfbb-0f4396a35249?";
        let paramsObj = {
            index: propertyNumber,
            displayMode: 'iframe',
            reset: reset
        };
        if (savedPropertyData) {
            keenformFAKeys.forEach(key => {
                if(savedPropertyData.hasOwnProperty(key)) {
                    paramsObj[key] = savedPropertyData[key];
                }
            })
        }

        let paramStr = '';
        for (let [key, value] of Object.entries(paramsObj)) {
            paramStr += `${key}=${value}&`;
        }
        const iframeUrl = iframeSrc + paramStr;
        return iframeUrl;
    }

    const collapsedIcon = expanded ? <Dash className="ml-4" /> : <Plus className="ml-4" />;

    // const paramsStr = `index=${propertyNumber}&displayMode=iframe&reset=${reset}`;
    const iframeSrc = getIframeUrl;
    // "https://keenforms.com/keenforms/b7740ab6-17e8-4929-bfbb-0f4396a35249?" + paramsStr;
    return (
        <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header d-flex justify-content-between">
                <div className="fw-normal m-2 h5">Property #{propertyNumber}</div>
                <div className="btn-group">
                    <button type="button" className="btn btn-outline-secondary btn-sm" onClick={clearForm}>clear</button>
                    <button 
                        type="button" 
                        className="btn btn-outline-secondary btn-sm" 
                        onClick={toggleCollapsed}>
                        {collapsedIcon}
                    </button>
                </div>
            </div>
            <div className="card-body card-body-no-padding" style={{padding: 0}}>
                <Collapse in={expanded}>
                    <div>
                        <iframe src={iframeSrc()}></iframe>
                    </div>
                </Collapse>
            </div>
        </div>
    );
}