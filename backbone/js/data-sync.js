$(function(){


    (function() {
        Backbone.sync = function(method, model, options) {
            var store = model.localStorage || model.collection.localStorage;

            var resp, errorMessage, syncDfd = $.Deferred && $.Deferred(); //If $ is having Deferred - use it.

            try {

                switch (method) {
                    case "read":
                        resp = model.id != undefined ? store.find(model) : store.findAll();
                        break;
                    case "create":
                        resp = store.create(model);
                        break;
                    case "update":
                        resp = store.update(model);
                        break;
                    case "delete":
                        resp = store.destroy(model);
                        break;
                }

            } catch(error) {
                if (error.code === DOMException.QUOTA_EXCEEDED_ERR && window.localStorage.length === 0)
                    errorMessage = "Private browsing is unsupported";
                else
                    errorMessage = error.message;
            }

            if (resp) {
                model.trigger("sync", model, resp, options);
                if (options && options.success)
                    options.success(resp);
                if (syncDfd)
                    syncDfd.resolve(resp);

            } else {
                errorMessage = errorMessage ? errorMessage
                    : "Record Not Found";

                if (options && options.error)
                    options.error(errorMessage);
                if (syncDfd)
                    syncDfd.reject(errorMessage);
            }

            // add compatibility with $.ajax
            // always execute callback for success and error
            if (options && options.complete) options.complete(resp);

            return syncDfd && syncDfd.promise();
        };

        Backbone.ajaxSync = Backbone.sync;

        Backbone.getSyncMethod = function(model) {
            if(model.localStorage || (model.collection && model.collection.localStorage)) {
                return Backbone.localSync;
            }

            return Backbone.ajaxSync;
        };

// Override 'Backbone.sync' to default to localSync,
// the original 'Backbone.sync' is still available in 'Backbone.ajaxSync'
        Backbone.sync = function(method, model, options) {
            return Backbone.getSyncMethod(model).apply(this, [method, model, options]);
        };

    });

    // learning 7: data sync
    (function(){
        //Overrides persistence storage with dummy function. This enables use of Model.destroy() without raising an error.
        Backbone.sync = function(method, model, success, error) {debugger;
            //success();
        };



        var ListService = (function(){

        });

        var ItemModel = Backbone.Model.extend({
            defaults: {
                firstName: 'Quentin',
                lastName: 'Yang'
            }
        });
        var ListCollection = Backbone.Collection.extend({
            model: ItemModel,
            service: ListService
        });

        var ItemView = Backbone.View.extend({
            tagName: 'li',
            events: {
                'click .swap': 'swap',
                'click .delete': 'remove'
            },
            initialize: function() {
                this.model.bind('change', this.render, this);
                this.model.bind('remove', this.unrender, this);
            },
            render: function() {
                $(this.el).html('<span>First name: '+this.model.get('firstName')+', Last name: '+this.model.get('lastName')+'</span>');
                $(this.el).append('<span class="swap">Swap</span>&nbsp;&nbsp;<span class="delete">Delete</span>');
                return this;// for chainable calls, like .render().el
            },
            unrender: function() {
                $(this.el).remove();
            },
            swap: function() {
                var data = {
                    firstName: this.model.get('lastName'),
                    lastName: this.model.get('firstName')
                };
                this.model.set(data);
            },
            remove: function() {
                this.model.destroy();
            }
        });

        var appView = Backbone.View.extend({
            el: $('#learning6'),
            events: {
                'click #learning6 .btn-add': 'addItem'
            },
            initialize: function() {
                this.collection = new ListCollection();
                /* before v0.5.2 */
                // _.bindAll(this, 'render', 'addItem', 'appendItem');
                // this.collection.bind('add', this.appendItem);// Remember: every function that uses 'this' as the current object should be in here

                /* after v0.5.2 */
                this.collection.bind('add', this.appendItem, this);// notice the 3rd-param 'this' here.
//                this.collection.bind('all', this.rednder, this);// notice the 3rd-param 'this' here.

                this.counter = 0;

                this.render();

                var self = this;
                setTimeout(function(){
                    self.collection.fetch({
                        success: function(collection, response, options){
                            self.collection.set(collection.models);
                        },
                        error: function(collection, response, options){
                            console.log(arguments);
                        }
                    });

                }, 3000);

            },
            render: function() {
                var self = this;
                $(this.el).append('Learning : created by Quentin Yang');
                $(this.el).append('<p><button class="btn-add">Add Item</button></p>');
                $(this.el).append('<ul></ul>');

                _(this.collection.models).each(function(item){
                    self.appendItem(item);
                }, this);
            },
            addItem: function() {
                this.counter++;
                var item = new ItemModel();
                item.set({
                    firstName: item.get('firstName') + '-' + this.counter,
                    lastName: item.get('lastName') + '-' + this.counter
                });
                this.collection.add(item);
            },
            appendItem: function(item) {
                var itemView = new ItemView({
                    model: item
                });
                $('ul', this.el).append(itemView.render().el);
            }
        });
        new appView;
    })();
});