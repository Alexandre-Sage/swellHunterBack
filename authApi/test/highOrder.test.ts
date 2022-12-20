import "mocha";
import mongoose from "mongoose";
import { User, UserSchema } from "../../mongoDb/user/users";
import signUpTest from "./signUp/sucess/signUpSucess.test";
import dupEmailErrorTest from "./signUp/errors/dupEmail.test"
import dupUserNameErrorTest from "./signUp/errors/dupUsername.test";
import dupPhoneErrorTest from "./signUp/errors/dupPhone.test";
import invalidEmailErrorTest from "./signUp/errors/invalidMail.test";
import invalidPhoneErrorTest from "./signUp/errors/invalidPhone.test";
import missingEmailErrorTest from "./signUp/errors/missingEmail.test";
import missingPasswordErrorTest from "./signUp/errors/missingPassword.test";
import missingPhoneErrorTest from "./signUp/errors/missingPhone.test";
import missingUserNameErrorTest from "./signUp/errors/missingUserName.test";
import passwordConfirmationErrorTest from "./signUp/errors/passwordConfirmationError.test";
import loginSucessTest from "./loginOld/sucess/loginSucess.test";
import loginMissingEmailErrorTest from "./loginOld/error/emptyEmail.test";
import loginMissingPasswordErrorTest from "./loginOld/error/emptyPassword.test";
import loginInvalidEmailErrorTest from "./loginOld/error/invalidEmail.test";
import logInWrongEmailErrorTest from "./loginOld/error/wrongEmail.test";
import logInWrongPassworeErrorTest from "./loginOld/error/wrongPassword.test";
const db = mongoose.createConnection(`${process.env.MONGO_ATLAS}`, {
    autoIndex: true,
});
db.model("User", UserSchema);
//console.log(db)
describe("################################## AUTH API TEST SUITE ##################################", async function () {
    before(async () => {
        console.log("before")
        try {
            await db.models.User.deleteMany()
        } catch (error) {
            throw error
        };
    });
    describe("I) SIGN UP ROUTES TEST SUITE", function () {
        require("./signUp/sucess/signUpSucess.test")
        dupUserNameErrorTest();
        missingUserNameErrorTest();
        invalidEmailErrorTest();
        missingEmailErrorTest();
        dupEmailErrorTest();
        dupPhoneErrorTest();
        invalidPhoneErrorTest();
        missingPhoneErrorTest();
        missingPasswordErrorTest();
        passwordConfirmationErrorTest();
    });
    describe("II) LOG IN ROUTES TEST SUITE", function () {
        loginSucessTest();
        loginMissingPasswordErrorTest();
        logInWrongPassworeErrorTest()
        loginMissingEmailErrorTest();
        loginInvalidEmailErrorTest();
        logInWrongEmailErrorTest();
    });
});