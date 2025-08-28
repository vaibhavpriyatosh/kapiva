/**
 * id
 * password hashed
 * name
 * mobile
 * email
 */

const userTable = [];

const createUser = ({ name, password, mobile, email }) => {
  /**
   * validation of entries
   * mobile and email exists
   * password matches the requirement
   */

  const hashedPassword = password; //hashed password

  const user_id = uuid();

  userTable.push({
    id: user_id,
    name: name,
    password: hashedPassword,
    mobile,
    email,
  });
};
