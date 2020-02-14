import React from "react"

class User extends React.Component {
  constructor(props) {
    super(props)

    this.handleDelete = this.handleDelete.bind(this)
  }

  handleDelete = e => {
    e.preventDefault()
    this.props.onUserDelete(this.props.name)
  }

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
        <button type="button" onClick={this.handleDelete}>
          &times;
        </button>
      </span>
    )
  }
}

class UserInput extends React.Component {
  constructor(props) {
    super(props)

    this.handleClick = this.handleClick.bind(this)
  }

  handleClick = e => {
    e.preventDefault()
    this.props.onUserSubmit(e.target.nameInput.value)
    e.target.nameInput.value = ""
  }
  render() {
    return (
      <div>
        <form
          style={{ display: "inline-block" }}
          className="form-inline col-xs-1"
          onSubmit={this.handleClick}
        >
          <input
            placeholder="Name"
            className="form-control form-control-sm col-6"
            type="text"
            style={{ display: "inline-block" }}
            name="nameInput"
          />
          <input
            style={{ display: "inline-block" }}
            type="submit"
            className="btn btn-primary btn-sm"
            value="+"
          />
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
          <User
            key={user}
            name={user}
            onUserDelete={this.props.onUserDelete}
          ></User>
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
            <UserList
              users={this.props.users}
              onUserDelete={this.props.onUserDelete}
            />
            <UserInput onUserSubmit={this.props.onUserSubmit} />
          </div>
        </div>
      </fieldset>
    )
  }
}

export default UserPanel
