"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
//https://github.com/angular/angular/issues/6392
var core_1 = require('@angular/core');
/*
  # Description:

  Repackages an array subset as a new array.

  **Reasoning:**

  Angular2's change checker freaks out when you ngFor an array that's a subset
    of a larger data structure.

  # Usage:
  ``
  <div *ng-for="#value of arrayOfObjects | derp"> </div>
  ``
*/
var ArrayFixPipe = (function () {
    function ArrayFixPipe() {
    }
    ArrayFixPipe.prototype.transform = function (value, args) {
        if (Array.isArray(value))
            return Array.from(value);
        else
            return [value];
    };
    ArrayFixPipe = __decorate([
        core_1.Pipe({ name: 'arrayFix' }), 
        __metadata('design:paramtypes', [])
    ], ArrayFixPipe);
    return ArrayFixPipe;
}());
exports.ArrayFixPipe = ArrayFixPipe;
//# sourceMappingURL=ngfor-array-fix.pipe.js.map