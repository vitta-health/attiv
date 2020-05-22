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
Object.defineProperty(exports, "__esModule", { value: true });
const attiv_1 = require("attiv");
const validator = require("class-validator");
let MedicamentoLaboratory = /** @class */ (() => {
    class MedicamentoLaboratory extends attiv_1.BaseEntity {
    }
    __decorate([
        validator.IsNotEmpty(),
        validator.IsNumber(),
        validator.Min(1),
        __metadata("design:type", Number)
    ], MedicamentoLaboratory.prototype, "laboratoryId", void 0);
    __decorate([
        validator.IsNotEmpty(),
        validator.IsNumber(),
        validator.Min(1),
        __metadata("design:type", Number)
    ], MedicamentoLaboratory.prototype, "medicineId", void 0);
    return MedicamentoLaboratory;
})();
exports.default = MedicamentoLaboratory;
