import Salary from "../models/Salary.js";
import Employee from "../models/Employee.js"
/** ✅ Add Salary Record */
const addSalary = async (req, res) => {
  try {
    const { employeeId, basicSalary, allowances, deductions, payDate } = req.body;

    // Convert all to numbers safely
    const base = parseFloat(basicSalary) || 0;
    const allow = parseFloat(allowances) || 0;
    const deduct = parseFloat(deductions) || 0;

    const totalSalary = base + allow - deduct;

    const newSalary = new Salary({
      employeeId,
      basicSalary: base,
      allowances: allow,
      deductions: deduct,
      netSalary: totalSalary,
      payDate
    });

    await newSalary.save();

    return res.status(200).json({ success: true, message: "Salary added successfully" });
  } catch (error) {
    console.error("❌ Error adding salary:", error.message);
    return res.status(500).json({ success: false, error: "Server error while adding salary" });
  }
};

/** ✅ Get All Salary Records of an Employee */
const getSalary = async (req, res) => {
  try {
    const { id } = req.params;
    let salary
    salary = await Salary.find({ employeeId: id }).populate('employeeId', 'employeeId');
    if(!salary || salary.length < 1){
      const employee = await Employee.findOne({userId: id})
      salary = await Salary.find({employeeId: employee._id}).populate('employeeId','employeeId')
    }
    return res.status(200).json({ success: true, salary });
  } catch (error) {
    console.error("❌ Error fetching salary:", error.message);
    return res.status(500).json({ success: false, error: "Server error while fetching salary data" });
  }
};

export { addSalary, getSalary };
