import { Request, Response } from "express";
import { IVaccine } from "../types";
import Vaccine from "../models/vaccine";
import {
  createVaccine,
  updateVaccine,
  listVaccines,
  deleteVaccine,
  getVaccineById,
} from "../services/vaccines";
import { db } from "../app";

export const remove = async (req: Request, res: Response, next: Function) => {
  let exists = await getVaccineById(db, req.params.id);
  if (!exists) {
    return next({ status: 404, message: "Vaccine does not exist" });
  }
  if (exists.userId !== parseInt(req.body.userId)) {
    return next({ status: 403, message: "Not authorized to delete." });
  }

  let deleted = await deleteVaccine(db, req.params.id);
  if (!deleted) {
    return next({ status: 500, error: "Issue in deleting vaccines." });
  }
  return res.send({ message: "Vaccine deleted successfully." });
};

export const list = async (req: Request, res: Response, next: Function) => {
  let vaccines = await listVaccines(db, req.body.userId);
  if (!vaccines) {
    return next({ status: 500, message: "Issue in getting vaccines." });
  }
  return res.send({ data: vaccines });
};

export const create = async (req: Request, res: Response, next: Function) => {
  const errs = validate(req.body);
  if (Object.keys(errs).length > 0) {
    return res.status(422).send({ error: errs });
  }

  const vaccine: Vaccine = req.body;
  const success = await createVaccine(db, vaccine);
  if (!success) {
    return next({ status: 500, message: "Issue in creating vaccine." });
  }
  return res.send({ success: true, vaccine });
};

export const update = async (req: Request, res: Response, next: Function) => {
  let exists = await getVaccineById(db, req.params.id);
  if (!exists) {
    return next({ status: 404, message: "Vaccine does not exist" });
  }
  if (exists.userId !== parseInt(req.params.id)) {
    return next({ status: 403, message: "Not authorized to delete." });
  }

  const errs = validate(req.body);
  if (Object.keys(errs).length > 0) {
    return res.status(422).send({ error: errs });
  }

  const vaccine: Vaccine = req.body;
  vaccine.id = parseInt(req.params.id);
  const success = await updateVaccine(db, vaccine);
  if (!success) {
    return next({ status: 500, message: "Issue in creating vaccine." });
  }
  return res.send({ success: true, vaccine });
};

const validate = ({ name, description, numberOfDoses }: IVaccine) => {
  const errs: any = {};
  if (!name) {
    errs["name"] = "Vaccine name is required";
  }
  if (!description) {
    errs["description"] = "Vaccine Description is required";
  }
  if (!numberOfDoses) {
    errs["numberOfDoses"] = "Vaccine's number of doses is required";
  }
  return errs;
};
