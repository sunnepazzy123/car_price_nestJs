"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomSerializerInterceptor = exports.Serialize = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const class_transformer_1 = require("class-transformer");
const Serialize = (dto) => {
    return (0, common_1.UseInterceptors)(new CustomSerializerInterceptor(dto));
};
exports.Serialize = Serialize;
class CustomSerializerInterceptor {
    constructor(dto) {
        this.dto = dto;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            return (0, class_transformer_1.plainToClass)(this.dto, data, {
                excludeExtraneousValues: true,
            });
        }));
    }
}
exports.CustomSerializerInterceptor = CustomSerializerInterceptor;
//# sourceMappingURL=serialize.interceptors.js.map