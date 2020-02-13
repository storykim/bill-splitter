import React from "react"

class BillRow extends React.Component {
  /* props : {
        users
        bill ( payer, amount, person )
    }*/
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
          >
            <option></option>
            {users.map((user, idx) => (
              <option key={user}>{user}</option>
            ))}
          </select>
        </td>
        <td className="col-amt">
          <input style={{ width: "7ch" }} value={bill.amount} />
        </td>
        {users.map((user, idx) => (
          <td key={user}>
            <input
              type="checkbox"
              name={user}
              value=""
              checked={bill.people.includes(user)}
            />
          </td>
        ))}
      </tr>
    )
  }
}

class BillTable extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    const users = this.props.users
    return (
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
            <BillRow key={idx} users={users} bill={bill}></BillRow>
          ))}
        </tbody>
      </table>
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
            ></BillTable>
          </div>
          <div className="row">
            <div className="text-center col">
              <button type="button" className="btn btn-success">
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
