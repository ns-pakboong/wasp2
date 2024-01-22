import React, { Component } from 'react';
//import { Button } from 'react-bootstrap'
import { Row, Col, Container, Button } from "react-bootstrap";


class DataDisplay extends Component {
    state = {}

    render() {

        const statusStyle = {
            fontSize: '1.5em', // Adjust the font size as per your preference
        };

        const containerStyle = {
            border: '1px solid 	#89AFC2 ',
            padding: '1.5em',
            borderRadius: '10px',
        };

        return (
            <div>
                <Container className="h-100" fluid={true}>

                <table {...getTableProps()} className="table">
      {/* ส่วนของส่วนหัวของตาราง */}
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th {...column.getHeaderProps()}>{column.render('Header')}</th>
            ))}
          </tr>
        ))}
      </thead>

      {/* ส่วนของร่างของตาราง */}
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map(cell => (
                <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  
                </Container>
            </div>
        );
    }

}

export default DataDisplay; 