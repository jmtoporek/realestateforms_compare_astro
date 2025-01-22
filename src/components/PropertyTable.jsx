export default function PropertyTable(props) {
    // console.log('property table', props);

    // toLocaleString("en-US", {style:"currency", currency:"USD"});

    const attributeArray = [
        {label: "Address", key: "propertyAddress"},
        {label: "Price", key: "purchasePrice", displayType: "currency"},
        {label: "Down payment", key: "downPaymentAmount", displayType: "currency"},
        // {label: "Mortgage (monthly)", key: "monthlyPayment", displayType: "currency"},
        {label: "Mortgage plus Taxes", key: "mortgagePlusEscrowMonthly", displayType: "currency"},
        {label: "Total Monthly payment", key: "estimatedPayment", displayType: "currency", cellClass: 'bold'},
        {label: "PMI", key: "pMIAmount", displayType: "currency"},
        // {label: "Property Taxes", key: "monthlyTaxesTotal", displayType: "currency"},
        {label: "Insurance", key: "insuranceMonthlyTotal", displayType: "currency"},
        {label: "HOA fees / assessment", key: "assessmentMonthlyTotal", displayType: "currency"},
        {label: "Others", key: "otherMonthlyTotal", displayType: "currency"},
        
    ];

    return (<div>
        
        <h2 className="display-6 text-center mb-4">Compare properties</h2>

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
                        attributeArray.map((attribute) => {
                            const key = attribute.key;
                            return (<tr>
                                <th className="text-start">{attribute.label}</th>
                                {
                                    props.propertyData.map(property => {
                                        const attributeValue = property[key] || "-";
                                        let displayValue = attributeValue;
                                        const cellClass = attribute?.cellClass || "std-cell";
                                        if (attribute.displayType && attribute.displayType === "currency" ) {
                                            displayValue = attributeValue.toLocaleString("en-US", {style:"currency", currency:"USD"});
                                        }
                                        return <td className={cellClass}>{displayValue}</td>
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