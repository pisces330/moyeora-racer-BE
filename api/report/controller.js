const reportService = require('./service');

module.exports = {
  async addReport(req, res) {
    const { type, target_id, content } = req.body;
    const fromUserId = req.currentId;
    res.status(201).json(
      await reportService.addReport({
        type,
        from_user_id: fromUserId,
        target_id,
        content,
      })
    );
  },

  async getReports(req, res) {
    const { page, size, keyword } = req.query;
    res.status(200).json(await reportService.getReports(page, size, keyword));
  },

  async getDetailReport(req, res) {
    const { id, type } = req.params;
    res.status(200).json(await reportService.getDetailReport(id, type));
  },

  async setReport(req, res) {
    const { id, status } = req.params;
    res.status(200).json(await reportService.setReport(id, status));
  },

  async deleteReport(req, res) {
    const { id } = req.params;
    res.status(200).json(await reportService.deleteReport(id));
  },
};
