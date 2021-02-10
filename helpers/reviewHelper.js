import { Op } from 'sequelize';
import models from '../models';

const { Review } = models;

const createReview = async (comment, hygieneRating, roadSafetyRating, professionalismRating, averageRating, rideId, commuterId, driverId) => {
    return await Review.create({
        comment,
        hygieneRating,
        roadSafetyRating,
        professionalismRating,
        averageRating,
        rideId,
        commuterId,
        driverId,
        createdAt: new Date(),
        updatedAt: new Date()
    });
};

const findReviewById = async (id) => {
    return await Review.findOne({
        where: {
            id
        }
    });
};

const findReviewsByUserId = async (idFieldName, userId) => {
    return await Review.findAll({
        where: {
             [idFieldName]: userId
        }
    });
};

const findReviewByRideId = async (rideId) => {
    return await Review.findOne({
        where: {
            rideId
        }
    });
};

const updateReview = async (id, comment, hygieneRating, roadSafetyRating, professionalismRating, averageRating) => {
    return await Review.update({
        comment,
        hygieneRating,
        roadSafetyRating,
        professionalismRating,
        averageRating
    },
    {
        where: {
            id
        }
    });
};

const destroyReview = async (id) => {
    return await Review.destroy({
        where: {
            id
        }
    });
};

export {
    createReview,
    findReviewById,
    findReviewsByUserId,
    updateReview,
    findReviewByRideId,
    destroyReview
};
