
import React, { useState } from 'react';

export default function PropertyCard(props) {
    // console.log('props', props);
    const iframeSrc = "https://keenforms.com/keenforms/b7740ab6-17e8-4929-bfbb-0f4396a35249" + `?index=${props.propertyNumber}`;
    return (
        <div className="card mb-4 rounded-3 shadow-sm">
            <div className="card-header py-3">
                <h4 className="my-0 fw-normal">Property #{props.propertyNumber}</h4>
            </div>
            <div className="card-body card-body-no-padding" style={{padding: 0}}>
                <iframe src={iframeSrc}></iframe>
            </div>
        </div>
    );
}