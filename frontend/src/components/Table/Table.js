import React from 'react';
import { Link } from 'react-router-dom';

const Table = (props) => {
  const { data, columns, isEditable, editURL } = props;

  const tableColumms = columns.map((column) => (
    <th scope="col" name={column.name} key={column.name}>
      {column.header}
    </th>
  ));

  const tableRows = data.map((dataElement) => (
    <tr key={dataElement.id}>
      <th scope="row">{dataElement.id}</th>
      <td>{dataElement.title}</td>
      <td>{dataElement.price}</td>
      {isEditable && (
        <td>
          <Link to={editURL + '/' + dataElement.id} className="btn btn-link">
            Edit
          </Link>
        </td>
      )}
    </tr>
  ));

  return (
    <table className="table">
      <thead>
        <tr>
          {tableColumms}
          {isEditable && <th />}
        </tr>
      </thead>
      <tbody>{tableRows}</tbody>
    </table>
  );
};

export default Table;
