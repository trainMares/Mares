import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import EventIcon from '@mui/icons-material/Event';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import Button from '@mui/material/Button';
import { useSystemContext } from '../../../../contexts/SystemContext';
import { useAuthContext } from '../../../../contexts/AuthContext';

const Test = () => {
    const { handleLoading } = useSystemContext()
    const { user, updateUser } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        phoneNumber: '',
        dateOfBirth: '',
        city: ''
    });
    React.useEffect(() => {
        if (user && isLoading) {
            const fd = { ...formData };
            for (const key in fd) {
                const val = user[key]?? "";
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

    const handleSave = async () => {
        updateUser(formData, user._id, "student")
    };

    return (
        <Grid container direction="column" justifyContent="flex-start" alignItems="center" style={{ height: '100vh' }}>
            <h3 >المعلومات الشخصية</h3>
            <TextField
                margin="normal"
                required
                name="firstName"
                label= {<span style={{ fontFamily: 'Tajawal, sans-serif',fontWeight: 'bold'}}> الإسم الأول </span>}
                value={formData.firstName}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <PersonIcon />
                    ),
                }}
                style={{ width: '50%' }} 
            />
            <br />
            <TextField
                margin="normal"
                required
                name="lastName"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif',fontWeight: 'bold'}}> الإسم الأخير </span>}
                value={formData.lastName}
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
                name="phoneNumber"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif',fontWeight: 'bold'}}>رقم الهاتف  </span>}
                value={formData.phoneNumber}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <PhoneIcon />
                    ),
                }}
                style={{ width: '50%' }} 
            />
            <TextField
                margin="normal"
                name="dateOfBirth"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif',fontWeight: 'bold'}}>تاريخ الميلاد  </span>}
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <EventIcon />
                    ),
                }}
                style={{ width: '50%' ,fontWeight: 'bold'}} 
            />
            <TextField
                margin="normal"
                name="city"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif',fontWeight: 'bold'}}> المدينة </span>}
                value={formData.city}
                onChange={handleChange}
                InputProps={{
                    startAdornment: (
                        <LocationCityIcon />
                    ),
                }}
                style={{ width: '50%',    }} 
            />

<Button
         onClick={handleSave}
        type="submit"
      
        sx={{ mt: 3, mb: 2 }}
        style={{ backgroundColor: 'mediumaquamarine', color: 'black' , width: '50%'}}
      >
      <span> حفظ</span> 
  
      </Button  >
            
        </Grid>
    );
};

export default Test;

