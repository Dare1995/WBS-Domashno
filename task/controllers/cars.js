const { getAll, create, update, remove } = require("../models/cars");

const getAllCars = async (req, res) => {
    try {
        const data = await getAll(req.auth.id);
        return res.status(200).send(data);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const createCar = async (req, res) => {
    try {
        // const data = {
        //     ...req.body,
        //     owner: req.auth.id,
        // };
        // const newCar = await create(data);
        const carData = req.body;
        const newCar = await create(carData);
        return res.status(200).send(newCar);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
}

const updateCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const updateCar = await update(carId, req.body);
        return res.status(200).send(updateCar);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};

const deleteCar = async (req, res) => {
    try {
        const carId = req.params.id;
        const deleteCar = await remove(carId);
        return res.status(200).send(deleteCar);
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error!");
    }
};



module.exports = {
    getAllCars,
    createCar,
    updateCar,
    deleteCar
}