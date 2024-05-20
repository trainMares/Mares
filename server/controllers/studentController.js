import Student from '../models/Student.js';
import sha256 from 'js-sha256';

export const signin = async (req, res) => {
   const { email, password } = req.body;
   try {
      const student = await Student.findOne({ email: email });
      if (!student) {
         return res.status(404).json({ message: 'الحساب غير موجود' });
      }
      const hashedPassword = sha256(password).toString();
      if (hashedPassword !== student.password) {
         return res.status(400).json({ message: 'خطأ في كلمة المرور' });
      }
      let jwtoken = student.getJWToken();

      return res.status(200).json({ _id: student._id, email: student.email, role: student.role, jwtoken });
   } catch (error) {
      console.log(error.message);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
}
// // Signup

export const signup = async (req, res) => {
   const student = req.body;
   console.log("student", student);
   try {
      const result = await Student.create(student);
      res.status(200).json(result);
   } catch (error) {
      if (error.name === 'ValidationError') {
         console.log(error.message)
         res.status(400).json({ message: error.message });
      } else if (error.code && error.code === 11000) {
         res.status(400).json({ message: 'الحساب مسجل مسبقا' });
      } else {
         res.status(500).json({ message: 'خطأ في الاتصال' });
      }
   }
};

export const resetPassword = async (req, res) => {
   const { email, newPassword } = req.body;
   try {
      const existingStudent = await Student.findOne({ email });
      if (!existingStudent)
         return res.status(404).sed("الحساب غير مسجل مسبقا!");

      await Student.update(student._id, { password: newPassword });//ارجع له
      return res.status(200).json({ message: "تم تغيير كلمة المرور بنجاح" });
   }
   catch (error) {
      console.log(error);
      return res.status(500).json({ message: "حدث خطأ ما!" });
   }
};

export const updateStudent = async (req, res) => {
   const updateData = req.body;
   const { _id } = req.params;
   console.log('req.body: ', req.body)
   console.log('_id: ', _id)
   Student.findOneAndUpdate(
      _id,
      updateData,
      { new: true },
      (err, doc) => {
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
export const deleteStudent = async (req, res) => {
   try {

      await Student.deleteOne(student._id);
      return res.status(200).json({ message: "تم حذف الحساب بنجاح" });

   } catch (error) {
      res.status(400).send({ success: false, msg: error.message });
   };


};

export const ViewProfile = async (req, res) => {

   try {
      const student = await student.findById(req.studentId);
      if (!student) {
         return res.status(404).json({ message: 'الشركة غير موجودة' });
      }

      return res.status(200).json(student);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }

};

//   View Student Page
export const ViewStudentPage = async (req, res) => {
   try {
      const student = await student.findById(req.studentId);
      if (!student) {
         return res.status(404).json({ message: 'الشركة غير موجودة' });
      }

      return res.status(200).json(student);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }
};

//   Filter The Opportunities
export const FilterTheOpp = async (req, res) => {
   const { major, numOfStars } = req.query;

   try {
      const evaluationResults = await Evaluation.find({ numOfStars });
      const opportunityIds = evaluationResults.map((evaluation) => evaluation.opportunityId);

      const filteredOpportunities = await Opportunity.find({
         major,
         _id: { $in: opportunityIds },
      });

      return res.status(200).json(filteredOpportunities);
   } catch (error) {
      console.error(error);
      return res.status(500).json({ message: 'خطأ في الإتصال' });
   }

}

//   Search For The Opportunity
export const SearchForTheOpp = async (req, res) => {
   const { query } = req.query;

   try {
      // Perform search based on the query
      const result = await Item.find({ name: { $regex: query, $options: 'i' } }); // Case-insensitive search

      res.json(result);
   } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred while searching.' });
   }
}


//   Registration in the opportunity
export const RegistrationInTheOpp = async (req, res) => {
}

//   Discover Location
export const DiscoverLocation = async (req, res) => {
};

//   View Request
export const ViewRequest = async (req, res) => {
};

export const test = async (req, res) => {
   // const existingStudent = await Student.find();
   res.json("HELLO");
};