import {
    CONDO_PROPERTY_DATA,
    MULTIFAMILY_PROPERTY_DATA
} from '../constants/table_data';

export default function PropertyTable(props) {
    console.log('property table props', props);

    // TODO check env file for data type, use condo or multifamily
    let attributeArray = CONDO_PROPERTY_DATA;
    if (props.dataType == "multifamily") {
        keenformFAKeys = MULTIFAMILY_PROPERTY_DATA;
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
            <table className="table text-center">
                <thead>
                    <tr>
                        <th> </th>
                        {
                            props.propertyData.map((p, key) => {
                                return <th key={key}>Property #{p.index}</th>
                            })
                        }
                    </tr>
                </thead>
                <tbody>
                    {
                        attributeArray.map((attribute, index) => {
                            const key = attribute.key;
                            return (<tr key={index}>
                                <th className="text-start">{attribute.label}</th>
                                {
                                    props.propertyData.map((property, i) => {
                                        const attributeValue = property[key] || "-";
                                        let displayValue = attributeValue;
                                        const cellClass = attribute?.cellClass || "std-cell";
                                        if (attribute.displayType && attribute.displayType === "currency" ) {
                                            displayValue = attributeValue.toLocaleString("en-US", {style:"currency", currency:"USD"});
                                        }
                                        return <td className={cellClass} key={i}>{displayValue}</td>
                                    })
                                }
                            </tr>);
                        })
                    }
                </tbody>
            </table>
        </div>
    </div>);
}