import React from "react"

function NumWithSign(num) {
  if (num < 0) {
    return <span style={{ color: "red" }}>{num}</span>
  } else if (num > 0) {
    return <span style={{ color: "green" }}>{"+" + num}</span>
  } else {
    return <span>0</span>
  }
}

class ResultOverview extends React.Component {
  render() {
    const result = this.props.result
    return (
      <div>
        {Object.keys(result).map((user, idx) => (
          <div>
            {user} : {NumWithSign(result[user])}
          </div>
        ))}
      </div>
    )
  }
}

class TransactionPanel extends React.Component {
  render() {
    return (
      <div>
        <div className="text-center">
          You can minimize the number of transaction.
        </div>
        <div className="text-center">
          <button className="btn btn-primary">Minimize</button>
        </div>
        <br />
        <div>Donghwa -> Emile : 5000</div>
      </div>
    )
  }
}

class ResultPanel extends React.Component {
  render() {
    return (
      <div className="container">
        <div className="text-center">
          <h2>Result</h2>
          <ResultOverview result={this.props.result} />
          <hr />
          <TransactionPanel />
        </div>
      </div>
    )
  }
}

export default ResultPanel
