const fs = require('fs').promises;
const path = require('path');
const crypto = require('crypto');

const contactsPath = path.join(__dirname, './db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  console.table(contacts);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const contact = contacts.find(contact => contact.id === contactId);
  console.log(contact);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  let contacts = JSON.parse(data);
  contacts = contacts.filter(contact => contact.id !== contactId);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
}

module.exports = { listContacts, getContactById, removeContact, addContact };
