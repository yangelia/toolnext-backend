import { Feedback } from '../models/feedback.js';
import { Tool } from '../models/tool.js';
import { User } from '../models/user.js';

export const updateToolAverageRating = async (toolId) => {
  const stats = await Feedback.aggregate([
        {
            $match: { toolId: toolId }
        },
        {
            $group: {
                _id: '$toolId',
                averageRating: { $avg: '$rating' },
            }
        },
    ]);

    let averageRating = 0;

    if (stats.length > 0) {
        averageRating = stats[0].averageRating;
    }

    await Tool.findByIdAndUpdate(toolId, {
        averageRating: averageRating
    });
};

export const updateUserAverageRating = async (userId) => {
    const stats = await Tool.aggregate([
        {
            $match: { owner: userId }
        },
        {
            $group: {
                _id: '$owner',
                totalAverageRating: { $avg: '$averageRating' }
            }
        }
    ]);

    let totalAverageRating = 0;

    if (stats.length > 0) {
        totalAverageRating = stats[0].totalAverageRating;
    }

    await User.findByIdAndUpdate(userId, {
        averageRating: totalAverageRating
    });
};
