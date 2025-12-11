// export const getTools = async (req, res, next) => {};

export const getTools = async (req, res) => {
  const { page = 1, limit = 10, category, search } = req.query;

  const query = {};

  // 🔹 Пошук
  if (search) {
    query.name = { $regex: search, $options: 'i' };
  }

  // 🔹 Фільтрація за категоріями
  if (category) {
    const categories = category.split(',');
    query.category = { $in: categories };
  }

  const skip = (page - 1) * limit;

  const [items, total] = await Promise.all([
    Tool.find(query).skip(skip).limit(Number(limit)),
    Tool.countDocuments(query),
  ]);

  res.json({
    page: Number(page),
    limit: Number(limit),
    total,
    pages: Math.ceil(total / limit),
    items,
  });
};

export const getToolById = async (req, res, next) => {};
export const createTool = async (req, res, next) => {};
export const updateTool = async (req, res, next) => {};
export const deleteTool = async (req, res, next) => {};
