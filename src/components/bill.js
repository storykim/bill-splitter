import React from "react"

class BillRow extends React.Component {
  /* props : {
        users
        bill ( payer, amount, person )
    }*/
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
  }

  onInputChange = e => {
    const target = e.target
    const newBill = Object.assign({}, this.props.bill)
    if (target.name === "payer") {
      newBill.payer = target.value
    } else if (target.name === "amount") {
      newBill.amount = parseFloat(target.value)
    } else {
      const user = target.name.substring(6)
      if (target.checked) {
        // TODO : consider changing the data structure of bill.people to set
        if (!newBill.people.includes(user)) {
          newBill.people = [...newBill.people, user]
        }
      } else {
        newBill.people = newBill.people.filter(el => el !== user)
      }
    }
    this.props.onBillChange(newBill.id, newBill)
  }
  render() {
    const users = this.props.users
    const bill = this.props.bill
    return (
      <tr>
        <td className="col-payer">
          <select
            style={{ width: "10ch" }}
            value={bill.payer}
            className="form-control"
            name="payer"
            onChange={this.onInputChange}
          >
            <option></option>
            {users.map((user, idx) => (
              <option key={user}>{user}</option>
            ))}
          </select>
        </td>
        <td className="col-amt">
          <input
            style={{ width: "7ch" }}
            value={bill.amount}
            name="amount"
            type="number"
            onChange={this.onInputChange}
          />
        </td>
        {users.map((user, idx) => (
          <td key={user}>
            <input
              type="checkbox"
              name={"check-" + user}
              value=""
              checked={bill.people.includes(user)}
              onChange={this.onInputChange}
            />
          </td>
        ))}
      </tr>
    )
  }
}

class BillTable extends React.Component {
  render() {
    const users = this.props.users
    return (
      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Payer</th>
              <th>Amount</th>
              {users.map((user, idx) => (
                <th key={user}>{user}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {this.props.bills.map((bill, idx) => (
              // TODO : fix key
              <BillRow
                key={idx}
                users={users}
                bill={bill}
                onBillChange={this.props.onBillChange}
              ></BillRow>
            ))}
          </tbody>
        </table>
      </div>
    )
  }
}

class BillPanel extends React.Component {
  render() {
    return (
      <fieldset className="border rounded p-2">
        <legend className="w-auto">Bills</legend>
        <div className="container">
          <div className="row">
            <BillTable
              bills={this.props.bills}
              users={this.props.users}
              onBillChange={this.props.onBillChange}
            ></BillTable>
          </div>
          <div className="row">
            <div className="text-center col">
              <button
                type="button"
                className="btn btn-success"
                onClick={this.props.onAddBill}
              >
                Add Bill
              </button>
            </div>
          </div>
        </div>
      </fieldset>
    )
  }
}

export default BillPanel
