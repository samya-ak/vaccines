import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { IVaccine } from "../../types";
import { useDispatch } from "react-redux";
import { showToast } from "../../actions/toast";
import { NhostClient } from "@nhost/react";
import { config } from "../../config";
import Resizer from "react-image-file-resizer";
import { createVaccine, updateVaccine } from "../../api";
interface IProps {
  type: string;
}

interface IError {
  [field: string]: string;
}

const VaccineForm: React.FC<IProps> = (props: IProps) => {
  const { type } = props;
  const location = useLocation();
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const defaultVaccine: IVaccine = {
    id: -1,
    name: "",
    numberOfDoses: 0,
    description: "",
    mandatory: false,
    image: "",
  };
  const [vaccine, setVaccine] = useState<IVaccine>(defaultVaccine);
  const [errs, setErrs] = useState<IError>({});
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [file, setFile] = useState<File>();
  const nhost = new NhostClient({
    subdomain: config.NHOST_SUBDOMAIN,
    region: config.NHOST_REGION,
    adminSecret: config.NHOST_ADMIN_SECRET,
  });

  useEffect(() => {
    if (type === "edit" && location.state) {
      setVaccine(location.state);
    }
  }, []);

  const hasErrors = (): boolean => {
    let errors: any = {};
    let prop: keyof typeof vaccine;

    for (prop in vaccine) {
      const isRequired =
        prop === "name" || prop === "numberOfDoses" || prop === "description";
      if (isRequired && vaccine[prop] === "") {
        errors[prop] = `${prop} is required.`;
      }
    }

    setErrs(errors);
    return Object.keys(errors).length > 0;
  };

  const hideToast = () => {
    setTimeout(() => {
      dispatch(showToast({ type: "success", show: false, message: [] }));
    }, 4000);
  };

  const submit = async () => {
    if (hasErrors()) {
      return;
    }

    setSubmitting(true);
    switch (type.toLowerCase()) {
      case "create":
        await createAction();
        break;
      case "edit":
        await editAction();
        break;
    }

    setSubmitting(false);
    hideToast();
  };

  const resizeFile = (file: File) =>
    new Promise((resolve) => {
      Resizer.imageFileResizer(
        file,
        250,
        250,
        "JPEG",
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        "file"
      );
    });

  const createAction = async () => {
    let publicUrl = "";
    try {
      if (file) {
        const resizedImage = (await resizeFile(file)) as File;

        // upload file to nhost and get public url
        const res = await nhost.storage.upload({ file: resizedImage });
        if (res.fileMetadata) {
          publicUrl = await nhost.storage.getPublicUrl({
            fileId: res.fileMetadata.id,
          });
        }
      }
      const newPayload = { ...vaccine, image: publicUrl };

      await createVaccine(newPayload);
      navigate("/vaccines");
    } catch (err: any) {
      const message = "Error uploading/getting image url to/from nhost";
      dispatch(showToast({ type: "danger", show: true, message: [message] }));
    }
  };

  const editAction = async () => {
    let publicUrl = "";
    try {
      if (file) {
        const resizedImage = (await resizeFile(file)) as File;
        // delete existing image
        const fileId = vaccine.image.split("/").at(-1) as string
        await nhost.storage.delete({ fileId })
        
        // upload file to nhost and get public url
        const res = await nhost.storage.upload({ file: resizedImage });
        if (res.fileMetadata) {
          publicUrl = await nhost.storage.getPublicUrl({
            fileId: res.fileMetadata.id,
          });
        }
      }
      const newPayload = { ...vaccine, image: publicUrl };

      await updateVaccine(publicUrl ? newPayload: vaccine);
      navigate("/vaccines");
    } catch (err: any) {
      const message = "Error uploading/getting image url to/from nhost";
      dispatch(showToast({ type: "danger", show: true, message: [message] }));
    }
  };

  const handleCheckedValue = (value: boolean) => {
    setVaccine((state) => ({ ...state, mandatory: value }));
  };

  const handleInputChanged = (value: string, field: keyof typeof vaccine) => {
    let err = errs;
    setVaccine((state) => ({ ...state, [field]: value }));
    delete err[field];
    setErrs(err);
  };

  useEffect(() => {
    if (Object.keys(errs).length) {
      let message = [] as string[];
      for (const [k, v] of Object.entries(errs)) {
        message.push(v);
      }

      dispatch(showToast({ type: "danger", show: true, message }));
      hideToast();
    }
  }, [errs]);

  return (
    <div className="auth-form">
      <div className="mt-5">
        <div className="mb-4 row align-items-center">
          <label
            htmlFor="name"
            className="col-sm-2 col-md-2 col-lg-2 col-form-label"
          >
            Mandatory
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4 align-items-center">
            <input
              className="form-check-input"
              type="checkbox"
              checked={vaccine.mandatory}
              id="mandatory"
              onChange={(e) => handleCheckedValue(!vaccine.mandatory)}
            />
          </div>
        </div>
        <div className="mb-4 row">
          <label
            htmlFor="name"
            className="col-sm-2 col-md-2 col-lg-2 col-form-label"
          >
            Name <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <input
              type="text"
              className="form-control"
              id="name"
              onChange={(e) => handleInputChanged(e.target.value, "name")}
              value={vaccine.name}
            />
          </div>
        </div>

        <div className="mb-4 row">
          <label
            htmlFor="dose"
            className="col-sm-2 col-md-2 col-lg-2 col-form-label"
          >
            No. Of Dose <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <input
              type="number"
              min="0"
              className="form-control"
              id="dose"
              onChange={(e) =>
                handleInputChanged(e.target.value, "numberOfDoses")
              }
              value={vaccine.numberOfDoses}
            />
          </div>
        </div>

        <div className="mb-4 row">
          <label
            htmlFor="description"
            className="col-sm-2 col-md-2 col-lg-2 col-form-label"
          >
            Description <span className="text-danger">*</span>
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <textarea
              className="form-control"
              id="description"
              onChange={(e) =>
                handleInputChanged(e.target.value, "description")
              }
              value={vaccine.description}
            />
          </div>
        </div>

        <div className="mb-4 row">
          <label
            htmlFor="image"
            className="col-sm-2 col-md-2 col-lg-2 col-form-label"
          >
            Image
          </label>
          <div className="col-sm-10 col-md-4 col-lg-4">
            <input
              type="file"
              className="form-control"
              id="image"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files) {
                  setFile(e.target.files[0]);
                }
              }}
            />
          </div>
        </div>
        <div>
          {type === "edit" && vaccine.image && (
            <img className="vaccine-img2" src={vaccine.image} alt="default" />
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary mt-4"
          onClick={() => submit()}
          disabled={submitting}
        >
          {type.toLowerCase() === "create" ? "Add" : "Edit"}
        </button>
      </div>
    </div>
  );
};

export default VaccineForm;
