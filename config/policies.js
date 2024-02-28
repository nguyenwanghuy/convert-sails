/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /***************************************************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  // '*': true,
// sử dụng middleware
 AuthController:{
  me:  ['authMiddleware']
 },
 AdminController:{
  getALlUser: ['authMiddleware','verifyTokenAndAdmins'],
  updateUser:['authMiddleware','verifyTokenAndAdmins'],
  deleteUser:['authMiddleware','verifyTokenAndAdmins'],
 },
 UserController:{
  uploadImage: ['authMiddleware']
 },
};
