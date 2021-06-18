import React from "react";

class Display extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: [] };
  }

  componentDidMount() {
    fetch("http://localhost:3001/getdata")
      .then(result=> {
        result.json();
      });
    
  }

  render() {
    return (
      <div>
        <ul>
          {this.state.map(data => (
            <p>
              <li>Some Text_1: {data.db_col_1}</li>
              <li>Some Text_2: {data.db_col_2}</li>
              <li>Some Text_3: {data.db_col_3}</li>
            </p>
          ))}
        </ul>
      </div>
    );
  }
}

export default Display;