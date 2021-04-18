const express = require('express');
const router = express.Router();
const professionsControllers = require("../controllers/professionsControllers")


router.post('/addProfession',professionsControllers.addProfession);
router.get('/getProfessions',professionsControllers.getProfessions);
router.put('/updateImageandServices/:id',professionsControllers.updateImgandService)
// router.put('/updateService/:id',professionsControllers.updateService)
router.delete('/:id',professionsControllers.deleteService)
router.get('/:profession',professionsControllers.getImage)



module.exports = router;