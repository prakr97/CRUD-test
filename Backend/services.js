import User from "./schema.js";

// Get all users

const sortByCreateDate = (order) => (a, b) => {
  const result = new Date(a.createdAt) - new Date(b.createdAt);
  return order === "asc" ? result : -result;
};

export const getUsers = async (request, response) => {
  
  console.log(request.body);
  const { page_offset, page_size, sort_order, search_value } = request.body;

  try {
    let allusers = await User.find();
    const users = allusers.filter((user) =>
      user.name.toLowerCase().includes(search_value)
    );
    const sortedUsers = users.sort(sortByCreateDate(sort_order));

    const startIndex = page_offset * page_size;
    const endIndex = startIndex + page_size;

    const paginatedUsers = sortedUsers.slice(startIndex, endIndex);
    response.json(paginatedUsers);

  } catch (error) {
    response.json({ message: error.message });
  }
};

export const addUser = async (request, response) => {
  const user = request.body;

  const newUser = new User(user);
  console.log(newUser, "-----newUser");
  try {
    await newUser.save();
    response.json(newUser);
  } catch (error) {
    console.log(error, "-------error in addUser");
  }
};
