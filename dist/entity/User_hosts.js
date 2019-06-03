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
let User_hosts = class User_hosts extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], User_hosts.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], User_hosts.prototype, "state", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User_hosts.prototype, "bookDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User_hosts.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], User_hosts.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User_hosts.prototype, "user_id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], User_hosts.prototype, "host_id", void 0);
User_hosts = __decorate([
    typeorm_1.Entity()
], User_hosts);
exports.User_hosts = User_hosts;
