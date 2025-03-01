
import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Plus, Dash } from 'react-bootstrap-icons';
import {
    CONDO_LOCALSTORAGE_KEYS,
    MULTIFAMILY_LOCALSTORAGE_KEYS
} from "../constants/table_data";

export default function PropertyCard(props) {
    const {propertyNumber, savedPropertyData} = props;
    const [reset, setReset] = useState(0);
    const [expanded, setExpanded] = useState(true);

    let keenformFAKeys = CONDO_LOCALSTORAGE_KEYS;
    if (props.dataType == "multifamily") {
        keenformFAKeys = MULTIFAMILY_LOCALSTORAGE_KEYS;
    }

    const clearForm = () => {
        setReset(reset+1);
    };

    const toggleCollapsed = () => {
        console.log('toggle expanded');
        setExpanded(!expanded);
    }

    const getIframeUrl = () => {
        if (props.iframeUrl) {
            let iframeSrc = props.iframeUrl;
            let paramsObj = {
                index: propertyNumber,
                displayMode: 'iframe',
                reset: reset
            };
            // console.log('params obj', paramsObj);
            if (savedPropertyData) {
                keenformFAKeys.forEach(key => {
                    if(savedPropertyData.hasOwnProperty(key)) {
                        paramsObj[key] = savedPropertyData[key];
                    }
                })
            }/* else {
                console.log('missing property number')
            }*/

            let paramStr = '';
            for (let [key, value] of Object.entries(paramsObj)) {
                paramStr += `${key}=${value}&`;
            }
            const iframeUrl = iframeSrc + '?' + paramStr;
            // console.log('iframeUrl', iframeUrl);
            return iframeUrl;
        } else {
            return null;
        }
    }

    const collapsedIcon = expanded ? <Dash className="ml-4" /> : <Plus className="ml-4" />;
    const iframeSrc = getIframeUrl();
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
                    { !!iframeSrc ? 
                        <div>
                            <iframe src={getIframeUrl()}></iframe>
                        </div>
                        : <div>loading</div>
                    }
                </Collapse>
            </div>
        </div>
    );
}