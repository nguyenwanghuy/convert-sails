/**
 * User.js
 *
 * @description :: A model definition represents a database table/collection.
 * @docs        :: https://sailsjs.com/docs/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {



    post: {
      type: 'string'
    },
    avatar: {
      type: 'string'
    },
    idUser: {
      model: 'user' 
    }
    
  },

};

