import React from "react"

class User extends React.Component {
  render() {
    return (
      <span
        className="badge badge-pill badge-secondary"
        style={{ display: "inline-block", marginRight: "8px" }}
      >
        <div
          className="name"
          vertical-align="middle"
          style={{ display: "inline-block", paddingRight: "4px" }}
        >
          {this.props.name}
        </div>
        <a type="button">&times;</a>
      </span>
    )
  }
}

class UserInput extends React.Component {
  render() {
    return (
      <div>
        <form
          style={{ display: "inline-block" }}
          className="form-inline col-xs-1"
        >
          <input
            placeholder="Name"
            className="form-control form-control-sm col-6"
            type="text"
            style={{ display: "inline-block" }}
          />
          <button
            style={{ display: "inline-block" }}
            type="submit"
            className="btn btn-primary btn-sm"
          >
            +
          </button>
        </form>
      </div>
    )
  }
}

class UserList extends React.Component {
  render() {
    return (
      <div>
        {this.props.users.map((user, idx) => (
          <User key={user} name={user}></User>
        ))}
      </div>
    )
  }
}

class UserPanel extends React.Component {
  render() {
    return (
      <fieldset className="border rounded p-2">
        <legend className="w-auto">Users</legend>
        <div className="container">
          <div className="row">
            <UserList users={this.props.users} />
            <UserInput />
          </div>
        </div>
      </fieldset>
    )
  }
}

export default UserPanel
