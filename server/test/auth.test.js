const chai = require("chai");
const chaiHttp = require("chai-http").default;
const mongoose = require("mongoose");
const app = require("../app"); // your main app.js
const User = require("../models/User.model");

// const chaiHttp = require("chai-http");
// chai.use(chaiHttp);

const expect = chai.expect;
chai.use(chaiHttp);

describe("Auth Routes", () => {

  // clean DB before each test
  beforeEach(async () => {
    await User.deleteMany({});
  });

  /*
  ============================
  SIGNUP TESTS
  ============================
  */

  describe("POST /api/auth/signup", () => {

    it("should create a new user", (done) => {
      chai.request(app)
        .post("/api/auth/signup")
        .send({
          email: "test@test.com",
          password: "Password1",
          name: "Test User"
        })
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body).to.have.property("_id");
          expect(res.body.email).to.equal("test@test.com");
          done();
        });
    });

    it("should fail if fields are missing", (done) => {
      chai.request(app)
        .post("/api/auth/signup")
        .send({
          email: "test@test.com"
        })
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res.body).to.have.property("errorMessage");
          done();
        });
    });

    it("should fail if email already exists", async () => {

      await User.create({
        email: "existing@test.com",
        password: "hashedpassword",
        name: "Existing"
      });

      const res = await chai.request(app)
        .post("/api/auth/signup")
        .send({
          email: "existing@test.com",
          password: "Password1",
          name: "Test"
        });

      expect(res).to.have.status(400);
      expect(res.body.errorMessage).to.equal("email exist go to login");
    });

  });


  /*
  ============================
  LOGIN TESTS
  ============================
  */

  describe("POST /api/auth/login", () => {

    it("should login successfully and return token", async () => {

      const bcrypt = require("bcryptjs");
      const hashed = await bcrypt.hash("Password1", 12);

      await User.create({
        email: "login@test.com",
        password: hashed,
        name: "Login User"
      });

      const res = await chai.request(app)
        .post("/api/auth/login")
        .send({
          email: "login@test.com",
          password: "Password1"
        });

      expect(res).to.have.status(200);
      expect(res.body).to.have.property("authToken");
      expect(res.body).to.have.property("payload");
      expect(res.body.payload.email).to.equal("login@test.com");
    });

    it("should fail if password is wrong", async () => {

      const bcrypt = require("bcryptjs");
      const hashed = await bcrypt.hash("Password1", 12);

      await User.create({
        email: "wrongpass@test.com",
        password: hashed,
        name: "User"
      });

      const res = await chai.request(app)
        .post("/api/auth/login")
        .send({
          email: "wrongpass@test.com",
          password: "WrongPassword1"
        });

      expect(res).to.have.status(400);
      expect(res.body.errorMessage)
        .to.equal("try another password this one is wrong");
    });

  });


  /*
  ============================
  VERIFY TEST
  ============================
  */

  describe("GET /api/auth/verify", () => {

    it("should return payload if token is valid", async () => {

      const bcrypt = require("bcryptjs");
      const jwt = require("jsonwebtoken");

      const hashed = await bcrypt.hash("Password1", 12);

      const user = await User.create({
        email: "verify@test.com",
        password: hashed,
        name: "Verify User"
      });

      const token = jwt.sign(
        { _id: user._id, email: user.email },
        process.env.TOKEN_SECRET,
        { algorithm: "HS256", expiresIn: "7d" }
      );

      const res = await chai.request(app)
        .get("/api/auth/verify")
        .set("Authorization", `Bearer ${token}`);

      expect(res).to.have.status(200);
      expect(res.body.payload.email).to.equal("verify@test.com");
    });

  });

});