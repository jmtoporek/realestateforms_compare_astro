import {
  CONDO_PROPERTY_DATA,
  MULTIFAMILY_PROPERTY_DATA,
} from "../constants/table_data";

export default function PropertyTable(props) {
  // TODO check env file for data type, use condo or multifamily
  let attributeArray = CONDO_PROPERTY_DATA;
  if (props.dataType == "multifamily") {
    attributeArray = MULTIFAMILY_PROPERTY_DATA;
  }

  const print = () => {
    window.print();
  };

  const getPropertyRowData = (propertyArray, attribute) => {
    const attributeName = attribute.key;
    const valueArray = [];

    // iterate over each property to find the attribute.key
    const cellArray = propertyArray.map((property, i) => {
      const attributeValue = property[attributeName] || "-";
      valueArray.push(attributeValue);
      let displayValue = attributeValue;
      let cellClassArray = [attribute?.cellClass] || ["std-cell"];
      // let cellClass = attribute?.cellClass || "std-cell text-end currency-font";
      if (attribute.displayType) {
        switch (attribute.displayType) {
          case "currency":
            displayValue = attributeValue.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            });
            cellClassArray = cellClassArray.concat([
              "text-end",
              "currency-font",
            ]);
            break;
          case "percent":
            if (attributeValue != "-") {
              displayValue = `${attributeValue}%`;
            }
            cellClassArray = cellClassArray.concat([
              "text-end",
              "currency-font",
            ]);
            break;
          default:
          // do nothing?
        }
      }
      if (attribute.cellType && attribute.cellType == "th") {
        return (
          <th className={cellClassArray.join(" ")} key={i}>
            {displayValue}
          </th>
        );
      } else {
        return (
          <td className={cellClassArray.join(" ")} key={i}>
            {displayValue}
          </td>
        );
      }
    });
    // if all values are the "-" then and hideIfBlank is true then return undefined
    const allValuesEmpty = valueArray.every((val) => val === "-");
    if (allValuesEmpty && !!attribute.hideIfBlank) {
      return undefined;
    }
    return cellArray;
  };

  return (
    <div>
      <h2 className="display-6 text-center no-print">Compare properties</h2>

      <div className="text-center mb-4 no-print">
        <div className="btn-group">
          <button
            className="btn btn-outline-primary"
            onClick={props.saveLocally}
          >
            Save
          </button>
          <button className="btn btn-outline-primary" onClick={print}>
            Print
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table text-center table-striped-columns table-bordered table-sm">
          <thead>
            <tr>
              <th className="first-header-cell"> </th>
              {props.propertyData.map((p, index) => {
                return <th key={index}>Property #{p.index}</th>;
              })}
            </tr>
          </thead>
          <tbody className="table-body-class">
            {attributeArray.map((attribute, index) => {
              if (attribute.rowType === "divider") {
                // get quantity of columns, set colspan to that value
                const colspanVal = props.propertyData.length + 1;
                return (
                  <tr key={index} className="divider-row">
                    <th colSpan={colspanVal}>{attribute.label}</th>
                  </tr>
                );
              } else if (attribute.rowType === "pagebreak") {
                return <tr key={index} className="pagebreak"></tr>;
              } else {
                // move this to function to get property ROW data
                let rowClass = "std-row";
                if (attribute.cellType && attribute.cellType == "th") {
                  rowClass = "bold-row";
                }
                const rowData = getPropertyRowData(
                  props.propertyData,
                  attribute
                );

                if (rowData === undefined) {
                  return <></>;
                }

                return (
                  <tr className={rowClass} key={index}>
                    {attribute.cellType && attribute.cellType == "th" ? (
                      <th className="text-start">{attribute.label}</th>
                    ) : (
                      <td className="text-start">{attribute.label}</td>
                    )}
                    {getPropertyRowData(props.propertyData, attribute)}
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
