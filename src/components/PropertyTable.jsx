export default function PropertyTable(props) {

    const attributeArray = [
        {label: "Address", key: "propertyAddress"},
        {label: "Price", key: "purchasePrice", displayType: "currency"},
        {label: "Down payment", key: "downPaymentAmount", displayType: "currency"},
        {label: "Mortgage (monthly)", key: "monthlyPayment", displayType: "currency"},
        {label: "Property Taxes", key: "monthlyTaxesTotal", displayType: "currency"},
        {label: "PMI", key: "pMIAmount", displayType: "currency"},
        // {label: "Mortgage plus Taxes", key: "mortgagePlusEscrowMonthly", displayType: "currency"},
        {label: "HOA fees / assessment", key: "assessmentMonthlyTotal", displayType: "currency"},
        {label: "Insurance", key: "insuranceMonthlyTotal", displayType: "currency"},
        {label: "Others", key: "otherMonthlyTotal", displayType: "currency"},
        {label: "Total Monthly payment", key: "estimatedPayment", displayType: "currency", cellClass: 'bold'},
    ];

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