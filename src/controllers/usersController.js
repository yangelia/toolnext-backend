import * as usersService from '../services/users.js';

// GET /api/users/current
// Отримання інформації про поточного користувача (приватний)

export const getCurrentUser = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const user = await usersService.getCurrentUserService(userId);

    res.status(200).json({
      status: 'success',
      message: 'Current user retrieved successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id
// Отримання публічної інформації про користувача (публічний)

export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await usersService.getUserByIdService(id);

    res.status(200).json({
      status: 'success',
      message: 'User retrieved successfully',
      data: {
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

// GET /api/users/:id/tools
// Отримання списку інструментів користувача (публічний)

export const getUserTools = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { page, limit, sortBy, sortOrder } = req.query;

    const result = await usersService.getUserToolsService(id, {
      page: parseInt(page),
      limit: parseInt(limit),
      sortBy,
      sortOrder,
    });

    res.status(200).json({
      status: 'success',
      message: 'User tools retrieved successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
