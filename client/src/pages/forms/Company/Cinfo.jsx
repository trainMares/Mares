import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';
import PersonIcon from '@mui/icons-material/Person';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';
import { Box } from '@mui/material';

const Cinfo = () => {
    const { handleLoading } = useSystemContext()
    const { user, updateUser } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        companyName: '',
        companyField: '',
        phoneNumber: '',
        companyAddress: '',
        city: '',
        commercialRegistrationNumber: '',
        companySector: '',
        descriptionCompany: '',
        companyImage: '',
        facebook: '',
        twitter: '',
        instagram: '',
        linkedIn: '',
    });
    React.useEffect(() => {
        if (user && isLoading) {
            const fd = { ...formData };
            for (const key in fd) {
                const val = user[key]?? "";
                console.log(key, val)
                fd[key] = val;
            }
            setFormData(fd);
            setIsLoading(false)
            handleLoading(false)
        }
    }, [formData, handleLoading, isLoading, user]);

    if (isLoading) {
        handleLoading(true);
    }


    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSave = () => {
        updateUser(formData, user._id, user.role);
    }

    return (
        <div style={{maxWidth:"100vw !imaportant"}}>
            <CompanyHeader />
            <Box maxWidth={1} height={"100vh"} sx={{ overflowY: "auto" }} flexDirection={"column"} justifyContent={'center'} p={2}>

                <Grid container direction="column" justifyContent="center" alignItems="center" style={{ height: '135%', width:"90vw" }}>

                    <h2 >معلومات الشركة </h2>

                    <h3 >معلومات عامة </h3>

                    <TextField
                        margin="normal"
                        required
                        name="companyName"
                        label={"اسم الشركة"}
                        value={formData.companyName}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <PersonIcon />
                            ),
                        }}
                        style={{ width: '50%' }}
                    />
                    <TextField
                        margin="normal"
                        required
                        name="companyField"
                        label={"مجال الشركة"}
                        value={formData.companyField}
                        onChange={handleChange}

                        style={{ width: '50%' }}
                    />



                    <TextField
                        margin="normal"
                        name="phoneNumber"
                        label={"رقم الهاتف"}
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <PhoneIcon />
                            ),
                        }}
                        style={{ width: '50%' }}
                    />



                    <h3 >موقع الشركة </h3>

                    <TextField
                        margin="normal"
                        name="companyAddress"
                        label={"عنوان الشركة"}
                        value={formData.companyAddress}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <LocationOnIcon />
                            ),
                        }}
                        style={{ width: '50%', }}
                    />



                    <TextField
                        margin="normal"
                        name="city"
                        label={"المدينة"}
                        value={formData.city}
                        onChange={handleChange}
                        InputProps={{
                            startAdornment: (
                                <LocationCityIcon />
                            ),
                        }}
                        style={{ width: '50%', }}
                    />



                    <TextField
                        margin="normal"
                        name="commercialRegistrationNumber"
                        label={"السجل التجاري"}
                        value={formData.commercialRegistrationNumber}
                        onChange={handleChange}

                        style={{ width: '50%', }}
                    />
                    <h3 >حول العمل</h3>
                    <TextField
                        margin="normal"
                        name="companySector"
                        label={"قطاع الشركة"}
                        value={formData.companySector}
                        onChange={handleChange}

                        style={{ width: '50%', }}
                    />

                    <h4>عن الشركة </h4>
                    <TextareaAutosize
                        aria-label="self-description"
                        placeholder="اكتب وصفًا عن الشركة..."
                        name="descriptionCompany"
                        value={formData.descriptionCompany}
                        onChange={handleChange}
                        style={{ width: '50%', minHeight: '100px', marginBottom: '20px' }}
                    />



                    <h4>صور من بيئة العمل</h4>
                    <Button
                        variant="contained"
                        component="label"
                        startIcon={<CloudUploadIcon />}
                        style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', backgroundColor: 'mediumaquamarine' }}
                    >
                        <input
                            type="file"
                            hidden
                            name="companyImage"
                            onChange={handleChange}
                        />
                    </Button>
                    <h3 >وسائل التواصل الإجتماعي</h3>

                    <TextField
                        margin="normal"
                        name="facebook"
                        label={"فيسبوك"}
                        value={formData.facebook}
                        onChange={handleChange}

                        style={{ width: '30%', }}
                    />


                    <TextField
                        margin="normal"
                        name="twitter"
                        label={"تويتر"}
                        value={formData.twitter}
                        onChange={handleChange}

                        style={{ width: '30%', }}
                    />


                    <TextField
                        margin="normal"
                        name="instagram"
                        label={"انستقرام"}
                        value={formData.instagram}
                        onChange={handleChange}

                        style={{ width: '30%', }}
                    />

                    <TextField
                        margin="normal"
                        name="linkedIn"
                        label={"لينكد ان"}
                        value={formData.linkedIn}
                        onChange={handleChange}
                        style={{ width: '30%', }}
                    />

                </Grid>
                <div style={{ textAlign: "center"}}>

                <Button

                    onClick={handleSave}
                    type="submit"
                    sx={{ mt: 3, mb: 2 }}
                    style={{ backgroundColor: 'mediumaquamarine', color: 'black', width: '50%' }}
                >
                    <span> حفظ</span>

                </Button>
                </div>

            </Box>

        </div>
    );
};

export default Cinfo;


