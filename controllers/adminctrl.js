const doctorModel=require('../models/doctorModel')
const usermodel=require('../models/usermodels')

const getAllUsersController=async(req,res)=>{
     try{
         const users=await usermodel.find({})
         res.status(200).send({
            success:true,
            message:'users data list',
            data: users
         })
     }
     catch(error){
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error while fetching users',
        })
     }

}

const getAllDoctorsController=async(req,res)=>{
    try{
        const doctors=await doctorModel.find({})
        res.status(200).send({
           success:true,
           message:'doctors data list',
           data: doctors
        })
    }
    catch(error){
       console.log(error)
       res.status(500).send({
           success: false,
           message: 'error while fetching doctors',
       })
    }
}

// doctor account status
const changeAccountStatusController = async (req, res) => {
    try {
      const { doctorId, status } = req.body;
      const doctor = await doctorModel.findByIdAndUpdate(doctorId, { status });
      const user = await usermodel.findOne({ _id: doctor.userId });
      const notification = user.notification;
      notification.push({
        type: "doctor-account-request-updated",
        message: `Your Doctor Account Request has ${status} `,
        onClickPath: "/notification",
      });
      user.isDoctor= (status === "approved" )? true : false;
      console.log(user);
      await user.save();
      res.status(201).send({
        success: true,
        message: "Account Status Updated",
        data: doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Eror in Account Status",
        error,
      });
    }
  }


module.exports={getAllDoctorsController,getAllUsersController,changeAccountStatusController}