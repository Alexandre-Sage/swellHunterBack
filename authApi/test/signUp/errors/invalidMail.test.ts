import chai,{ expect } from "chai";
import server from "../../../server";
import { invalidMailObject } from "../signUpAssets";


export default function invalidEmailErrorTest() {
    describe("SIGN UP INVALID EMAIL ERROR",function(){
        it("Should handle posted sign up from and send invalid email error", async () => {
            const agent = chai.request.agent(server);
            const responseMessage=process.env.NODE_ENV==="developpment"?"ADD MONGO DOCUMENT ERROR SWITCH":"The provided email is incorrect";
            const contentType='application/json; charset=utf-8';
            const contentLength= process.env.NODE_ENV==="developpment"?'58':'58';
            try {
                const response = await agent.post("/auth/signUp").send(invalidMailObject)
                const { header, body, clientError,serverError }=response;
                expect(clientError).to.be.eql(true);
                expect(serverError).to.be.eql(false);
                expect(response).to.have.property("status").eql(400);
                expect(body).to.have.property("message").eql(responseMessage);
                expect(header).to.have.property('content-type') .eql(contentType);
                expect(header).to.have.property('content-length').eql(contentLength);
                expect(header).to.have.property('access-control-allow-credentials').eql("true");
            } catch (error: any) {
                console.log(error)
                throw error
            };
        });
    });
};
    


