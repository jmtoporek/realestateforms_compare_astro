export default function DataDefintionContent() {
    return (<div>
        <p>
            <strong>Multifamily Worksheet </strong>
        </p>

        <p>Quickly evaluate property by calculating key financial metrics that give insight into its profitability and value. Here's a breakdown of each input and output, and how the formulas are used to perform the calculations:</p>
        <p>
            <strong>Inputs:</strong> 
        </p>
        <p>
            <strong>MLS ID #</strong> - Identifier for the property in the MLS.
        </p>
        <p>
            <strong> Property Address</strong> - The location of the property, linked to a map in the report.
        </p>

        <p>
            <strong> Asking Price</strong> - The seller's listed price for the
            property.
        </p>

        <p>
        <strong>Down Payment</strong> - The amount or percentage of the purchase price that you plan to pay upfront.
        </p>

        <p>
        <strong> Financing</strong> - Uses the interest rate and loan term to
            calculate debt service (loan payments). Useing a second loan for value add
            improvements, our worksheet lets you included it.
        </p>

        <p>
            <strong> Closing Costs</strong> - Additional funds needed for the
            transaction, these include, but not limited to, legal fees, transfer
            stamps/taxes, title fees..&nbsp; Typically around 2% of the final sales
            price.
        </p>

        <p>
            <strong>Real Estate Taxes</strong> - Taxes on the property, either current
            or choose estimated taxes after reassessment.
        </p>

        <p>
        <strong> Expenses</strong> - Ongoing costs to operate the property,
            including utilities, insurance, maintenance, etc.
        </p>

        <p>
            <strong> Income</strong> - Revenue generated from the property, such as
            rent, parking fees, or additional services.
        </p>

        <p>
            <strong><u>Outputs:</u></strong>
        </p>
        <p>
            <strong>Net Operating Income</strong> (NOI) is the total income generated
            by a property, minus operating expenses (excluding debt service), which
            indicates its profitability. <br />
            Formula: Net Operating Income = Gross Annual Income - Annual Operating
            Expenses (excluding debt service)
        </p>
        <p>
            <strong>Capitalization Rate</strong> (CAP rate) indicates the expected rate
            of return from a rental property. The CAP rate represents the yield of a
            property over one year, assuming it is purchased with cash. If the CAP rate
            is lower than comparable properties, it suggests that the property is priced
            higher than the rest of the market. <br />
            <i>Formula: Capitalization Rate = Net Operating Income (NOI) / Property Value</i>
        </p>
        <p>
            <strong>Gross Rent Multiplier</strong> (GRM) values rental properties based
            on the annual rent collected by the building, before deducting any taxes,
            insurance, utilities, or other associated expenses. The advantages of the
            GRM metric is its simplicity and speed of calculation. However, a
            significant drawback is that it does not account for operating expenses. A
            lower GRM indicates a better value. <br />
            <i>Formula: Gross Rent Multiplier = Property Value / Gross Annual Income</i>
        </p>
        <p >
        <strong>Cash-on-Cash</strong> (cash yield) measures cash flow relative to
            the cash invested in a property and is calculated on a pre-tax basis.
            Closing cost must be input for this metric to be accurate<br />
            <i>Formula: Cash-on-Cash Return = NOI + Debt Service / Total Cash Invested</i>
        </p>
    </div>);
}