// controllers/stock.controller.js

// Dummy database example (you'll replace this with real DB logic)
let stocks = [];

export const createStock = (req, res) => {
  const stock = req.body;
  stocks.push(stock);
  res.status(201).json({ message: "Stock created", stock });
};

export const getAllStock = (req, res) => {
  res.status(200).json({ stocks });
};

export const getSingleStock = (req, res) => {
  const { id } = req.params;
  const stock = stocks.find((s) => s.id === id);
  if (!stock) {
    return res.status(404).json({ message: "Stock not found" });
  }
  res.status(200).json({ stock });
};

export const updateStock = (req, res) => {
  const { id } = req.params;
  const index = stocks.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Stock not found" });
  }
  stocks[index] = { ...stocks[index], ...req.body };
  res.status(200).json({ message: "Stock updated", stock: stocks[index] });
};

export const deleteStock = (req, res) => {
  const { id } = req.params;
  const index = stocks.findIndex((s) => s.id === id);
  if (index === -1) {
    return res.status(404).json({ message: "Stock not found" });
  }
  const deleted = stocks.splice(index, 1);
  res.status(200).json({ message: "Stock deleted", stock: deleted[0] });
};
