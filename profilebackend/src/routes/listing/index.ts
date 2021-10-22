import { getAllCurrentListings } from "../../controller/listing";

const express = require('express');
const listingRouter = express.Router();

listingRouter.get('/all/current', getAllCurrentListings);

export default listingRouter