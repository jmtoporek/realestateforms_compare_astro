export const CONDO_PROPERTY_DATA = [
    {label: "Address", key: "propertyAddress"},
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

export const CONDO_LOCALSTORAGE_KEYS = [
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

export const MULTIFAMILY_PROPERTY_DATA = [
    {label: "MLS ID Number", key: "mLSIDNumber"},
    {label: "Address", key: "addressOfProperty"},
    {label: "Cap Rate", key: "capRate"},
    {label: "Net Operating Income", key: "netOperatingIncome", displayType: "currency"},
    {label: "Purchase Price", key: "purchasePrice", displayType: "currency"},
    {label: "Annual Debt Service", key: "annualDebtService", displayType: "currency"},
    {label: "Real Estate Taxes (Yearly)", key: "realEstateTaxesYearly", displayType: "currency"},
    {label: "annualGrossIncome", key: "annualGrossIncome", displayType: "currency"},
    {label: "annualFixedExpenses", key: "annualFixedExpenses", displayType: "currency"},
    {label: "desiredCapRates", key: "desiredCapRate"}
];

export const MULTIFAMILY_LOCALSTORAGE_KEYS = [
    "mLSIDNumber",
    "addressOfProperty",
    "capRate",
    "netOperatingIncome",
    "purchasePrice",
    "annualDebtService",
    "realEstateTaxesYearly",
    "annualGrossIncome",
    "annualFixedExpenses",
    "desiredCapRate"
];
