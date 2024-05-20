import express from 'express';
const router = express.Router();

import { signinCompany, signupCompany , testCompany ,resetPassword,
    updateCompany ,deleteAccount, ViewProfile, SelectStudents } from '../controllers/companyController.js';

router.post('/sign-in',signinCompany );
router.post('/sign-up', signupCompany);
router.get('/testCompany', testCompany);
router.post("/reset-password", resetPassword);
router.patch('/:id', updateCompany);//CreateProfile/updateProfile
router.post('/delete-account', deleteAccount);
router.get('/view-profile', ViewProfile);
router.post('/select-students', SelectStudents);

export default router;
