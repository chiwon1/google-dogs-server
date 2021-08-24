const request = require("supertest");
const { expect } = require("chai");
const randomstring = require("randomstring");
const app = require("../app");
const { v4 } = require("uuid");

describe("Express basics", () => {
  describe("GET `/not-valid-url`", () => {
    it("should respond with error template", (done) => {
      const randomString = randomstring.generate();

      request(app)
        .get(`/${randomString}`)
        .expect("Content-Type", /html/)
        .expect(404)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("404");
          done();
        });
    });
  });

  describe("GET `/documents/:id/delete`", () => {
    it("should redirect invalid access", (done) => {
      request(app)
        .get(`/documents/${v4()}`)
        .expect("Content-Type", "text/plain; charset=utf-8")
        .expect(302)
        .end((err, res) => {
          if (err) return done(err);
          expect(res.text).to.include("Found. Redirecting to /");
          done();
        });
    });
  });
});
