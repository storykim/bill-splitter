import React from "react"

function NumWithSign(num) {
  if (num < 0) {
    return <span style={{ color: "red" }}>{num.toFixed(2)}</span>
  } else if (num > 0) {
    return <span style={{ color: "green" }}>{"+" + num.toFixed(2)}</span>
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
          <div key={user}>
            {user} : {NumWithSign(result[user])}
          </div>
        ))}
      </div>
    )
  }
}

class TransactionPanel extends React.Component {
  constructor(props) {
    super(props)
    this.calculateTransaction = this.calculateTransaction.bind(this)
  }

  calculateTransaction() {
    const result = this.props.result
    const keys = Object.keys(result)
    let plus = []
    let minus = []

    keys.forEach(user => {
      const value = result[user]
      if (value > 0) {
        plus.push({ user: user, value: value })
      } else if (value < 0) {
        minus.push({ user: user, value: -value })
      }
    })

    // sort
    plus.sort((a, b) => {
      return a.value > b.value ? -1 : 1
    })
    minus.sort((a, b) => {
      return a.value > b.value ? -1 : 1
    })

    // find same amount
    var plusIdx = 0
    var minusIdx = 0
    var results = []
    var usedPlus = []
    var usedMinus = []
    while (plusIdx < plus.length && minusIdx < minus.length) {
      if (plus[plusIdx].value === minus[minusIdx].value) {
        results.push([
          plus[plusIdx].user,
          minus[minusIdx].user,
          plus[plusIdx].value,
        ])
        usedPlus.push(plusIdx)
        usedMinus.push(minusIdx)
        plusIdx += 1
        minusIdx += 1
      } else {
        if (plus[plusIdx].value > minus[minusIdx].value) {
          plusIdx += 1
        } else {
          minusIdx += 1
        }
      }
    }

    plus = plus.filter((el, idx) => !usedPlus.includes(idx))
    minus = minus.filter((el, idx) => !usedMinus.includes(idx))

    plusIdx = 0
    minusIdx = 0
    while (plusIdx < plus.length && minusIdx < minus.length) {
      var plusObj = plus[plusIdx]
      var minusObj = minus[minusIdx]
      if (plusObj.value === minusObj.value) {
        results.push([plusObj.user, minusObj.user, plusObj.value])
        plusIdx += 1
        minusIdx += 1
      } else {
        if (plusObj.value > minusObj.value) {
          results.push([plusObj.user, minusObj.user, minusObj.value])
          plusObj.value -= minusObj.value
          minusIdx += 1
        } else {
          results.push([plusObj.user, minusObj.user, plusObj.value])
          minusObj.value -= plusObj.value
          plusIdx += 1
        }
      }
    }

    // TODO : consider issues from floating point representation
    // Verify
    if (plusIdx !== plus.length || minusIdx !== minus.length) {
      console.log("Something went wrong during calculation!")
    }

    return results
  }

  render() {
    return (
      <div>
        <h2>Transactions</h2>
        {this.calculateTransaction().map((elem, idx) => (
          <div key={idx}>
            {elem[1]} → {elem[0]} : {elem[2].toFixed(2)}
          </div>
        ))}
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
          <TransactionPanel result={this.props.result} />
        </div>
      </div>
    )
  }
}

export default ResultPanel
