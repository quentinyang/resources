
$(function(){
    // Learning 1
    (function(){
        var appView = Backbone.View.extend({
            el: $('#learning1'),
            initialize: function() {
                this.render();
            },
            render: function() {
                $(this.el).append('Learning: created by Quentin Yang');
            }
        });
        new appView;
    })();

    // Learning 2
    (function(){
        var appView = Backbone.View.extend({
            el: $('#learning2'),
            events: {
                'click #learning2 .btn-add': 'addItem'
            },
            initialize: function() {
                this.counter = 0;
                this.render();
            },
            render: function() {
                $(this.el).append('Learning : created by Quentin Yang');
                $(this.el).append('<p><button class="btn-add">Add Item</button></p>');
                $(this.el).append('<ul></ul>');
            },
            addItem: function() {
                this.counter++;
                $('ul', this.el).append('<li>Created a new item. Total items: '+this.counter+'.</li>');
            }
        });
        new appView;
    })();

    // Learning 3
    (function(){
        var ItemModel = Backbone.Model.extend({
            defaults: {
                firstName: 'Quentin',
                lastName: 'Yang'
            }
        });
        var ListCollection = Backbone.Collection.extend({
            model: ItemModel
        });

        var appView = Backbone.View.extend({
            el: $('#learning3'),
            events: {
                'click #learning3 .btn-add': 'addItem'
            },
            initialize: function() {
                this.collection = new ListCollection();
                /* before v0.5.2 */
                // _.bindAll(this, 'render', 'addItem', 'appendItem');
                // this.collection.bind('add', this.appendItem);// Remember: every function that uses 'this' as the current object should be in here

                /* after v0.5.2 */
                this.collection.bind('add', this.appendItem, this);// notice the 3rd-param 'this' here.

                this.counter = 0;
                this.render();
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
                $('ul', this.el).append('<li>First name: '+item.get('firstName')+', Last name: ' +item.get('lastName')+ '.</li>');
            }
        });
        new appView;
    })();

    // Learning 4
    (function(){
        var ItemModel = Backbone.Model.extend({
            defaults: {
                firstName: 'Quentin',
                lastName: 'Yang'
            }
        });
        var ListCollection = Backbone.Collection.extend({
            model: ItemModel
        });

        var ItemView = Backbone.View.extend({
            tagName: 'li',
            initialize: function() {

            },
            render: function() {
                $(this.el).html('<span>First name: '+this.model.get('firstName')+', Last name: '+this.model.get('lastName')+'</span>');
                return this;// for chainable calls, like .render().el
            }
        });

        var appView = Backbone.View.extend({
            el: $('#learning4'),
            events: {
                'click #learning4 .btn-add': 'addItem'
            },
            initialize: function() {
                this.collection = new ListCollection();
                /* before v0.5.2 */
                // _.bindAll(this, 'render', 'addItem', 'appendItem');
                // this.collection.bind('add', this.appendItem);// Remember: every function that uses 'this' as the current object should be in here

                /* after v0.5.2 */
                this.collection.bind('add', this.appendItem, this);// notice the 3rd-param 'this' here.

                this.counter = 0;
                this.render();
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

    // Learning 5
    (function(){
        //Overrides persistence storage with dummy function. This enables use of Model.destroy() without raising an error.
//        Backbone.sync = function(method, model, success, error) {
//            success();
//        };

        var ItemModel = Backbone.Model.extend({
            defaults: {
                firstName: 'Quentin',
                lastName: 'Yang'
            }
        });
        var ListCollection = Backbone.Collection.extend({
            model: ItemModel
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
            el: $('#learning5'),
            events: {
                'click #learning5 .btn-add': 'addItem'
            },
            initialize: function() {
                this.collection = new ListCollection();
                /* before v0.5.2 */
                // _.bindAll(this, 'render', 'addItem', 'appendItem');
                // this.collection.bind('add', this.appendItem);// Remember: every function that uses 'this' as the current object should be in here

                /* after v0.5.2 */
                this.collection.bind('add', this.appendItem, this);// notice the 3rd-param 'this' here.

                this.counter = 0;
                this.render();
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

    // learning 6
    (function(){
        //Overrides persistence storage with dummy function. This enables use of Model.destroy() without raising an error.
//        Backbone.sync = function(method, model, success, error) {debugger;
//            success();
//        };

        var ItemModel = Backbone.Model.extend({
            defaults: {
                firstName: 'Quentin',
                lastName: 'Yang'
            }
        });
        var ListCollection = Backbone.Collection.extend({
            model: ItemModel,
            url: 'fakedata/list.json'
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