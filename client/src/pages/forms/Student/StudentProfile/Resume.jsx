import React, { useState, useEffect } from 'react';
import StudentHeader from '../StudentHome/StudentHeader/StudentHeader';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import { useSystemContext } from '../../../../contexts/SystemContext';
import { useAuthContext } from '../../../../contexts/AuthContext';


const Resume = () => {
    const { handleLoading } = useSystemContext()
    const { user, updateUser } = useAuthContext();
    const [isLoading, setIsLoading] = React.useState(true);

    const [formData, setFormData] = useState({
        description: '',
        cv: null,
        certificates: null,
        college: '',
        major: '',
        graduationDate: '',
        language: '',
        academicLevel: '',
        jobTitle:'',
        companyName:'',
        companyLocation: '',
        typeOfTheJob: '',
        workDescription: '',


        tools: [], // متغير الأدوات
        administrativeSkills: [], // متغير المهارات الإدارية
        technicalSkills: [], // متغير المهارات التقنية
        jobRelatedSkills: [] // متغير المهارات ذات الصلة بالوظيفة

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
  
  
    const [acacademicLevel, setLevels] = useState([]);

    useEffect(() => {
        // Simulated data for levels from 'المستوى الأول' to 'المستوى العاشر'
        const data = [
            { label: 'المستوى الأول' },
            { label: 'المستوى الثاني' },
            { label: 'المستوى الثالث' },
            { label: 'المستوى الرابع' },
            { label: 'المستوى الخامس' },
            { label: 'المستوى السادس' },
            { label: 'المستوى السابع' },
            { label: 'المستوى الثامن' },
            { label: 'المستوى التاسع' },
            { label: 'المستوى العاشر' }
        ];
        setLevels(data);
    }, []);

    const handleChange = (event) => {
        const { name, value, files } = event.target;
        setFormData({ ...formData, [name]: files ? files[0] : value });
    };

    const handleSave = async () => {
        // Code to handle form submission, including file uploads
    };

    const [languages, setLanguages] = useState([]);

    useEffect(() => {
        // هنا يجب عليك استخدام fetch أو axios أو أي آلية لجلب البيانات من الخادم
        // في هذا المثال، سنفترض أنه تم جلب البيانات وتخزينها في متغير languages
        const fetchedLanguages = [
            { label: 'العربية - مبتدئ' },
            { label: 'العربية - متوسط' },
            { label: 'العربية - متقدم' },
            { label: 'الإنجليزية - مبتدئ' },
            { label: 'الإنجليزية - متوسط' },
            { label: 'الإنجليزية - متقدم' },
        ];
        setLanguages(fetchedLanguages);
    }, []); // تم تمرير قيمة فارغة للتأكد من أن هذا الكود يتم تنفيذه مرة واحدة فقط عند تحميل الصفحة





    // المهارات الوظيفية
    // Job Related Skills
    const [jobRelatedSkills, setJobRelatedSkills] = useState([]);

    useEffect(() => {
        // Fetch job-related skills from the server
        fetch('https://api.example.com/job-skills')
            .then(response => response.json())
            .then(data => {
                // Update state with the job-related skills fetched from the server
                setJobRelatedSkills(data);
            })
            .catch(error => {
                console.error('Error fetching job-related skills:', error);
            });
    }, []);

    const jobRelatedSkillsOptions = [
        { label: 'الرسوم البيانية', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'مهارات حسابية', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
        { label: 'إدارة المشاريع', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] }
        // Add more job related skills here if needed
    ];
    
    const jobRelatedSkillsWithOptions = jobRelatedSkillsOptions.flatMap(skill => (
        skill.proficiencyLevels.map(level => ({
            label: `${skill.label} - ${level}`,
            skill: skill.label,
            level: level
        }))
    ));



        //الادوات 
        const [tools, setTools] = useState([]);

        // Define the options for tools with proficiency levels
        const toolsOptions = [
            { label: 'الإكسل', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
            { label: 'الوورد', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
            { label: 'البوربوينت', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
            { label: 'أدوات الاستطلاع', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] }
            // Add more tools here if needed
        ];
    
        // Flatten the options array to include proficiency levels
        const optionsWithLevelstool = toolsOptions.flatMap(tool => (
            tool.proficiencyLevels.map(level => ({
                label: `${tool.label} - ${level}`,
                tool: tool.label,
                level: level
            }))
        ));
    
//المهارات الادارية
const [administrativeSkills, setAdministrativeSkills] = useState([]);

// Define the options for administrative skills with proficiency levels
const administrativeSkillsOptions = [
    { label: 'حس المسؤولية', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
    { label: 'العمل الجماعي', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] },
    { label: 'المرونة في التعلم', proficiencyLevels: ['مبتدئ', 'متوسط', 'متقدم'] }
    // Add more administrative skills here if needed
];

// Flatten the options array to include proficiency levels
const optionsWithLevels = administrativeSkillsOptions.flatMap(skill => (
    skill.proficiencyLevels.map(level => ({
        label: `${skill.label} - ${level}`,
        skill: skill.label,
        level: level
    }))
));

useEffect(() => {
    // Set administrative skills state with the options including proficiency levels
    setAdministrativeSkills(optionsWithLevels);
}, []); // Ensure this effect runs only once on component mount

    return (
        <div style={{ height: '100vh', overflow: 'auto' }}>
            <StudentHeader />
            <Grid container direction="column" justifyContent="flex-start" alignItems="center" style={{ minHeight: '100%' }}>
                <h3 style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px' ,marginTop:'20px'}}>سيرتي الذاتية</h3>
                <h4 style={{marginBottom:'20px'}}>ملخص عني:</h4>
                <TextareaAutosize
                    aria-label="self-description"
                    placeholder="اكتب وصفًا عن نفسك..."
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    style={{ width: '50%', minHeight: '100px', marginBottom: '20px' }}
                />
                <h4 style={{marginBottom:'20px'}}>تحميل السيرة الذاتية:</h4>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', backgroundColor: 'mediumaquamarine' }}
                >
                    <input
                        type="file"
                        hidden
                        name="cv"
                        onChange={handleChange}
                    />
                </Button>
                <h4 style={{marginBottom:'20px'}}>تحميل الشهادات:</h4>

                <Button
                    variant="contained"
                    component="label"
                    startIcon={<CloudUploadIcon />}
                    style={{ fontFamily: 'Tajawal, sans-serif', marginBottom: '20px', backgroundColor: 'mediumaquamarine' }}
                >
                    <input
                        type="file"
                        hidden
                        name="certificates"
                        onChange={handleChange}
                    />
                </Button>
                <h3 style={{marginBottom:'20px'}}>التعليم:</h3>
                <Autocomplete
                    disablePortal
                    id="combo-box-level"
                    options={acacademicLevel}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold'}}> المستوى الدراسي</span>} />}
                    style={{ width: '50%', marginBottom: '20px' }}
                    onChange={(event, value) => setFormData({ ...formData, level: value ? value.label : '' })}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-college"
                    options={[{ label: 'كلية الحاسبات' }]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold' }}> الكلية</span>} />}
                    style={{ width: '50%', marginBottom: '20px' }}
                    onChange={(event, value) => setFormData({ ...formData, college: value ? value.label : '' })}
                />

                <Autocomplete
                    disablePortal
                    id="combo-box-specialization"
                    options={[
                        { label: 'نظم المعلومات' },
                        { label: 'علوم الحاسب الآلي' },
                        { label: 'هندسة علم البرمجيات' },
                        { label: 'هندسة الشبكات والحاسب' },
                        { label: 'الأمن السيبراني' },
                        { label: 'علم البيانات' },
                    ]}
                    sx={{ width: 300 }}
                    renderInput={(params) => <TextField {...params} label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold'}}> التخصص</span>} />}
                    style={{ width: '50%', marginBottom: '20px' }}
                    onChange={(event, value) => setFormData({ ...formData, major: value ? value.label : '' })}
                />

                <TextField
                    id="graduationDate"
                    name="graduationDate"
                    label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold'}}> تاريخ التخرج</span>}
                    type="date"
                    value={formData.graduationDate}
                    onChange={handleChange}
                    style={{ width: '50%', marginBottom: '20px' }}
                    InputLabelProps={{
                        shrink: true,
                    }}
                />

                <Stack spacing={3} sx={{ width: '50%', marginBottom: '20px' }}>
                    <Autocomplete
                        multiple
                        id="tags-outlined"
                        options={languages}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold' }}>اللغة</span>}
                                placeholder="اللغة"
                            />
                        )}
                    />
                </Stack>

                <h3 style={{marginBottom:'20px'}}>المهارات:</h3>


                <Stack spacing={3} sx={{ width: '50%', marginBottom: '20px' }}>
                    <Autocomplete
                        multiple
                        id="technicalSkills"
                        options={[
                            { label: 'تحليل البيانات - مبتدئ' },
                            { label: 'تحليل البيانات - متوسط' },
                            { label: 'تحليل البيانات - متقدم' },
                            { label: 'مهارات حاسوبية - مبتدئ' },
                            { label: 'مهارات حاسوبية - متوسط' },
                            { label: 'مهارات حاسوبية - متقدم' },
                            { label: 'استخدام التكنولوجيا - مبتدئ' },
                            { label: 'استخدام التكنولوجيا - متوسط' },
                            { label: 'استخدام التكنولوجيا - متقدم' },
                            // يمكنك إضافة المزيد من المهارات هنا بنفس النمط
                        ]}
                        getOptionLabel={(option) => option.label}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold'}}>المهارات التقنية</span>}
                                placeholder="المهارات التقنية"
                            />
                        )}
                    />
                </Stack>

                
                <Stack spacing={3} sx={{ width: '50%', marginBottom: '20px' }}>
    <Autocomplete
        multiple
        id="job-skills"
        options={jobRelatedSkillsWithOptions}
        getOptionLabel={(option) => option.label}
        renderInput={(params) => (
            <TextField
                {...params}
                label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight:'bold' }}>المهارات الوظيفية</span>}
                placeholder="المهارات الوظيفية"
            />
        )}
    />
</Stack>



        <Stack spacing={3} sx={{ width: '50%', marginBottom: '20px' }}>
            <Autocomplete
                multiple
                id="tools-skills"
                options={optionsWithLevelstool}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight:'bold' }}>الأدوات والبرامج</span>}
                        placeholder="الأدوات والبرامج"
                    />
                )}
            />
        </Stack>

        <Stack spacing={3} sx={{ width: '50%', marginBottom: '20px' }}>
            <Autocomplete
                multiple
                id="administrative-skills"
                options={administrativeSkills}
                getOptionLabel={(option) => option.label}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={<span style={{ fontFamily: 'Tajawal, sans-serif' , fontWeight:'bold'}}>المهارات الإدارية</span>}
                        placeholder="المهارات الإدارية"
                    />
                )}
            />
        </Stack>

        
                <h3 style={{marginBottom:'20px'}}>الخبرات:</h3>

                <TextField
                margin="normal"
                name="jobTitle"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight:'bold'}}> العنوان الوظيفي </span>}
                value={formData.city}
                style={{ width: '50%', marginBottom: '20px' }}
                onChange={(event, value) => setFormData({ ...formData, jobTitle: value ? value.label : '' })}
                />

                 <TextField
                margin="normal"
                name="companyName"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight:'bold'}}>اسم المؤسسة </span>}
                value={formData.city}
                style={{ width: '50%', marginBottom: '20px' }}
                onChange={(event, value) => setFormData({ ...formData, companyName: value ? value.label : '' })}
                /> 
                <TextField
                margin="normal"
                name="companyLocation"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight:'bold'}}>مكان المؤسسة </span>}
                value={formData.city}
                style={{ width: '50%', marginBottom: '20px' }}
                onChange={(event, value) => setFormData({ ...formData, companyLocation: value ? value.label : '' })}
                /> 

                <TextField
                margin="normal"
                name="typeOfTheJob"
                label={<span style={{ fontFamily: 'Tajawal, sans-serif', fontWeight:'bold'}}>نوع الوظيفة</span>}
                value={formData.city}
                style={{ width: '50%', marginBottom: '20px' }}
                onChange={(event, value) => setFormData({ ...formData, typeOfTheJob: value ? value.label : '' })}
                /> 
                    <h5 style={{marginBottom:'20px'}}>تفاصيل مهام عملك:</h5>
                 <TextareaAutosize
                    aria-label="self-description"
                    placeholder="اكتب تفاصيل مهام عملك ....."
                    name="workDescription"
                    value={formData.workDescription}
                    onChange={handleChange}
                    style={{ width: '50%', minHeight: '100px', marginBottom: '20px' }}
                />
                    <hr className="mt-0 mb-4" />
                   



                <Button
                    onClick={handleSave}
                    variant="contained"
                    style={{ backgroundColor: 'mediumaquamarine', color: 'black', width: '50%', marginBottom: '20px' }}
                >
                    حفظ
                </Button>
            </Grid>
        </div>
    );
};

export default Resume;


