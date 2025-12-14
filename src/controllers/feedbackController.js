import { Feedback } from '../models/feedback.js';
import createHttpError from 'http-errors';
import { updateToolAverageRating, updateUserAverageRating } from '../services/feedback.js';

export const createFeedback = async (req, res, next) => {
  try {
        if (!req.body.toolId) {
            return next(createHttpError(400, "Tool ID is required to create feedback"));
        }

        const feedback = await Feedback.create({
            ...req.body,
            userId: req.user._id,
        });

        await updateToolAverageRating(feedback.toolId);
        await updateUserAverageRating(req.user._id);

        res.status(201).json({
            success: true,
            data: feedback,
        });

    } catch (error) {
        next(error);
    }
};

export const getToolFeedbacks = async (req, res, next) => {
  try {
    const { toolId } = req.params;
    const page = Number(req.query.page) || 1;
    const perPage = Number(req.query.perPage) || 10;

    const skip = (page - 1) * perPage;
    const filter = { toolId: toolId };

    let feedbacksQuery = Feedback.find(filter)
      .sort({ createdAt: -1 });

    const [totalFeedbacks, feedbacks] = await Promise.all([
        feedbacksQuery.clone().countDocuments(),
        feedbacksQuery.skip(skip).limit(perPage),
    ]);

    const totalPages = Math.ceil(totalFeedbacks / perPage);

    res.status(200).json({
        page,
        perPage,
        totalFeedbacks,
        totalPages,
        feedbacks,
    });
  } catch (error) {
      next(error);
  }
};

export const deleteFeedback = async (req, res, next) => {
    try {
      const { feedbackId } = req.params;

      const feedback = await Feedback.findOneAndDelete({
          _id: feedbackId,
          userId: req.user._id,
      });

      if (!feedback) {
          return next(createHttpError(404, 'Feedback not found or access denied'));
      }

      await updateToolAverageRating(feedback.toolId);
      await updateUserAverageRating(feedback.userId);

      res.status(204).end();
    } catch (error) {
        next(error);
    }
};
