const userObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "TestOne",
    email: "test@testOne.com",
    phone: "0606654654",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const dupUserObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "TestOne",
    email: "test@testOne",
    phone: "0606654654",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const dupMailObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "TestTwo",
    email: "test@testOne.com",
    phone: "0606654654",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};


const dupPhoneObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "TestTwo",
    email: "test@testTwo.com",
    phone: "0606654654",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const invalidMailObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "TestTwo",
    email: "test",
    phone: "0606654654",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const invalidPhoneObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "TestTwo",
    email: "test@test.com",
    phone: "dqsmdlqùsdlùqdl",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const missingUserNameObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "",
    email: "test@test.com",
    phone: "dqsmdlqùsdlùqdl",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const missingPhoneObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "dqsdqdsqs",
    email: "test@test.com",
    phone: "",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const missingEmailObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "dqsdqdsqs",
    email: "",
    phone: "0606060606",
    password: "test",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const missingPasswordObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "dqsdqdsqs",
    email: "test@test.com",
    phone: "0606060606",
    password: "",
    confirmPassword: "test",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

const differentPasswordObject = {
    location: "TestOne",
    name: "TestOne",
    firstName: "TestOne",
    userName: "dqsdqdsqs",
    email: "test@test.com",
    phone: "0606060606",
    password: "test",
    confirmPassword: "testssssssss",
    creationDate: new Date().toUTCString(),
    lastConnection: new Date().toUTCString()
};

export {
    userObject,
    dupUserObject,
    dupMailObject,
    dupPhoneObject,
    invalidMailObject,
    invalidPhoneObject,
    missingUserNameObject,
    missingPhoneObject,
    missingEmailObject,
    missingPasswordObject,
    differentPasswordObject,
};
