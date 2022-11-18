import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
interface IProps {
  type: string;
}

const VaccineForm: React.FC<IProps> = (props: IProps) => {
  const { type } = props;
  const { id } = useParams();

  useEffect(() => {
    console.log("parmas: ", id);
  });
  return (
    <div className="auth-form">
      <div className="mt-5">
        <div className="mb-4 row">
          <label htmlFor="name" className="col-sm-2 col-md-2 col-lg-2 col-form-label">
            Name <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <input type="text" className="form-control" id="name" />
          </div>
        </div>

        <div className="mb-4 row">
          <label htmlFor="dose" className="col-sm-2 col-md-2 col-lg-2 col-form-label">
            No. Of Dose <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <input
              type="text"
              className="form-control"
              id="dose"
            />
          </div>
        </div>

				<div className="mb-4 row">
          <label htmlFor="description" className="col-sm-2 col-md-2 col-lg-2 col-form-label">
            Description <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <textarea className="form-control" id="description" />
          </div>
        </div>

				<div className="mb-4 row">
          <label htmlFor="image" className="col-sm-2 col-md-2 col-lg-2 col-form-label">
            Image
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <input type="file" className="form-control" id="image" />
          </div>
        </div>

        <button type="button" className="btn btn-primary mt-4">
          {type.toLowerCase() === "create" ? "Add" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default VaccineForm;
