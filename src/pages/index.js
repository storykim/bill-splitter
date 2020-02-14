import React from "react"
import IntroPanel from "../components/intro"
import UserPanel from "../components/user"
import BillPanel from "../components/bill"
import ResultPanel from "../components/result"

class App extends React.Component {
  constructor(props) {
    super(props)
    // TODO : set to 1
    this.nextId = 4;
    this.state = {
      users: ["Donghwa", "Emile"],
      bills: [
        {id:1, payer: "Donghwa", amount: 10, people: ["Donghwa", "Emile"] },
        {id:2, payer: "Emile", amount: 20, people: ["Donghwa"] },
        {id:3, payer: "", amount: 100, people: ["Donghwa", "Emile"] },
      ],
    }

    this.onAddBill = this.onAddBill.bind(this)
    this.onUserSubmit = this.onUserSubmit.bind(this)
    this.onUserDelete = this.onUserDelete.bind(this)
    this.calculateResult = this.calculateResult.bind(this)
  }

  onAddBill(e) {
    e.preventDefault()
    let newBill = {
      id: this.nextId,
      payer: '',
      amount: 0,
      people: [],
    }
    this.nextId += 1

    this.setState(prevState => {
      return {
        bills: [...prevState.bills, newBill]
      }
    })
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

  onUserDelete(name) {
    if (!this.state.users.includes(name)) {
      console.log("INVALID delete! Username : ", name)
      return
    }

    this.setState((prevState, props) => {
      // Delete user from users
      const newUsers = prevState.users.filter(el => el !== name)
      // Delete user from bills
      const newBills = prevState.bills.map(bill => {
        bill.payer = bill.payer === name ? "" : bill.payer
        if (bill.people.includes(name)) {
          bill.people = bill.people.filter(el => el !== name)
        }

        return bill
      })

      return {
        users: newUsers,
        bills: newBills,
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
        <UserPanel
          users={this.state.users}
          onUserSubmit={this.onUserSubmit}
          onUserDelete={this.onUserDelete}
        />
        <BillPanel bills={this.state.bills} users={this.state.users} onAddBill={this.onAddBill}/>
        <br />
        <ResultPanel result={this.calculateResult()} />
      </div>
    )
  }
}
export default App
