import React, { Component } from 'react';

class DatabaseDemo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feedback: [],
      text_name: '',
      text_message: '',
    };
  }

  componentDidMount() {
    this.populateData();
  }

  populateData() {
    this.fetch_retry('/feedback', 3)
      .then((res) => res.json())
      .then((data) => this.setState({ feedback: data.feedback }))
      .catch(console.log);
  }

  async fetch_retry(url, n) {
    try {
      return await fetch(url);
    } catch (err) {
      if (n === 1) throw err;
      await new Promise((resolve) => setTimeout(resolve, 1000));
      return await this.fetch_retry(url, n - 1);
    }
  }

  renderTableData() {
    return this.state.feedback.map(({ id, name, message }) => (
      <tr key={id} style={styles.row}>
        <td style={styles.cell}>{id}</td>
        <td style={styles.cell}>{name}</td>
        <td style={styles.cell}>{message}</td>
      </tr>
    ));
  }

  handleButtonClick = () => {
    fetch('/feedback', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: this.state.text_name,
        message: this.state.text_message,
      }),
    })
      .then((res) => res.json())
      .then(() => this.populateData());

    this.setState({ text_name: '', text_message: '' });
  };

  handleButtonClickDel = () => {
    fetch('/feedback', { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => this.populateData());

    this.setState({ text_name: '', text_message: '', feedback: [] });
  };

  handleTextChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div style={styles.container}>
        <h1 style={styles.header}>📊 Welcome to the Demo Database </h1>
        <p style={styles.subheader}>Please enter your name and you feedback for my work</p>
        <button
          onClick={this.handleButtonClickDel}
          style={{ ...styles.button, ...styles.deleteBtn }}
        >
          DELETE ALL
        </button>
        <table style={styles.table}>
          <thead>
            <tr style={styles.headerRow}>
              <th style={styles.headCell}>ID</th>
              <th style={styles.headCell}>Name</th>
              <th style={styles.headCell}>Message</th>
            </tr>
          </thead>
          <tbody>
            <tr style={styles.inputRow}>
              <td>
                <button onClick={this.handleButtonClick} style={styles.button}>
                  ADD
                </button>
              </td>
              <td>
                <input
                  type="text"
                  name="text_name"
                  placeholder="Your name"
                  value={this.state.text_name}
                  onChange={this.handleTextChange}
                  style={styles.input}
                />
              </td>
              <td>
                <input
                  type="text"
                  name="text_message"
                  placeholder="Your message"
                  value={this.state.text_message}
                  onChange={this.handleTextChange}
                  style={styles.input}
                />
              </td>
            </tr>
            {this.renderTableData()}
          </tbody>
        </table>
      </div>
    );
  }
}

const styles = {
  container: {
    padding: '40px',
    backgroundColor: '#1e1e2f',
    fontFamily: 'Segoe UI, sans-serif',
    color: '#fff',
    minHeight: '100vh',
  },
  header: {
    fontSize: '28px',
    marginBottom: '10px',
    color: '#f3f4f6',
  },
  subheader: {
    marginBottom: '20px',
    fontSize: '16px',
    color: '#aaa',
  },
  table: {
    width: '100%',
    borderCollapse: 'separate',
    borderSpacing: '0 10px',
  },
  headCell: {
    backgroundColor: '#2a2e4c',
    color: '#ffffff',
    padding: '14px',
    borderRadius: '6px',
    fontSize: '16px',
    border: '1px solid #3b4163',
  },
  cell: {
    backgroundColor: '#2d2d44',
    color: '#ddd',
    padding: '12px',
    borderRadius: '6px',
    border: '1px solid #3b4163',
  },
  input: {
    padding: '10px',
    width: '100%',
    borderRadius: '6px',
    border: '1px solid #888',
    backgroundColor: '#fff',
    color: '#000',
    fontSize: '14px',
  },
  button: {
    padding: '8px 14px',
    backgroundColor: '#3b82f6',
    color: 'white',
    fontWeight: 'bold',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  deleteBtn: {
    float: 'right',
    backgroundColor: '#dc2626',
    marginBottom: '20px',
  },
  row: {
    transition: 'background 0.2s',
    borderRadius: '6px',
  },
  headerRow: {
    backgroundColor: '#222',
  },
  inputRow: {
    backgroundColor: '#1a1a2e',
  },
};

export default DatabaseDemo;
