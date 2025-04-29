import { assert, beforeEach, test } from "poku";
import { ContactService } from "./contact.service";

let contact: ContactService;

beforeEach(async () => {
  contact = new ContactService();
});

test("should format name of contact to uppercase", async () => {
  const result = contact.toUpperCaseName("Maria");
  assert.equal(result, "MARIA");
});

test("should format phone of contact to specific format", async () => {
  const result = contact.formatPhone("5541999999999");
  assert.equal(result, "+55 (41) 99999-9999");
});
