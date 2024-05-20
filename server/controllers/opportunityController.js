import Student from '../models/Student.js';
import Opportunity from '../models/Opportunity.js';
import StudentRegistration from '../models/StudentRegistration.js';
import { getStudentApplicants } from './applicantController.js';

export const addOpportunity = async (req, res) => {
   const data = req.body;
   try {
      const existingOpportunity = await Opportunity.findOne({ companyId: data.companyId, opportunityName: data.opportunityName });
      console.log('existingOpportunity: ', existingOpportunity);
      if (existingOpportunity) {
         console.log("opportunity dosen't saved")
         return res.status(400).json({ message: "لقد قمت بإضافة هذه الفرصة مسبقا" });
      }
      const opp = await Opportunity.create(data)
      return res.status(200).json({ opp });
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const getAllOpportunities = async (req, res) => {
   try {
      const opp = await Opportunity.find()
         .populate("students companyId");

      return res.status(200).json({ opp });
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         return res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const searchOpportunity = async (req, res) => {
   let { search } = req.query;
   try {
      let match = {};

      if (search) {
         match.$or = [
            { opportunityName: { $regex: `.*${search}.*`, $options: "i" } },
            { duties: { $regex: `.*${search}.*`, $options: "i" } },
            { description: { $regex: `.*${search}.*`, $options: "i" } },
            { city: { $regex: `.*${search}.*`, $options: "i" } },
            { trainingType: { $regex: `.*${search}.*`, $options: "i" } },
         ];
      }

      const opp = await Opportunity.find(match)
         .populate("students companyId");

      return res.status(200).json({ opp });
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         return res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const registerOpportunity = async (req, res) => {
   const { id } = req.query;
   try {
      let user = await Student.findById(req.userId);
      if (!user) {
         return res.status(404).json({ message: "لم يتم العثور على حساب. الرجاء تسجيل الدخول كطالب" })
      }
      if (user.role !== "student") {
         return res.status(400).json({ message: "هذا الحساب غير مسجل كطالب" })
      }
      const opp = await Opportunity.findById(id);
      if (!opp) {
         return res.status(404).json({ message: "لم يتم العثور على فرصة" })
      }
      let alreadyExists = await StudentRegistration.findOne({
         studentId: user._id,
         opportunityId: opp._id,
      })
      if (alreadyExists) {
         return res.status(400).json({ message: "تقدمت بالفعل لهذه الفرصة" })
      }

      let registration = await StudentRegistration.create({
         opportunityId: opp._id,
         studentId: user._id
      });
      opp.students = [...opp.students, user._id];
      await opp.save();

      return res.status(200).json({ data: registration, msg: "تمت إضافة التسجيل" });
   } catch (error) {
      console.log(error.message)
      if (error.name === 'ValidationError') {
         return res.status(400).json({ message: `خطأ في التحقق: ${error.message}` });
      } else {
         return res.status(500).json({ message: 'خطأ في الإتصال' });
      }
   }
}

export const updateOpportunity = async (req, res) => {
   const updateData = req.body;
   const { _id } = req.params;
   console.log('req.body: ', req.body)
   console.log('_id: ', _id)
   Opportunity.findOneAndUpdate(
      _id,
      updateData, // opportunity data to be updated from req.body such as Certificates, CollegeName etc...
      { new: true }, // to return the opdated object
      (err, doc) => { // CallBack function
         if (err) {
            console.log("حدث خظأ ما!");
            return res.status(400).json({ message: 'حدث خطأ من الخادم' });
         } if (!doc) {
            return res.status(404).json({ message: "الفرصة غير موجودة" });
         }
         console.log("تم تغيير البيانات بنجاح :", doc);
         res.status(200).json({ message: 'تم التحديث بنجاح' });
      }
   );
};
// // delete profile

export const deleteOpportunity = async (req, res) => {
   try {
      await Opportunity.deleteOne(Opportunity._id);
      return res.status(200).json({ message: "تم حذف الفرصة بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };
};

export const getOpportunities = async (req, res) => {
   try {
      const data = await Opportunity.findOne();
      return res.status(200).json(data);

   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getCompanyOpportunities = async (req, res) => {
   const { companyId } = req.params;
   try {
      const data = await Opportunity.find({ companyId });
      return res.status(200).json(data);

   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getStudentOpportunities = async (req, res) => {
   try {
      const applicants = await getStudentApplicants(req, res)
      const data = [];
      for (const key in applicants) {
         const applicant = applicants[key];
         data.push(await Opportunity.find({ _id: applicant.opportunityId }));
      }
      return res.status(200).json(data);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const getOpportunity = async (req, res) => {
   const { id } = req.params;
   const { status } = req.query;

   try {
      let registration = await StudentRegistration.find({
         opportunityId: id,
         status
      }).populate("opportunityId studentId")
      console.log(registration);

      return res.status(200).json(registration);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const acceptRegistration = async (req, res) => {
   const { id } = req.query;

   try {
      let registration = await StudentRegistration.findByIdAndUpdate(id, {
         status: "Accepted"
      });

      console.log(registration);

      return res.status(200).json({ msg: "قبلت" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}

export const rejectRegistration = async (req, res) => {
   const { id } = req.query;

   try {
      let registration = await StudentRegistration.findByIdAndUpdate(id, {
         status: "Rejected"
      });

      console.log(registration);

      return res.status(200).json({ msg: "قبلت" });
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}