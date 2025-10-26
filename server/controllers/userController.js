import userModel from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import razorpay from "razorpay";
import transactionModel from "../models/transactionModel.js";
// Signup / Register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new userModel({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: pass, ...userData } = newUser._doc;

    res.status(201).json({ success: true, token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Signin / Login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User does not exist" });
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    const { password: pass, ...userData } = user._doc;

    // Return token in JSON for Postman testing
    res.status(200).json({ success: true, token, user: userData });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message});
  }
};

// User Credits
export const userCredits = async (req, res) => {
  try {
    const userId = req.userId; // ideally this comes from userAuth middleware
    if (!userId) {
      return res
        .status(401)
        .json({ success: false, message: "Not Authorized" });
    }

    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    res.json({
      success: true,
      credits: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

const razorpayInstance = new razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export const paymentRazorpay = async (req, res) => {
  try {
    
    const userId = req.userId; // Get from auth middleware
    const { planId } = req.body;
    
    if(!userId || !planId){
      return res.status(400).json({ success: false, message: "Missing Details" });
    }
    
    const userData = await userModel.findById(userId);

    let credits, plan, amount, date

    switch(planId){
      case 'Basic':
        plan = 'Basic';
        credits = 100;
        amount = 10; 
        break;
      case 'Advanced':
        plan = 'Advanced';
        credits = 500;
        amount = 50;
        break;
      case 'Business':
        plan = 'Business';
        credits = 5000;
        amount = 250;
        break;
      default:
        return res.status(400).json({ success: false, message: "Invalid Plan" });
    }
    date = Date.now();


    const transactionData = {
      userId: userId.toString(),
      plan,
      credits,
      amount,
      date,
    }
    const newTransaction = await transactionModel.create(transactionData);

    const options = {
      amount: amount * 100,
      currency: process.env.CURRENCY,
      receipt: newTransaction._id,
    }
    
    const order = await razorpayInstance.orders.create(options);
    res.json({success: true, order})

  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const verifyRazorPay = async (req, res)=>{
  try {
    const { razorpay_order_id, razorpay_payment_id } = req.body;
    
    if (!razorpay_order_id || !razorpay_payment_id) {
      return res.status(400).json({ success: false, message: 'Order ID and Payment ID are required' });
    }

    // Fetch the order to get the receipt
    const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id);
    
    if (!orderInfo) {
      return res.status(404).json({ success: false, message: 'Order not found' });
    }

    // Fetch the transaction using receipt from order
    const transactionData = await transactionModel.findById(orderInfo.receipt);
    
    if (!transactionData) {
      return res.status(404).json({ success: false, message: 'Transaction not found' });
    }

    // Check if already processed
    if (transactionData.payment) {
      return res.status(400).json({ success: false, message: 'Payment already processed' });
    }

    // Verify the user matches the transaction
    const currentUserId = req.userId.toString();
    if (currentUserId !== transactionData.userId.toString()) {
      return res.status(403).json({ success: false, message: 'Unauthorized access' });
    }

    // Fetch payment details to verify it's successful
    try {
      const payment = await razorpayInstance.payments.fetch(razorpay_payment_id);
      
      if (payment.status !== 'captured' && payment.status !== 'authorized') {
        return res.status(400).json({ success: false, message: 'Payment not successful' });
      }
    } catch (paymentError) {
      console.error('Payment fetch error:', paymentError);
      return res.status(400).json({ success: false, message: 'Invalid payment ID' });
    }

    const userData = await userModel.findById(transactionData.userId);
    
    if (!userData) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const creditBalance = userData.creditBalance + transactionData.credits;
    await userModel.findByIdAndUpdate(userData._id, { creditBalance });
    await transactionModel.findByIdAndUpdate(transactionData._id, { payment: true });

    res.json({ success: true, message: 'Credits Added', creditBalance });
    
  } catch (error) {
    console.error('Verification Error:', error);
    res.status(500).json({ success: false, message: error.message });
  }
}