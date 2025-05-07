const EquipmentService = require('../services/EquipmentService');
const EquipmentModel = require('../models/Lens');

jest.mock('../models/Lens');

const equipmentService = new EquipmentService();

describe('equipmentService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllLenses', () => {
    it('deve retornar todos os equipamentos', async () => {
      const mockEquipments = [
        { name: 'Tripé', type: 'Acessório' },
        { name: 'Câmera Canon', type: 'Câmera' },
      ];

      EquipmentModel.find.mockResolvedValue(mockEquipments);

      const result = await equipmentService.getAllLenses();

      expect(result).toEqual(mockEquipments);
      expect(EquipmentModel.find).toHaveBeenCalledTimes(1);
    });
  });
});
