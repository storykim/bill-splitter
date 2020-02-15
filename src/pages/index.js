import React from "react"
import IntroPanel from "../components/intro"
import UserPanel from "../components/user"
import BillPanel from "../components/bill"
import ResultPanel from "../components/result"
import { Helmet } from "react-helmet"

class App extends React.Component {
  constructor(props) {
    super(props)
    this.nextId = 1
    this.state = {
      users: [],
      bills: [
      ],
    }

    this.onAddBill = this.onAddBill.bind(this)
    this.onBillChange = this.onBillChange.bind(this)
    this.onBillDelete = this.onBillDelete.bind(this)
    this.onUserSubmit = this.onUserSubmit.bind(this)
    this.onUserDelete = this.onUserDelete.bind(this)
    this.calculateResult = this.calculateResult.bind(this)
  }

  onAddBill(e) {
    e.preventDefault()
    let newBill = {
      id: this.nextId,
      payer: "",
      amount: "",
      people: [],
    }
    this.nextId += 1

    this.setState(prevState => {
      return {
        bills: [...prevState.bills, newBill],
      }
    })
  }

  onBillChange(id, newBill) {
    this.setState(prevState => {
      return {
        bills: prevState.bills.map(bill => {
          if (bill.id === id) {
            return newBill
          }
          return bill
        }),
      }
    })
  }

  onBillDelete(id) {
    this.setState(prevState => {
      return {
        bills: prevState.bills.filter(el => el.id !== id),
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
      const amount = parseFloat(bill.amount)
      if (bill.payer === "" || bill.people.length === 0 || isNaN(amount)) {
        return
      }

      userToResultMap[bill.payer] += amount
      bill.people.forEach(person => {
        userToResultMap[person] -= amount / bill.people.length
      })
    })

    return userToResultMap
  }

  render() {
    return (
      <div className="application">
        <Helmet>
          <title>Bill Splitter</title>
        </Helmet>
        <div style={{ maxWidth: "960px", margin: "3rem auto" }}>
          <IntroPanel />
          <UserPanel
            users={this.state.users}
            onUserSubmit={this.onUserSubmit}
            onUserDelete={this.onUserDelete}
          />
          <BillPanel
            bills={this.state.bills}
            users={this.state.users}
            onAddBill={this.onAddBill}
            onBillChange={this.onBillChange}
            onBillDelete={this.onBillDelete}
          />
          <br />
          <ResultPanel result={this.calculateResult()} />
        </div>
      </div>
    )
  }
}
export default App
