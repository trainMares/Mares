import Company from '../models/Company.js';
import sha256 from 'js-sha256';

export const signinCompany = async (req, res) => {
   const { email, password } = req.body;
   console.log("company email:", email);
   try {
      const company = await Company.findOne({ email: email });
      if (!company) {
         return res.status(404).json({ message: 'الحساب غير موجود' });
      }
      const hashedPassword = sha256(password).toString();
      if (hashedPassword !== company.password) {
         return res.status(400).json({ message: 'كلمة المرور غير صحيحة' });
      }
      let jwtoken = company.getJWToken();

      return res.status(200).json({ _id: company._id, email: company.email, role: company.role, jwtoken });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
};

export const signupCompany = async (req, res) => {
   const company = req.body;
   console.log("company", company);
   try {
      const result = await Company.create(company);
      res.status(200).json(result);
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else if (error.code && error.code === 11000) {
         res.status(400).json({ message: 'هذا الحساب مسجل بالفعل' });
      } else {
         res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
};

export const resetPassword = async (req, res) => {
   const { email, newPassword } = req.body;
   try {
      const existingUser = await Company.findOne({ email });
      if (!existingUser)
         return res.status(404).sed("الحساب غير مسجل مسبقا!");

      const result = await Company.update(Company._id, { password: newPassword });//ارجع له
      return res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
   }
   catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حدث خطأ ما!" });
   }
};


export const testCompany = async (req, res) => {
   // const existingUser = await user.find();
   res.json("HELLO");
}

//  Complete Profile

// // update profile

export const updateCompany = async (req, res) => {
   const updateData = req.body;
   const { _id } = req.params;
   console.log('req.body: ', req.body)
   console.log('_id: ', _id)
   Company.findOneAndUpdate(
      _id,
      updateData, // user data to be updated from req.body such as Certificates, CollegeName etc...
      { new: true }, // to return the opdated object
      (err, doc) => { // CallBack function
         if (err) {
            console.log("حدث خظأ ما!");
            return res.status(400).json({ message: 'حدث خطأ من الخادم' });
         } if (!doc) {
            return res.status(404).json({ message: "المستخدم غير موجود" });
         }
         console.log("تم تغيير البيانات بنجاح :", doc);
         res.status(200).json({ message: 'تم التحديث بنجاح' });
      }
   );
};
// // delete profile

export const deleteAccount = async (req, res) => {
   try {
      const result = await Company.deleteOne(Company._id);
      return res.status(200).json({ message: "تم حذف الحساب بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };


};



//   View Company Profile
export const ViewProfile = async (req, res) => {
   try {
      const Company = await Company.findById(req.companyId);
      if (!Company) {
         return res.status(404).json({ message: 'الشركة غير موجودة' });
      }

      return res.status(200).json(Company);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }

}


export const SelectStudents = async (req, res) => {

   const { studentId } = req.body;

   try {
      const existingApplicant = await Applicant.findOne({ studentId });
      if (existingApplicant) {
         return res.status(400).json({ message: 'الطالب مُسجل مسبقا' });
      }

      const newApplicant = new Applicant({ studentId });
      await newApplicant.save();

      return res.status(200).json({ message: 'تمت اضافة الطالب ' });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}