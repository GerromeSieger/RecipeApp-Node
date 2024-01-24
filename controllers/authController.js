import otpGenerator from 'otp-generator';
import {client} from '../app.js';



/** POST: http://localhost:8080/api/generateOTP */
export async function generateOTP(req, res) {
    const { email } = req.body;
    const otp = await otpGenerator.generate(4, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
     // Store the OTP in Redis, with the user's username as the key
     client.set(email, otp);
    res.status(201).send({ code: otp })
}

/** POST: http://localhost:8080/api/verifyOTP */
export async function verifyOTP(req, res) {
    const { otp, email } = req.body;
    // Retrieve the stored OTP from Redis, using the user's username as the key
    const storedOTP = await client.get(email);

    if (storedOTP === otp) {
        // If the OTPs match, delete the stored OTP from Redis
        client.del(email);

        // Send a success response
        res.status(200).send('OTP verified successfully');
    } else {
        // If the OTPs do not match, send an error response
        res.status(400).send('Invalid OTP');
    }
}


// successfully redirect user when OTP is valid
/** GET: http://localhost:8080/api/createResetSession */
export async function createResetSession(req, res) {
    if (req.app.locals.resetSession) {
        return res.status(201).send({ flag: req.app.locals.resetSession })
    }
    return res.status(440).send({ error: "Session expired!" })
}

