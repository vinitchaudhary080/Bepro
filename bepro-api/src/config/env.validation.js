"use strict";
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
Object.defineProperty(exports, "__esModule", { value: true });
var class_transformer_1 = require("class-transformer");
var class_validator_1 = require("class-validator");
var NodeEnv;
(function (NodeEnv) {
    NodeEnv["development"] = "development";
    NodeEnv["production"] = "production";
    NodeEnv["test"] = "test";
})(NodeEnv || (NodeEnv = {}));
var EnvVars = function () {
    var _a;
    var _NODE_ENV_decorators;
    var _NODE_ENV_initializers = [];
    var _NODE_ENV_extraInitializers = [];
    var _PORT_decorators;
    var _PORT_initializers = [];
    var _PORT_extraInitializers = [];
    var _DATABASE_URL_decorators;
    var _DATABASE_URL_initializers = [];
    var _DATABASE_URL_extraInitializers = [];
    var _JWT_ACCESS_SECRET_decorators;
    var _JWT_ACCESS_SECRET_initializers = [];
    var _JWT_ACCESS_SECRET_extraInitializers = [];
    var _JWT_REFRESH_SECRET_decorators;
    var _JWT_REFRESH_SECRET_initializers = [];
    var _JWT_REFRESH_SECRET_extraInitializers = [];
    var _JWT_ACCESS_EXPIRES_decorators;
    var _JWT_ACCESS_EXPIRES_initializers = [];
    var _JWT_ACCESS_EXPIRES_extraInitializers = [];
    var _JWT_REFRESH_EXPIRES_decorators;
    var _JWT_REFRESH_EXPIRES_initializers = [];
    var _JWT_REFRESH_EXPIRES_extraInitializers = [];
    return _a = /** @class */ (function () {
            function EnvVars() {
                this.NODE_ENV = __runInitializers(this, _NODE_ENV_initializers, void 0);
                this.PORT = (__runInitializers(this, _NODE_ENV_extraInitializers), __runInitializers(this, _PORT_initializers, void 0));
                this.DATABASE_URL = (__runInitializers(this, _PORT_extraInitializers), __runInitializers(this, _DATABASE_URL_initializers, void 0));
                // Step 2 ke liye:
                this.JWT_ACCESS_SECRET = (__runInitializers(this, _DATABASE_URL_extraInitializers), __runInitializers(this, _JWT_ACCESS_SECRET_initializers, void 0));
                this.JWT_REFRESH_SECRET = (__runInitializers(this, _JWT_ACCESS_SECRET_extraInitializers), __runInitializers(this, _JWT_REFRESH_SECRET_initializers, void 0));
                this.JWT_ACCESS_EXPIRES = (__runInitializers(this, _JWT_REFRESH_SECRET_extraInitializers), __runInitializers(this, _JWT_ACCESS_EXPIRES_initializers, void 0));
                this.JWT_REFRESH_EXPIRES = (__runInitializers(this, _JWT_ACCESS_EXPIRES_extraInitializers), __runInitializers(this, _JWT_REFRESH_EXPIRES_initializers, void 0));
                __runInitializers(this, _JWT_REFRESH_EXPIRES_extraInitializers);
            }
            return EnvVars;
        }()),
        (function () {
            var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
            _NODE_ENV_decorators = [(0, class_validator_1.IsEnum)(NodeEnv)];
            _PORT_decorators = [(0, class_validator_1.IsNumberString)()];
            _DATABASE_URL_decorators = [(0, class_validator_1.IsString)()];
            _JWT_ACCESS_SECRET_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _JWT_REFRESH_SECRET_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _JWT_ACCESS_EXPIRES_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            _JWT_REFRESH_EXPIRES_decorators = [(0, class_validator_1.IsOptional)(), (0, class_validator_1.IsString)()];
            __esDecorate(null, null, _NODE_ENV_decorators, { kind: "field", name: "NODE_ENV", static: false, private: false, access: { has: function (obj) { return "NODE_ENV" in obj; }, get: function (obj) { return obj.NODE_ENV; }, set: function (obj, value) { obj.NODE_ENV = value; } }, metadata: _metadata }, _NODE_ENV_initializers, _NODE_ENV_extraInitializers);
            __esDecorate(null, null, _PORT_decorators, { kind: "field", name: "PORT", static: false, private: false, access: { has: function (obj) { return "PORT" in obj; }, get: function (obj) { return obj.PORT; }, set: function (obj, value) { obj.PORT = value; } }, metadata: _metadata }, _PORT_initializers, _PORT_extraInitializers);
            __esDecorate(null, null, _DATABASE_URL_decorators, { kind: "field", name: "DATABASE_URL", static: false, private: false, access: { has: function (obj) { return "DATABASE_URL" in obj; }, get: function (obj) { return obj.DATABASE_URL; }, set: function (obj, value) { obj.DATABASE_URL = value; } }, metadata: _metadata }, _DATABASE_URL_initializers, _DATABASE_URL_extraInitializers);
            __esDecorate(null, null, _JWT_ACCESS_SECRET_decorators, { kind: "field", name: "JWT_ACCESS_SECRET", static: false, private: false, access: { has: function (obj) { return "JWT_ACCESS_SECRET" in obj; }, get: function (obj) { return obj.JWT_ACCESS_SECRET; }, set: function (obj, value) { obj.JWT_ACCESS_SECRET = value; } }, metadata: _metadata }, _JWT_ACCESS_SECRET_initializers, _JWT_ACCESS_SECRET_extraInitializers);
            __esDecorate(null, null, _JWT_REFRESH_SECRET_decorators, { kind: "field", name: "JWT_REFRESH_SECRET", static: false, private: false, access: { has: function (obj) { return "JWT_REFRESH_SECRET" in obj; }, get: function (obj) { return obj.JWT_REFRESH_SECRET; }, set: function (obj, value) { obj.JWT_REFRESH_SECRET = value; } }, metadata: _metadata }, _JWT_REFRESH_SECRET_initializers, _JWT_REFRESH_SECRET_extraInitializers);
            __esDecorate(null, null, _JWT_ACCESS_EXPIRES_decorators, { kind: "field", name: "JWT_ACCESS_EXPIRES", static: false, private: false, access: { has: function (obj) { return "JWT_ACCESS_EXPIRES" in obj; }, get: function (obj) { return obj.JWT_ACCESS_EXPIRES; }, set: function (obj, value) { obj.JWT_ACCESS_EXPIRES = value; } }, metadata: _metadata }, _JWT_ACCESS_EXPIRES_initializers, _JWT_ACCESS_EXPIRES_extraInitializers);
            __esDecorate(null, null, _JWT_REFRESH_EXPIRES_decorators, { kind: "field", name: "JWT_REFRESH_EXPIRES", static: false, private: false, access: { has: function (obj) { return "JWT_REFRESH_EXPIRES" in obj; }, get: function (obj) { return obj.JWT_REFRESH_EXPIRES; }, set: function (obj, value) { obj.JWT_REFRESH_EXPIRES = value; } }, metadata: _metadata }, _JWT_REFRESH_EXPIRES_initializers, _JWT_REFRESH_EXPIRES_extraInitializers);
            if (_metadata) Object.defineProperty(_a, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        })(),
        _a;
}();
exports.default = (function () {
    var validated = (0, class_transformer_1.plainToInstance)(EnvVars, process.env, { enableImplicitConversion: true });
    var errors = (0, class_validator_1.validateSync)(validated, { skipMissingProperties: false });
    if (errors.length)
        throw new Error("Invalid env: ".concat(errors.map(function (e) { return e.property; }).join(', ')));
    return validated;
});
