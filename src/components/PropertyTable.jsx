import {
    CONDO_PROPERTY_DATA,
    MULTIFAMILY_PROPERTY_DATA
} from '../constants/table_data';

export default function PropertyTable(props) {
    // TODO check env file for data type, use condo or multifamily
    let attributeArray = CONDO_PROPERTY_DATA;
    if (props.dataType == "multifamily") {
        attributeArray = MULTIFAMILY_PROPERTY_DATA;
    }

    const print = () => {
        window.print();
    };

    return (<div>
        
        <h2 className="display-6 text-center no-print">Compare properties</h2>

        <div className="text-center mb-4 no-print">
            <div className="btn-group">
                <button className="btn btn-outline-primary" onClick={props.saveLocally}>Save</button>
                <button className="btn btn-outline-primary" onClick={print}>Print</button>
            </div>
        </div>

        <div className="table-responsive">
            <table className="table text-center table-striped-columns table-bordered table-sm">
                <thead>
                    <tr>
                        <th className="first-header-cell"> </th>
                        {
                            props.propertyData.map((p, key) => {
                                return <th key={key}>Property #{p.index}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody className="table-body-class">
                    {
                        attributeArray.map((attribute, index) => {
                            const key = attribute.key;
                            if (attribute.rowType === "divider") {
                                // get quantity of columns, set colspan to that value
                                const colspanVal = props.propertyData.length + 1;
                                return <tr key={index} className="divider-row">
                                    <th colSpan={colspanVal}>{attribute.label}</th>
                                </tr>;
                            } else {
                            // move this to function to get property ROW data
                            // use separate 
                                let rowClass = "std-row";
                                if (attribute.cellType && attribute.cellType == "th") {
                                    rowClass = "bold-row";
                                }
                                return (<tr className={rowClass} key={index}>
                                    { attribute.cellType && attribute.cellType == "th" 
                                        ? <th className="text-start">{attribute.label}</th>
                                        : <td className="text-start">{attribute.label}</td>
                                    }
                                    {
                                        props.propertyData.map((property, i) => {
                                            const attributeValue = property[key] || "-";
                                            let displayValue = attributeValue;
                                            // add this to all currency, and percentage values
                                            // text-end currency-font 
                                            let cellClassArray = [attribute?.cellClass] || ["std-cell"];
                                            // let cellClass = attribute?.cellClass || "std-cell text-end currency-font";
                                            if (attribute.displayType) {
                                                switch(attribute.displayType) {
                                                    case "currency":
                                                        displayValue = attributeValue.toLocaleString("en-US", {style:"currency", currency:"USD"});
                                                        cellClassArray = cellClassArray.concat(['text-end','currency-font']);
                                                        break;
                                                    case "percent":
                                                        if (attributeValue != "-") {
                                                            displayValue = `${attributeValue}%`;
                                                        }
                                                        cellClassArray = cellClassArray.concat(['text-end','currency-font']);
                                                        break;
                                                    default:
                                                        // do nothing?
                                                }
                                            }
                                            // console.log('cell type', attribute.cellType);
                                            if (attribute.cellType && attribute.cellType == "th"){
                                                return <th className={cellClassArray.join(" ")} key={i}>{displayValue}</th>
                                            } else {
                                                return <td className={cellClassArray.join(" ")} key={i}>{displayValue}</td>
                                            }
                                            
                                            
                                        })
                                    }
                                </tr>);
                            }
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>);
}