import * as React from "react";
import {MuiThemeProvider, RaisedButton} from "material-ui";
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

class CreateItemBlock extends React.Component {
    componentWillMount() {
        this.setState({
            iDs: [1, 2, 3, 4, 5]
        })
    }

    updateBook = (id) => {
        const options = {
            method: 'PUT',
            mode: 'cors',
            redirect: 'follow'
        };
        return fetch(`http://localhost:3001/api/new/${id}`, options)
            .then(resp => resp.json())
            .then(response => {

            })
            .catch(error => {

            })
    };

    showState = () => {
        const promises = this.state.iDs.map(id => this.updateBook(id));
        Promise.all(promises).then(() => {
            console.log('END');
        });
    };
    generatePrf = () => {
      const el = document.body;
      const options = {
        useCORS: true,
        allowTaint: true
      };
      html2canvas(el, options)
        .then(canvas => {
          // document.body.appendChild(canvas);
          const image = canvas.toDataURL('image/jpeg');
          let doc = new jsPDF({
            orientation: 'landscape'
          });

          doc.addImage(image, 'jpeg', 10, 10, 275, 180);
          doc.save('report.pdf');
        })
    };
    render() {
        return (
            <div>
                <MuiThemeProvider>
                    <div>
                      <RaisedButton onClick={this.showState} label="Hello"/>
                      <RaisedButton onClick={this.generatePrf} label={'generate pdf'}/>
                    </div>
                </MuiThemeProvider>
            </div>
        )
    }
}

export default CreateItemBlock;