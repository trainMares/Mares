import React from 'react';
import StudentHeader from './StudentHome/StudentHeader/StudentHeader';
import { Box, Typography, Card, CardContent } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import AssessmentIcon from '@mui/icons-material/Assessment';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';


function viewCard(student) {
  const { firstName, lastName, discription, experiences, skills, image } = student;
  return (

    <Card style={{ fontFamily: 'Tajawal, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>


      <div style={{ flex: 1, textAlign: 'left', padding: '1rem' }}>
        <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', margin: '10px' }}>
          <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

          <Typography variant="h5" gutterBottom  >
            {firstName} {lastName}
          </Typography>
        </Box>

        <Box style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
          <Typography variant="h5" gutterBottom >
            الطلبات التي تم إنشائها
            0
          </Typography>
        </Box>

        <Box style={{ flex: 1, textAlign: 'center', padding: '1rem' }}>
          <Typography variant="h5" gutterBottom >
            التدريبات المنتهية
            0
          </Typography>
        </Box>

      </div>

      <div style={{ fontFamily: 'Tajawal, sans-serif', flex: 2, textAlign: "", padding: '1rem' }}>

        <CardContent>
          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }}>
            <Typography variant="h6" gutterBottom >
              <ContactPageIcon color="disabled" style={{ fontSize: 50 }} />
              <strong>الوصف:</strong> {discription}
            </Typography>
          </Box>

          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }}>
            <Typography variant="h6" gutterBottom >
              <AssessmentIcon color="disabled" style={{ marginLeft: '400px', fontSize: 50 }} />
              <strong>الخبرات:</strong>
              {experiences}
            </Typography>
          </Box>

          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }} >
            <Typography variant="h6" gutterBottom >
              <MenuBookIcon color="disabled" style={{ marginLeft: '400px', fontSize: 50 }} />
              <strong>المهارات:</strong> {skills}
            </Typography>
          </Box>

        </CardContent>
      </div>
    </Card>

  );
}

export default function ViewStudentProfile() {
  const { handleLoading } = useSystemContext()
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (user && isLoading) {
      setIsLoading(false)
      handleLoading(false)
    }
  }, [handleLoading, isLoading, user]);

  if (isLoading) {
    handleLoading(true);
  }


  return (
    <div>
      <StudentHeader />
      <Box
        sx={{
          width: '80%',
          marginTop: '20px',
          marginRight: '300px',
          marginLeft: '400px',
          margin: '100px'
        }}
      >
        <Typography variant="h6" gutterBottom >
          <strong>الملف الشخصي</strong>
        </Typography>

        {viewCard(user)}
      </Box>

    </div>
  );
}



