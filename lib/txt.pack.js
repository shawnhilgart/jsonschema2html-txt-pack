/*jslint node: true,nomen: true, vars: true */
/*jshint maxcomplexity: 5 */
'use strict';

var fs = require('fs');

function repeat(num,dp) {
    return new Array( num + 1 ).join( dp );
}

module.exports = {
    built: false,
    templates: {
        formOpen: function() {
            return "formOpen" + "\n";
        },

        formClose: function() {
            return "formClose";
        },

        groupItemOpen: function(data) {
            return repeat(data.options.depth,'-') + 'groupItemOpen:' + data.name + "\n";
        },

        groupItemClose: function(data) {
            return repeat(data.options.depth,'-') + 'groupItemClose:' + data.name + "\n";
        },

        textfield: function(data) {
            return repeat(data.options.depth,'-') + 'textfield:' + data.name + "=" + data.val +  "\n";
        },  

        textarea: function(data) {
            
            return repeat(data.options.depth,'-') + 'textarea:' + data.name + "=" + data.val +  "\n";
        },

        upload: function(data) {
            return repeat(data.options.depth,'-') + 'upload:' + data.name + "=" + data.val +  "\n";
        },

        selectlist: function(data) {
            return repeat(data.options.depth,'-') + 'selectlist:' + data.name + "=" + data.val +  "\n";
        },

        groupArrayOpen: function(data) {
            return repeat(data.options.depth,'-') + 'groupArrayOpen:' + data.id + "\n";
        },

        groupArrayClose: function() {
            return repeat(data.options.depth,'-') + 'groupArrayClose:' + data.id + "\n";
        },

        help: function(data) {
            return repeat(data.options.depth,'-') + 'help:' + data.id + "\n";
        },

        startGroup: function(data) {
            return repeat(data.options.depth,'-') + 'startGroup:' + data.id + "\n";
        },

        endGroup: function(data) {
            return repeat(data.options.depth,'-') + 'endGroup:' + data.id + "\n";
        },

        startGroupNoMethod: function() {

        },

        startGroupHidden: function() {

        },

        image: function(data) {
            return repeat(data.options.depth,'-') + 'image:' + data.name + "/" + data.val +  "\n";
        },

        readonly: function() {

        },

        file: function(data) {
            return repeat(data.options.depth,'-') + 'file:' + data.name + "/" + data.val +  "\n";
        },

        hidden: function(data) {
            return repeat(data.options.depth,'-') + 'hidden:' + data.name + "=" + data.val +  "\n";
        },

        password: function(data) {
            return repeat(data.options.depth,'-') + 'password:' + data.name + "=" + data.val +  "\n";
        },
    },



    /**
     * @description Template loading method, each formPack should provide its own method to load its template files
     *
     * @param {string} key Key file for template to load
     * @param {function} callback Callback function accepts err and result
     */

    loadTemplate: function(key, callback) {
        callback(null,templates[key]);
    },

    /**
     * @description Template rendering method, each formPack should provide its own rendering method
     *
     * @param {*} template Template (function, object, or string) returned from the loadTemplate function
     * @param {object} data Data object from json schema
     * @param {function} callback callback function accepts err, and result
     */

    renderTemplate: function(template, data, callback) {
        var result = null,
            err = null;
            data = data || {};
            data.options = data.options || {};
            data.options.depth = data.options.depth || 1;
            data.id = data.id || '';

        if (template === null) {
            callback(new Error("Could not render template of null"));
        } else {

            try {
                result = template(data);
            } catch (e) {
                err = e;
            }

            callback(err, result);
        }
    },

    /**
     * @description Utility function to clear up any runtime dependencies neccesary to run the form pack
     */

    build: function() {

        this.built = true;
    },

    /**
     * @description Utility function to manage roles for each item within a schema file, called by the render loop on each schema item
     */

    security: function(schema) {
        return true;
    }
};