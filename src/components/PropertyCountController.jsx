import React, { useContext } from 'react';

import { PropertyCountContext } from './PropertyComparisonTool';

export default function PropertyCountController(props) {
    const propertyCount = useContext(PropertyCountContext);

    return (<div>
        <div className="row no-print" id="property-quantity-control">
            <div className="col">
                <div className="d-flex flex-wrap justify-content-center mb-3">
                    <label 
                        className="col-sm-2 col-form-label"
                        htmlFor="quantity-of-properties">
                        <strong>Quantity of properties:</strong>
                    </label>
                    <div>
                        <div className="input-group">
                            <button 
                                className="btn btn-secondary" 
                                onClick={props.decrement}
                                disabled={propertyCount <= props.minCounterValue}>-</button>
                            <input 
                                className="form-control text-end"
                                name="quantity-of-properties"
                                type="number"
                                value={propertyCount} 
                                onChange={props.updatePropertyCount}
                                max={props.maxCounterValue}
                                min={props.minCounterValue} />
                            <button 
                                className="btn btn-secondary" 
                                onClick={props.increment}
                                disabled={propertyCount >= props.maxCounterValue}>+</button>
                        </div>
                    </div>
                    {props.children}
                </div>
            </div>
        </div>
    </div>);
}