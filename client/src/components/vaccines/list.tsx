import React from "react";
import defaultImg from "../../static/med.png";
import { Link } from "react-router-dom";

const Vaccines: React.FC = () => {
  return (
    <div className="mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Dose</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>
              <img className="vaccine-img" src={defaultImg} alt="default" />
            </td>
            <td>Pfizer</td>
            <td>2</td>
            <td>Pfizer is awesome.</td>
            <td>
              <span className="me-3">
                <Link to="/vaccines/create">
                  <i className="bi bi-pencil-square text-primary fs-5"></i>
                </Link>
              </span>

              <span>
                <i className="bi bi-trash text-danger fs-5"></i>
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Vaccines;
