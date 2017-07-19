/**
 * Relationship.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	user_one:{
  		model:'user'
  	},
  	user_two: {
  		model:'user'
  	},
  	status: {
  		type: 'integer',
      required: true,
      enum: [1,2,3] //1:neu ng gui la user_one, 2 neu nguoi gui la user_two, 3 la da ket ban
  	},
  	seem:{
  		type: 'boolean',
      required: true,
  		defaultsTo: false
  	}
  }
};

