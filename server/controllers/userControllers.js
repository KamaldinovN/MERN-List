import User from "../models/User.js";

export const getListOfUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ rank: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: "Something wrong with list of users",
    });
  }
};

export const addNewUser = async (req, res) => {
  try {
    const { name, rank } = req.body;
    const candidate = await User.findOne({ name });
    if (candidate) {
      return res
        .status(400)
        .json({ message: `User with name ${name} already exist` });
    }
    const user = new User({ name, rank });
    await user.save();
    res.json({ message: "User was created" });
  } catch (err) {
    res.status(500).json({
      message: "Something wrong wrong with server",
    });
  }
};

export const updateUserData = async (req, res) => {
  try {
    const userId = req.params.id;
    await User.updateOne(
      {
        _id: userId,
      },
      {
        name: req.body.newName,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update user",
    });
  }
};
export const updateUserDataDragDrop = async (req, res) => {
  try {
    await User.updateOne(
      {
        _id: req.body.firstUser.id,
      },
      {
        name: req.body.secondUser.name,
      }
    );
    await User.updateOne(
      {
        _id: req.body.secondUser.id,
      },
      {
        name: req.body.firstUser.name,
      }
    );

    res.json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      message: "Cannot update user",
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    User.findOneAndDelete(
      {
        _id: userId,
      },
      (err, doc) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            message: "Can`t delete user",
          });
        }

        if (!doc) {
          return res.status(404).json({
            message: "User not found",
          });
        }

        res.json({
          success: true,
        });
      }
    );
  } catch (err) {
    res.status(500).json({
      message: "Something wrong wrong with server",
    });
  }
};
