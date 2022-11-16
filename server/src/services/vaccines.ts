import Vaccine from "../models/vaccine";
import Database from "./database";

export const createVaccine = async (
  db: Database,
  vaccine: Vaccine
): Promise<boolean> => {
  const insert = `INSERT INTO vaccines
	(name, description, number_of_doses, user_id)
	VALUES (?, ?, ?, ?)`;
  try {
    await db.run(insert, [
      vaccine.name,
      vaccine.description,
      vaccine.numberOfDoses,
      vaccine.userId,
    ]);
    return true;
  } catch (err) {
    console.error("VACCINE INSERT ERROR: ", err);
    return false;
  }
};

export const updateVaccine = async (
  db: Database,
  vaccine: Vaccine
): Promise<boolean> => {
  const update = `UPDATE vaccines 
	SET name = ?, description = ?, number_of_doses = ?, user_id = ?
	WHERE id = ?`;

  try {
    await db.run(update, [
      vaccine.name,
      vaccine.description,
      vaccine.numberOfDoses,
      vaccine.userId,
      vaccine.id,
    ]);
    return true;
  } catch (err) {
    console.error("VACCINE UPDATE ERROR: ", err);
    return false;
  }
};

export const getVaccineById = async(db: Database, id: string): Promise<Vaccine | null> => {
	const getOne = `SELECT id, name, description, number_of_doses as numberOfDoses, user_id as userId
		FROM vaccines WHERE id = ?`
	try {
		const vaccine = await db.get(getOne, [id])
		return <Vaccine>vaccine
	}catch(err){
		console.error("VACCINE GET ONE ERROR: ", err);
		return null
	}
}

export const listVaccines = async(db: Database, userId: string): Promise<Vaccine[] | null> => {
	const list = `SELECT id, name, description, number_of_doses as numberOfDoses, user_id as userId
		FROM vaccines WHERE user_id = ?`
	try {
		const vaccines = await db.all(list, [userId])
		return <Vaccine[]>vaccines
	}catch(err){
		console.error("VACCINE GET ERROR: ", err);
		return null
	}
}

export const deleteVaccine = async(db: Database, id: string): Promise<boolean> => {
	const remove = `DELETE FROM vaccines WHERE id = ?`
	try {
		await db.run(remove, [id])
		return true
	}catch(err){
		console.error("VACCINE DELETE ERROR: ", err);
		return false
	}
}
