import * as React from "react";
import html2canvas from "html2canvas";
// import jsPDF from "jspdf";

class GeneratePdf extends React.Component {
  generatePrf = () => {
    const el = document.body;
    const options = {
      useCORS: true,
      allowTaint: true
    };
    html2canvas(el, options)
      .then(canvas => {
        document.body.appendChild(canvas);
      })
  };
  render() {
    return(
      <i onClick={this.generatePrf} className='fa fa-file-pdf-o'/>
    )
  }
}

export default GeneratePdf;