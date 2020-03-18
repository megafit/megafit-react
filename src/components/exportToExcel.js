import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class exportToExcel extends React.Component {

  render() {
    return (
      <ExcelFile element={<p style={{ cursor: 'pointer', marign: 0 }}>{this.props.title}</p>}>
        <ExcelSheet data={this.props.data} name={this.props.nameSheet}>
          {
            this.props.labelValue.map((el, index) => (
              <ExcelColumn label={el.label} value={el.value} key={index} />
            ))
          }
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
