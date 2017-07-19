/**
 * Question.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id:{
  		type: 'integer',
  		primaryKey: true,
    	autoIncrement: true
  	},
  	content:{
  		type: 'text',

  	},
  	explain:{
  		type: 'text'
  	},
  	jlpt:{
  		model:'jlpt'
  	},
  	isTest:{
  		type: 'boolean'
  	},
    type:{
      type: 'string',
      enum: ['kanji', 'grammar', 'vocabulary'],
    },
    answer:{
      collection: 'answer',
      via:'questionId'
    },
    games:{
      collection: 'game',
      via:'questions'
    },
    tests:{
      collection: 'test',
      via:'questions'
    },
    bookmark_users:{
      collection: 'user',
      via:'bookmark_questions'
    },
    reports:{
      collection:'report',
      via:'questionId'
    }
  }
};

