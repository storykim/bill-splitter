import React from "react"

class BillRow extends React.Component {
  /* props : {
        users
        bill ( payer, amount, person )
    }*/
  constructor(props) {
    super(props)
    this.onInputChange = this.onInputChange.bind(this)
    this.onBillDelete = this.onBillDelete.bind(this)
  }

  onBillDelete = e => {
    e.preventDefault()
    this.props.onBillDelete(this.props.bill.id)
  }

  onInputChange = e => {
    const target = e.target
    const newBill = Object.assign({}, this.props.bill)
    if (target.name === "payer") {
      newBill.payer = target.value
    } else if (target.name === "amount") {
      if (target.value === "") {
        newBill.amount = ""
      } else {
        const amount = parseFloat(target.value)
        if (isNaN(amount)) {
          return
        }

        // Remove leading zeros
        newBill.amount = target.value.replace(/^0+/, '')
      }
    } else if (target.name === "checkall") {
      const isCheckedAll =
        this.props.bill.people.length === this.props.users.length
      if (isCheckedAll) {
        newBill.people = []
      } else {
        newBill.people = [...this.props.users]
      }
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
    const isCheckedAll = bill.people.length === users.length
    return (
      <tr>
        <td className="col-payer" style={{width:"9ch"}}>
          <select
            value={bill.payer}
            className="form-control"
            name="payer"
            onChange={this.onInputChange}
            style={{ width: "9ch" }}
          >
            <option></option>
            {users.map((user, idx) => (
              <option key={user}>{user}</option>
            ))}
          </select>
        </td>
        <td className="col-amt">
          <input
            style={{ width: "7ch", textAlign: "right" }}
            value={bill.amount}
            name="amount"
            type="text"
            onChange={this.onInputChange}
          />
        </td>
        {users.map((user, idx) => (
          <td key={user} className="text-center">
            <input
              type="checkbox"
              name={"check-" + user}
              value=""
              checked={bill.people.includes(user)}
              onChange={this.onInputChange}
            />
          </td>
        ))}
        <td>
          <button
            className="btn btn-success btn-sm"
            onClick={this.onInputChange}
            name="checkall"
            style={{ width: "11ch" }}
          >
            {isCheckedAll ? "Uncheck All" : "Check All"}
          </button>
        </td>
        <td>
          <button className="btn btn-danger btn-sm" onClick={this.onBillDelete}>
            Delete
          </button>
        </td>
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
              <th style={{ width: "10ch" }}>Payer</th>
              <th style={{ width: "10ch" }}>Amount</th>
              {users.map((user, idx) => (
                <th
                  key={user}
                  className="text-center"
                  style={{ width: "8ch", maxWidth: "8ch", overflowX: "hidden" }}
                >
                  {user}
                </th>
              ))}
              <th style={{ width: "11ch" }}></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.props.bills.map((bill, idx) => (
              <BillRow
                key={bill.id}
                users={users}
                bill={bill}
                onBillChange={this.props.onBillChange}
                onBillDelete={this.props.onBillDelete}
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
              onBillDelete={this.props.onBillDelete}
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
