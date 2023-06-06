const generationService = require('./service');

module.exports = {
  async addGeneration(req, res) {
    const { name, phase } = req.body;
    const newGeneration = await generationService.addGeneration({
      name,
      phase,
    });
    res.status(201).json(newGeneration);
  },

  async getGenerations(req, res) {
    const { keyword } = req.params;
    const { page, size } = req.query;
    const generations = await generationService.getGeneraions(
      page,
      size,
      keyword
    );
    res.status(200).json(generations);
  },

  async setGeneration(req, res) {
    const { id } = req.params;
    const { name, phase } = req.body;
    const toUpdate = {
      ...(name && { name }),
      ...(phase && { phase }),
    };
    const updatedResult = await generationService.setGeneration(id, toUpdate);
    res.status(200).json(updatedResult);
  },

  async deleteGeneration(req, res) {
    const { id } = req.params;
    const deletedResult = await generationService.deleteGeneration(id);
    res.status(200).json(deletedResult);
  },
};
