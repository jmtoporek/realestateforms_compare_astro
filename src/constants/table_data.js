const CONDO_PROPERTY_DATA = [
    
]

const CONDO_LOCALSTORAGE_KEYS = [
    // fix this key
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

const MULTIFAMILY_PROPERTY_DATA = [
    {label: "Address", key: "addressOfProperty"},
    {label: "Price", key: "purchasePrice", displayType: "currency"},
    {label: "Down payment", key: "downPaymentAmount", displayType: "currency"},
    {label: "Mortgage (monthly)", key: "monthlyPayment", displayType: "currency"},
    {label: "Property Taxes", key: "monthlyTaxesTotal", displayType: "currency"},
    {label: "PMI", key: "pMIAmount", displayType: "currency"},
    {label: "HOA fees / assessment", key: "assessmentMonthlyTotal", displayType: "currency"},
    {label: "Insurance", key: "insuranceMonthlyTotal", displayType: "currency"},
    {label: "Others", key: "otherMonthlyTotal", displayType: "currency"},
    {label: "Total Monthly payment", key: "estimatedPayment", displayType: "currency", cellClass: 'bold'},
];

const MULTIFAMILY_LOCALSTORAGE_KEYS = [];
