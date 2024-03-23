require('dotenv').config();
const Sib = require('sib-api-v3-sdk');

exports.forgotPassword = async (req, res, next) => {
    const { emailId } = req.body;
    const client = Sib.ApiClient.instance;
    const apiKey = client.authentications['api-key'];
    apiKey.apiKey = process.env.BREVO_SMTP_KEY

    const tranEmailApi = new Sib.TransactionalEmailsApi();

    const sender = {
        email: 'korshantanu@gmail.com',
        name: 'Shantanu Nitin Kor'
    }

    const receivers = [
        {
            email: emailId,
        }
    ];

    try {
        const email = await tranEmailApi.sendTransacEmail({
            sender,
            to: receivers,
            subject: 'Reset your password',
            textContent: `Reset your password for Daily Expense Tracker`
        })
        console.log(email);
        res.json({
            success: true,
            message: "Email sent successfully"
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            success: false,
            message: err
        })
    }
};