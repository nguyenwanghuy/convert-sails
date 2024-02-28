/**
 * AdminController
 *
 * @description :: Server-side actions for handling incoming requests.
 * @help        :: See https://sailsjs.com/docs/concepts/actions
 */

module.exports = {
    async getALlUser(req, res) {
        try {
            const users = await Admin.find();
            return res.ok(users);
        } catch (error) {
            return res.serverError(error);
        }
    },
    async updateUser(req, res) {
        try {
            const { username, email, password } = req.body
            const { id } = req.params;
            console.log(id);
            const updatedUser = await Admin.updateOne({ id })
            .set({ username, email, password });
      
            if (!updatedUser) {
                res.badRequest('User not found')
            }
            return res.ok({
                updatedUser: updatedUser,
                message: 'User updated successfully'
            });
        } catch (error) {
            console.log(error);
            return res.serverError(error);
        }
    },
    async deleteUser(req, res) {
      try {
        const {id} = req.params 
        const deletedUser = await Admin.destroyOne({id})
        if(!deletedUser) {
            return res.notFound('User not found')
        }
       return res.ok({
        data: deletedUser,
        message: 'User deleted successfully'
       })
      } catch (error) {
        return res.serverError(error)
      }
    }
};

