/**
 * id
 * text
 * is_deleted
 * is_Completed
 * user_id
 * created_at
 * updated_at
 */
const todoTable = [];

export const createTodoEntry = ({ text, userId }) => {
  /**
   * validation of entry
   * validation of user
   * Implement trasaction
   */
  try {
    const todo_id = (todoTable?.[todoTable.length - 1] ?? 0) + 1;
    todoTable.push({
      id: todo_id,
      text,
      user_id: userId,
      is_deleted: false,
      is_completed: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    return { ok: true };
  } catch (e) {
    console.error('Todo : Create : ', e);
  }
  return { ok: false };
};

export const updateTodoEntry = ({
  todo_id,
  text,
  is_deleted,
  is_completed,
}) => {
  /**
   * todo_id and user_id is must
   * validate these two
   */

  const todoIndex = todoTable.findIndex(({ id }) => id === todo_id);
  const todo = todoTable[todoIndex];

  todoTable[todoIndex] = {
    ...todoIndex,
    text: text ?? todo.text,
    is_deleted: is_deleted ?? todo.is_deleted,
    is_completed: is_completed ?? todo.is_completed,
    updated_at: new Date(),
  };
};

export const getTodoList = ({ userId, page, pageLength }) => {
  /**
   * validations for userId
   */

  try {
    const start = (page - 1) * pageLength;
    const end = start + pageLength;

    const userTodoList = todoTable
      .filter(({ user_id, is_deleted }) => user_id === userId && !is_deleted)
      .slice(start, end);

    return { ok: true, data: userTodoList };
  } catch (e) {
    console.error('Todo : Get-UserList : ', e);
  }
  return { ok: false };
};
