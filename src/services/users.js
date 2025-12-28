import createHttpError from 'http-errors';
import { User } from '../models/user.js';
import { Tool } from '../models/tool.js';

// Отримую інформації про поточного користувача (приватний)

export const getCurrentUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};

// Отримую публічну інформацію про користувача за ID

export const getUserByIdService = async (userId) => {
  const user = await User.findById(userId).select(
    'username name avatar email createdAt',
  );

  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  return user;
};

// Отримую список інструментів, опублікованих користувачем

export const getUserToolsService = async (userId, options = {}) => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;

  // Перевірка чи існує користувач
  const user = await User.findById(userId);
  if (!user) {
    throw createHttpError(404, 'User not found');
  }

  const skip = (page - 1) * limit;
  const sortOptions = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };

  // Отримую інструменти користувача з пагінацією

  const tools = await Tool.find({ owner: userId })
    .select('-bookedDates') // Приховуємо заброньовані дати для безпеки
    .populate('category', 'name')
    .populate('owner', 'username avatar email')
    .sort(sortOptions)
    .skip(skip)
    .limit(limit);

  // Підраховую загальну кількість інструментів

  const totalTools = await Tool.countDocuments({ owner: userId });

  return {
    tools,
    pagination: {
      page,
      limit,
      totalPages: Math.ceil(totalTools / limit),
      totalTools,
    },
  };
};
