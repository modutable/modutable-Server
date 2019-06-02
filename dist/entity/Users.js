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
const Hosts_1 = require("./Hosts");
const Travelers_1 = require("./Travelers");
let Users = class Users extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Users.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "firstName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Users.prototype, "lastName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Users.prototype, "address", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Users.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "password", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "birthday", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Users.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Users.prototype, "profile", void 0);
__decorate([
    typeorm_1.OneToMany(type => Hosts_1.Hosts, hosts => hosts.user),
    __metadata("design:type", Array)
], Users.prototype, "hosts", void 0);
__decorate([
    typeorm_1.OneToMany(type => Travelers_1.Travelers, travelers => travelers.user),
    __metadata("design:type", Array)
], Users.prototype, "Travelers", void 0);
__decorate([
    typeorm_1.ManyToMany(type => Hosts_1.Hosts, hosts => hosts.Musers),
    typeorm_1.JoinTable(),
    __metadata("design:type", Array)
], Users.prototype, "Mhosts", void 0);
Users = __decorate([
    typeorm_1.Entity()
], Users);
exports.Users = Users;
