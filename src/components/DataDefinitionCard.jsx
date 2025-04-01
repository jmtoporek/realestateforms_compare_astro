import React, { useState } from 'react';
import Collapse from 'react-bootstrap/Collapse';
import { Plus, Dash } from 'react-bootstrap-icons';
import DataDefintionContent from './DataDefinitionContent';

export default function DataDefinitionCard(props) {

    const [expanded, setExpanded] = useState(true);

    const toggleCollapsed = () => {
        setExpanded(!expanded);
    }

    const collapsedIcon = expanded ? <Dash className="ml-4" /> : <Plus className="ml-4" />;

    return (
        <div className="data-definition no-print">

            <div className="card rounded-3 shadow-sm">
                <div className="card-header d-flex justify-content-between">
                    <div className="fw-normal m-2 h5">Data Definitions</div>
                    <div className="btn-group">
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
                            <DataDefintionContent />
                        </div>
                    </Collapse>
                </div>
            </div>
        </div>
    );
}