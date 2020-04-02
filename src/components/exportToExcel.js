import React from "react";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

export default class exportToExcel extends React.Component {

  render() {
    return (
      <ExcelFile element={<p style={{ cursor: 'pointer', marign: 0, fontSize: 15 }}>{this.props.title}</p>}>
        <ExcelSheet data={this.props.dataReportAll} name={this.props.nameSheet}>
          {
            this.props.labelValueReportNilai.map((el, index) => (
              <ExcelColumn label={el.label} value={el.value} key={index} />
            ))
          }
        </ExcelSheet>
      </ExcelFile>
    );
  }
}
