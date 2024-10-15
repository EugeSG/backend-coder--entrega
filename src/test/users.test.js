import { describe, test } from "node:test"; //en proximas versiones de node, van a ser obligatorio el prefijo node:
import assert from "node:assert";
import { faker } from "@faker-js/faker";
import { config } from "../config/config.js";

const mockUser = () => {
  return {
    first_name: faker.person.firstName(),
    last_name: faker.person.lastName(),
    email: faker.internet.email(),
    password: faker.string.hexadecimal(),
  };
};

const apiURL = `http://localhost:${config.PORT}/api/sessions`;

describe("Test Users Endpoints", () => {
    let userRegister = null;
    let cookieToken = null;
  
    test("[POST] /register", async () => {
      const user = mockUser();
  
      userRegister = {
        email: user.email,
        password: user.password,
      };
  
      const response = await fetch(`${apiURL}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
  
      const responseJson = await response.json();
      assert.ok(responseJson, "_id");
      assert.equal(response.status, 201);
    });
  
    test("[POST] /login", async () => {
      const response = await fetch(`${apiURL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userRegister),
        credentials: "include",
      });
  
      const responseJson = await response.json();
      assert.equal(response.status, 200);
      const setCookieHeader = response.headers.get("set-cookie");
      assert.ok(setCookieHeader);
      assert.ok(setCookieHeader.includes("token="));
      cookieToken = setCookieHeader.split(";")[0];
    });
  
    test("[GET] /current", async () => {
      const response = await fetch(`${apiURL}/current`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieToken,
        },
        credentials: "include",
      });
  
      const responseJson = await response.json();
      assert.equal(responseJson.user.email, userRegister.email);
    });
  });