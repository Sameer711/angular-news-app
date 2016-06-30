"use strict";
var post_list_component_1 = require("./post-list.component");
var router_1 = require('@angular/router');
exports.routes = [
    { path: '/', component: { PostListComponent: post_list_component_1.PostListComponent } },
];
exports.APP_ROUTER_PROVIDERS = [
    router_1.provideRouter(exports.routes)
];
//# sourceMappingURL=app.routes.js.map