import * as React from "react";
import formaPrice from "../../utils/formaPrice";

class SingleValueChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      poolTime: 60000,
      data: {},
      loopCall: null
    }
  }

  loadData = () => {
    fetch('https://api.coindesk.com/v1/bpi/currentprice.json')
      .then(resp => resp.json())
      .then(json => {
        this.setState({
          data: json
        })
      });

    this.loopCall();
  };

  loopCall = () => {
    setTimeout(()=> { this.loadData() }, this.state.poolTime)
  };

  componentDidMount() {
    this.loadData();
  }

  static stopLoopCall() {
    console.log('need to stop loop for loading data');
  }

  componentWillUnmount() {
    SingleValueChart.stopLoopCall();
  }

  render() {
    let currency = this.state.data.bpi ? this.state.data.bpi.USD.rate_float : null;
    let date = this.state.data.time ? this.state.data.time.updated : null;
    return(
      <div className="single-value">
        <div className="single-value-chart">
          <div className="single-value-title">
            <div>
              <div>Bitcoin Price</div>
              <div><small>Last updated {date}</small></div>
            </div>
          </div>
          <div className="single-value-body">{formaPrice(currency)}</div>
        </div>
      </div>
    )
  }
}

export default SingleValueChart;