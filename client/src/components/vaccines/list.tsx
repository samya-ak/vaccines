import React, { useEffect, useState } from "react";
import defaultImg from "../../static/med.png";
import { Link } from "react-router-dom";
import { listVaccines, deleteVaccine } from "../../api";
import { IVaccine } from "../../types";
import { showToast } from "../../actions/toast";
import { useDispatch } from "react-redux";
import { NhostClient } from "@nhost/react";
import { config } from "../../config";

const Vaccines: React.FC = () => {
  const [vaccines, setVaccines] = useState<IVaccine[]>([]);
  const [deleting, setDeleting] = useState<number>(-1);
  const dispatch = useDispatch();
  const nhost = new NhostClient({
    subdomain: config.NHOST_SUBDOMAIN,
    region: config.NHOST_REGION,
    adminSecret: config.NHOST_ADMIN_SECRET,
  });

  const compare = (a: any, b: any) => {
    if (a.name < b.name && a.mandatory && !b.mandatory) {
      return -1;
    }
    if (a.name < b.name && !a.mandatory && !b.mandatory) {
      return -1;
    }
    if (a.name < b.name && a.mandatory && b.mandatory) {
      return -1;
    }
    if (a.name < b.name && !a.mandatory && b.mandatory) {
      return 1;
    }
    if (a.name === b.name && !a.mandatory && b.mandatory) {
      return 1;
    }

    if (a.name > b.name && a.mandatory && !b.mandatory) {
      return -1;
    }
    if (a.name > b.name && a.mandatory && b.mandatory) {
      return 1;
    }
    if (a.name > b.name && !a.mandatory && !b.mandatory) {
      return 1;
    }
    if (a.name > b.name && !a.mandatory && b.mandatory) {
      return 1;
    }
    if (a.name === b.name && a.mandatory && !b.mandatory) {
      return -1;
    }
    return 0;
  };

  const fetchVaccines = () => {
    listVaccines().then((res) => {
      const list = res.data as IVaccine[];
      list.sort(compare);

      setVaccines(list);
    });
  };

  useEffect(() => {
    fetchVaccines();
  }, []);

  const removeVaccine = async (id: number, url: string) => {
    try {
      setDeleting(id);
      await deleteVaccine(id);
      if (url.length) {
        const fileId = url.split("/").at(-1) as string;
        await nhost.storage.delete({ fileId });
      }

      setDeleting(-1);
      fetchVaccines();
    } catch (err) {
      const message = "Error deleting image/vaccine";
      dispatch(showToast({ type: "danger", show: true, message: [message] }));
    }
  };

  return (
    <div className="mt-4">
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Image</th>
            <th scope="col">Name</th>
            <th scope="col">Mandatory</th>
            <th scope="col">Dose</th>
            <th scope="col">Description</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {vaccines.length <= 0 && (
            <tr>
              <td className="text-center p-3" colSpan={7}>
                {" "}
                Empty : )
              </td>
            </tr>
          )}
          {vaccines.map((vaccine, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>
                  <img
                    className="vaccine-img"
                    src={vaccine.image || defaultImg}
                    alt="default"
                  />
                </td>
                <td>{vaccine.name}</td>
                <td>{vaccine.mandatory ? "Yes" : "No"}</td>
                <td>{vaccine.numberOfDoses}</td>
                <td>{vaccine.description}</td>
                <td>
                  <span className="me-3">
                    <Link to={`/vaccines/${vaccine.id}/edit`} state={vaccine}>
                      <i className="bi bi-pencil-square text-primary fs-5"></i>
                    </Link>
                  </span>

                  {deleting === vaccine.id ? (
                    <>removing ...</>
                  ) : (
                    <span
                      onClick={() => removeVaccine(vaccine.id, vaccine.image)}
                    >
                      <i className="bi bi-trash text-danger fs-5 cursor-pointer"></i>
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Link to="/vaccines/create">
        <button type="button" className="btn btn-primary mt-4">
          Add
        </button>
      </Link>
    </div>
  );
};

export default Vaccines;
