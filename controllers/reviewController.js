import { createReview, findReviewById, findReviewsByUserId, updateReview,findReviewByRideId, destroyReview } from '../helpers/reviewHelper';
import { findDriversByCooperativeId, findUserBy, findUserByRoleAndId, updateRating } from '../helpers/userHelper';

const saveReview = async (req, res) => {
    const { comment, hygieneRating, roadSafetyRating, professionalismRating, rideId } = req.body;
    const commuterId = req.user.id;
    const { driverId } = req.rideExists;
    const averageRating = (Number(hygieneRating) + Number(roadSafetyRating) + Number(professionalismRating))/3;
    try {
        const reviewExists = await findReviewByRideId(rideId);
        if (reviewExists) {
            return res.status(403).json({
                status: 403,
                error: 'Sorry! Cannot review this ride twice.'
            });
        }
        const savedReview = await createReview(comment,hygieneRating,roadSafetyRating,professionalismRating,averageRating,rideId,commuterId,driverId);
        const driverDetails = await findUserBy('id', driverId);
        const updateDriverRating = await updateRating({
            reviewCount: driverDetails.reviewCount+1,
            cummulativeRating: driverDetails.cummulativeRating+averageRating,
            driverId
        });
        return res.status(201).json({
            status: 201,
            message: 'Review saved successfuly',
            data: savedReview
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const editReview = async (req, res) => {
    const { comment, hygieneRating, roadSafetyRating, professionalismRating } = req.body;
    const url = req.originalUrl;
    const reviewId = url.split('/')[3];
    const reviewExists = await findReviewById(reviewId);
    if (!reviewExists) {
        return res.status(404).json({
            status: 404,
            error: 'Sorry! review not found'
        });
    }
    try {
        const averageRating = (Number(hygieneRating) + Number(roadSafetyRating) + Number(professionalismRating))/3;
        const updatedReview = await updateReview(reviewId, comment, hygieneRating, roadSafetyRating, professionalismRating, averageRating);
        const { driverId } = req.rideExists;
        const driverDetails = await findUserBy('id', driverId);
        const updateDriverRating = await updateRating({
            reviewCount: driverDetails.reviewCount,
            cummulativeRating: driverDetails.cummulativeRating - reviewExists.averageRating + averageRating,
            driverId
        });
        return res.status(201).json({
            status: 201,
            message: 'Review successfuly updated.',
            data: updatedReview
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const deleteReview = async (req, res) => {
    const { id } = req.params;
    const reviewExists = await findReviewById(id);
    if (!reviewExists) {
        return res.status(404).json({
            status: 404,
            error: 'Sorry! review not found'
        });
    }
    try {
        const deletedReview = await destroyReview(id);
        return res.status(201).json({
            status: 201,
            message: 'Review successfuly deleted.',
            data: deletedReview
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewReviews = async (req, res) => {
    try {
        const { role, id, cooperativeId } = req.user;
        let reviews;
        if (role === 'COMMUTER' || role === 'DRIVER') {
            const fieldName = role.toLowerCase() + 'Id';
            reviews = await findReviewsByUserId(fieldName, id);
            if (reviews.length) {
                return res.status(200).json({
                    status: 200,
                    message: 'Successful retrieval!',
                    data: reviews
                });
            }
            return res.status(404).json({
                status: 404,
                error: 'No reviews were found'
            });
        }
        const allDrivers = await findDriversByCooperativeId(cooperativeId);
        const idArray = allDrivers.map(x => x.id);
        reviews = await findReviewsByUserId('driverId', idArray);
        return res.status(200).json({
            status: 200,
            message: 'Successful retrieval!',
            data: reviews
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewSingleReview = async (req, res) => {
    const { id } = req.params;
    try {
        const foundReview = await findReviewById(id);
        if (foundReview) {
            return res.status(200).json({
                status: 200,
                message: 'Review successfuly found',
                data: foundReview
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'Review not found'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

const viewDriverReviews = async (req, res) => {
    const { id } = req.params;
    try {
        const driverExists = await findUserByRoleAndId('DRIVER', id);
        if (!driverExists) {
            return res.status(404).json({
                status: 404,
                error: 'Driver not found'
            });
        }
        const reviews = await findReviewsByUserId('driverId', id);
        if (reviews.length) {
            return res.status(200).json({
                status: 200,
                message: 'Reviews were found successfuly',
                data: reviews
            });
        }
        return res.status(404).json({
            status: 404,
            error: 'The driver has not received any reviews yet'
        });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            error: 'Server error!'
        });
    }
};

export {
    saveReview,
    editReview,
    viewReviews,
    deleteReview,
    viewSingleReview,
    viewDriverReviews
};
