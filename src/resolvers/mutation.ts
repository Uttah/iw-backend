import User from "../models/user";

// Mutation methods implementation.
const MutationImpl = {
    createUser: async (parent, args) => {
      const user = await new User(args);
      user.save();
      user._id = user._id.toString();
      return user;
    },
    removeUser: async (parent, args) => {
      const user = await User.findByIdAndRemove({where: args.id});
      return user;
    },
    updateUser: async (parent, { input }) => {
      const { id, ...userData } = input;
      const updatedUser = await User.findByIdAndUpdate(id, userData);
      return updatedUser;
    },
    upload: async (parent, { file }) => {
        const { stream, filename, mimetype, encoding } = await file;
  
        // 1. Validate file metadata.

        // 2. Record the file upload in your DB.
        // const id = await recordFile( … )
  
        return { filename, mimetype, encoding };
    }
  }

  export default MutationImpl;