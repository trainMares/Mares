import React, { useEffect, useState } from 'react';
import CompanyHeader from './CompanyHome/CompanyHeader/CompanyHeader';

import { Box, Typography, Card, CardContent } from '@mui/material';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import ChatIcon from '@mui/icons-material/Chat';
import PublishIcon from '@mui/icons-material/Publish';
import { useSystemContext } from '../../../contexts/SystemContext';
import { useAuthContext } from '../../../contexts/AuthContext';

function viewCard(company) {
  const { companyName, descriptionCompany, socialMedia, comment, image } = company;
  return (

    <Card style={{ fontFamily: 'Tajawal, sans-serif', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>



      <div style={{ flex: 1, textAlign: 'left', padding: '1rem' }}>
        <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', margin: '10px' }}>
          <img src={image} alt="Profile" style={{ width: '100px', height: '100px', borderRadius: '50%' }} />

          <Typography variant="h5" gutterBottom  >
            اسم الشركة {companyName}
          </Typography>
        </Box>

        <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }}>
          <Typography variant="h5" gutterBottom >
            عدد التدريبات التي تم نشرها
            <br></br>
            0
          </Typography>
        </Box>

        <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }}>
          <Typography variant="h5" gutterBottom >
            وسائل التواصل الإجتماعي{socialMedia}
          </Typography>
        </Box>

      </div>

      <div style={{ fontFamily: 'Tajawal, sans-serif', flex: 2, textAlign: "", padding: '1rem' }}>

        <CardContent>
          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }}>
            <Typography variant="h6" gutterBottom >
              <ContactPageIcon color="disabled" style={{ marginLeft: '400px', fontSize: 50 }} />
              <strong>تعريف بالشركة:</strong> {descriptionCompany}
            </Typography>
          </Box>

          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }} >
            <Typography variant="h6" gutterBottom >
              <PublishIcon color="disabled" style={{ marginLeft: '400px', fontSize: 50 }} />
              <strong>العروض التدربية التي تم نشرها:</strong>
            </Typography>
          </Box>

          <Box style={{ flex: 1, textAlign: 'center', padding: '1rem', border: '3px solid #ccc', margin: '50px' }} >
            <Typography variant="h6" gutterBottom >
              <ChatIcon color="disabled" style={{ marginLeft: '400px', fontSize: 50 }} />
              <strong>التعليقات:</strong> {comment}
            </Typography>
          </Box>

        </CardContent>
      </div>
    </Card>

  );
}




export default function ViewCompanyProfile() {
  const { handleLoading } = useSystemContext()
  const { user } = useAuthContext();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (isLoading && user) {
      setIsLoading(false)
      handleLoading(false)
    }
  }, [handleLoading, isLoading, user]);

  if (isLoading) {
    handleLoading(true);
    return <Box></Box>
  }

  return (
    <div>
      <CompanyHeader />
      <Box
        sx={{
          width: '80%',
          margin: 'auto',
          marginTop: '20px',
          marginRight: '300px',
          marginLeft: '400px',
        }}
      >
        <Typography variant="h6" gutterBottom >
          <strong>ملف الشركة</strong>
        </Typography>
        {viewCard(user)}
      </Box>

    </div>
  );
}
