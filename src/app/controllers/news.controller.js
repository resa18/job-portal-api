const axios = require("axios");

exports.getNews = async (req, res) => {
  try {
    const { page, description, location, full_time } = req.query;

    const apiUrl =
      "https://dev6.dansmultipro.com/api/recruitment/positions.json";
    const queryParams = {};

    if (page !== null && page !== undefined) {
      queryParams.page = page;
    }

    if (description !== null && description !== undefined) {
      queryParams.description = description;
    }

    if (location !== null && location !== undefined) {
      queryParams.location = location;
    }

    if (full_time !== null && full_time !== undefined) {
      queryParams.full_time = full_time;
    }

    const response = await axios.get(apiUrl, { params: queryParams });

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

exports.getDetailNews = async (req, res) => {
  try {
    const newsId = req.query.id;
    const apiUrl = `https://dev6.dansmultipro.com/api/recruitment/positions/${newsId}`;
    const response = await axios.get(apiUrl);

    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
