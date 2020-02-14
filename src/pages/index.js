import React from "react"
import IntroPanel from "../components/intro"
import UserPanel from "../components/user"
import BillPanel from "../components/bill"
import ResultPanel from "../components/result"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users: ["Donghwa", "Emile"],
      bills: [
        { payer: "Donghwa", amount: 10, people: ["Donghwa", "Emile"] },
        { payer: "Emile", amount: 20, people: ["Donghwa"] },
        { payer: "", amount: 100, people: ["Donghwa", "Emile"] },
      ],
    }

    this.onUserSubmit = this.onUserSubmit.bind(this)
    this.calculateResult = this.calculateResult.bind(this)
  }

  onUserSubmit(name) {
    if (name === "" || this.state.users.includes(name)) {
      // TODO : show warning message
      return
    }

    this.setState((prevState, props) => {
      return {
        users: [...prevState.users, name],
      }
    })
  }

  calculateResult() {
    const users = this.state.users
    const bills = this.state.bills
    let userToResultMap = {}
    users.forEach(user => {
      userToResultMap[user] = 0
    })

    bills.forEach(bill => {
      if (bill.payer === "" || bill.people.length === 0) {
        return
      }

      userToResultMap[bill.payer] += bill.amount
      bill.people.forEach(person => {
        userToResultMap[person] -= bill.amount / bill.people.length
      })
    })

    return userToResultMap
  }

  render() {
    return (
      <div style={{ maxWidth: "600px", margin: "3rem auto" }}>
        <IntroPanel />
        <UserPanel users={this.state.users} onUserSubmit={this.onUserSubmit} />
        <BillPanel bills={this.state.bills} users={this.state.users} />
        <br />
        <ResultPanel result={this.calculateResult()} />
      </div>
    )
  }
}
export default App
