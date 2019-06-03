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
const typeorm_1 = require("typeorm");
const Users_1 = require("./Users");
let Travelers = class Travelers extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Travelers.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Travelers.prototype, "legion", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Travelers.prototype, "startDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Travelers.prototype, "endDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Travelers.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Travelers.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Users_1.Users, user => user.Travelers),
    __metadata("design:type", Array)
], Travelers.prototype, "user", void 0);
Travelers = __decorate([
    typeorm_1.Entity()
], Travelers);
exports.Travelers = Travelers;
