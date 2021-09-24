import {
    saveCooperative,
    findCooperativeById,
    findAllCooperatives,
    findCooperativesByKeyWord,
    findDuplicates,
  } from "../helpers/cooperativeHelper";
  
  import { findAllDriversByCooperative } from "../helpers/userHelper";
  import { findRidesByDriverIds, getAllRidesCount } from "../helpers/rideHelper";
  import { getAllReviewsCount } from "../helpers/reviewHelper";
  
  const createCooperative = async (req, res) => {
    try {
      const { name, email, phone, location } = req.body;
      const cooperativeExists = await findDuplicates(name, email, phone);
  
      if (cooperativeExists) {
        const errors = [];
        if (name === cooperativeExists.name) {
          errors.push({
            msg: "Another Cooperative with the same name already exists",
            param: "name",
            value: name,
          });
        }
        if (email === cooperativeExists.email) {
          errors.push({
            msg: "Another Cooperative with the same email already exists",
            param: "email",
            value: email,
          });
        }
        if (phone === cooperativeExists.phone) {
          errors.push({
            msg: "Another Cooperative with the same phone number already exists",
            param: "phone",
            value: phone,
          });
        }
        return res.status(409).json({
          status: 409,
          errors: { errors },
        });
      }
  
      const savedCooperative = await saveCooperative(name, email, phone, location);
      return res.status(201).json({
        status: 201,
        message: "Cooperative registered successfully",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error! Couldn't process request",
      });
    }
  };
  
  const viewSingleCooperative = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    try {
      const foundCooperative = await findCooperativeById(id);
      if (foundCooperative) {
        return res.status(200).json({
          status: 200,
          data: foundCooperative,
        });
      }
      return res.status(404).json({
        status: 404,
        error: "cooperative not found",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error!",
      });
    }
  };
  
  const viewAllCooperatives = async (req, res) => {
    try {
      const foundCooperatives = await findAllCooperatives();
      if (foundCooperatives.length) {
        return res.status(200).json({
          status: 200,
          data: foundCooperatives,
        });
      }
      return res.status(404).json({
        status: 404,
        error: "No cooperatives were found!",
      });
    } catch (error) {
      res.status(500).json({
        status: 500,
        error: "Server error!",
      });
    }
  };
  
  const searchCooperatives = async (req, res) => {
    const { key } = req.params;
    try {
      const foundCooperatives = await findCooperativesByKeyWord(key);
      if (foundCooperatives.length) {
        return res.status(200).json({
          status: 200,
          data: foundCooperatives,
        });
      }
      return res.status(404).json({
        status: 404,
        error: "No match was found!",
      });
    } catch (error) {
      return res.status(500).json({
        status: 500,
        error: "Server error!",
      });
    }
  };
  
  const viewCooperativeStats = async (req, res) => {
    let { id } = req.params;
    id = Number(id);
    let drivers = await findAllDriversByCooperative(id);
    const ids = drivers.map((el) => el.id);
    let overAllAverage = 0;
    let cummulativeRatingTotal = 0;
    let reviewCountTotal = 0;
    let driversData = [];
    if (drivers) {
      await drivers.forEach((driver) => {
        cummulativeRatingTotal += driver.cummulativeRating;
        reviewCountTotal += driver.reviewCount;
        driver.averageRating =
          driver.reviewCount === 0
            ? 0
            : driver.cummulativeRating / driver.reviewCount;
        if(driver.averageRating !== 0) {
          driversData.push({
            id: driver.id,
            cooperativeId: driver.cooperativeId,
            cummulativeRating: driver.cummulativeRating,
            reviewCount: driver.reviewCount,
            name: driver.name,
            profilePhoto: driver.profilePhoto,
            averageRating: driver.averageRating,
            email: driver.email,
            phoneNumber: driver.phoneNumber,
            gender: driver.gender,
            username: driver.username
          });
        }
      });
      overAllAverage =
        reviewCountTotal === 0 ? 0 : cummulativeRatingTotal / reviewCountTotal;
    }
    const rides = await findRidesByDriverIds(ids);
    const sortedDrivers = driversData.sort((first, second) => second.averageRating - first.averageRating).slice(0,10);
    return res.status(200).json({
      status: 200,
      message: "stats delivered",
      data: {
        totalReviews: reviewCountTotal,
        totalRides: rides,
        overAllAverage: Math.round((overAllAverage + Number.EPSILON) * 100) / 100,
        drivers: sortedDrivers,
      }
    });
  };
  
  const viewCooperativesStats = async (req, res) => {
    const allRides = await getAllRidesCount();
    const allReviews = await getAllReviewsCount();
    const allCooperatives = await findAllCooperatives();
    return res.status(200).json({
      status: 200,
      data: {
        ridesCount: allRides,
        reviewsCount: allReviews,
        cooperatives: allCooperatives
      }
    });
  };
  
  export {
    createCooperative,
    viewSingleCooperative,
    viewAllCooperatives,
    searchCooperatives,
    viewCooperativeStats,
    viewCooperativesStats
  };
  