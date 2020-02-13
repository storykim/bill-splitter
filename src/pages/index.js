import React from "react"
import IntroPanel from "../components/intro"
import UserPanel from "../components/user"
import BillPanel from "../components/bill"
import ResultPanel from "../components/result"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = { scale: "c", temperature: "0" }

    // TODO : move to state
    this.users = ["Donghwa", "Emile"]
    this.tempBills = [
      { payer: "Donghwa", amount: 10, people: ["Donghwa", "Emile"] },
      { payer: "Emile", amount: 20, people: ["Donghwa"] },
      { payer: "", amount: 100, people: ["Donghwa", "Emile"] },
    ]

    this.calculateResult = this.calculateResult.bind(this)
  }

  calculateResult() {
    let userToResultMap = {}
    this.users.forEach(user => {
      userToResultMap[user] = 0
    })

    this.tempBills.forEach(bill => {
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
        <UserPanel users={this.users} />
        <BillPanel bills={this.tempBills} users={this.users} />
        <br />
        <ResultPanel result={this.calculateResult()}/>
      </div>
    )
  }
}
export default App
