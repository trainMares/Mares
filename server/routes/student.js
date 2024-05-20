import express from 'express';
const router = express.Router();

import { signin, signup, test ,resetPassword,updateStudent,deleteStudent,
    ViewProfile,FilterTheOpp, SearchForTheOpp,RegistrationInTheOpp,
     DiscoverLocation,ViewRequest} from '../controllers/studentController.js';
router.post('/sign-in', signin);
router.post('/sign-up', signup);
router.get('/test', test);
router.post('/reset-password', resetPassword);
router.patch('/:id', updateStudent);
router.get('/delete', deleteStudent);
router.post('/view-profile', ViewProfile);
router.post('/filter-the-opp', FilterTheOpp);
router.post('/search-for-the-opp', SearchForTheOpp);
router.post('/registration-in-the-Opp', RegistrationInTheOpp);
router.post('/discover-location', DiscoverLocation);
router.post('/view-request', ViewRequest);





export default router;
