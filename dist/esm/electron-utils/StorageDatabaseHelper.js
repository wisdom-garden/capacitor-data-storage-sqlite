var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
//import * as sqlite3 from 'sqlite3';
import { Data } from './Data';
import { UtilsSQLite } from './UtilsSQLite';
var COL_ID = "id";
var COL_NAME = "name";
var COL_VALUE = "value";
var fs = window['fs'];
var path = window['path'];
var StorageDatabaseHelper = /** @class */ (function () {
    function StorageDatabaseHelper() {
        this._utils = new UtilsSQLite();
    }
    StorageDatabaseHelper.prototype.openStore = function (dbName, tableName) {
        var _this = this;
        return new Promise(function (resolve) {
            var ret = false;
            _this._db = _this._utils.connection(dbName, false /*,this._secret*/);
            if (_this._db !== null) {
                _this._createTable(tableName);
                _this._dbName = dbName;
                _this._tableName = tableName;
                ret = true;
            }
            resolve(ret);
        });
    };
    StorageDatabaseHelper.prototype._createTable = function (tableName) {
        var CREATE_STORAGE_TABLE = "CREATE TABLE IF NOT EXISTS " + tableName +
            "(" +
            COL_ID + " INTEGER PRIMARY KEY AUTOINCREMENT," + // Define a primary key
            COL_NAME + " TEXT NOT NULL UNIQUE," +
            COL_VALUE + " TEXT" +
            ")";
        try {
            this._db.run(CREATE_STORAGE_TABLE, this._createIndex.bind(this, tableName));
        }
        catch (e) {
            console.log('Error: in createTable ', e);
        }
    };
    StorageDatabaseHelper.prototype._createIndex = function (tableName) {
        var idx = "index_" + tableName + "_on_" + COL_NAME;
        var CREATE_INDEX_NAME = "CREATE INDEX IF NOT EXISTS " + idx + " ON " + tableName +
            " (" + COL_NAME + ")";
        try {
            this._db.run(CREATE_INDEX_NAME);
        }
        catch (e) {
            console.log('Error: in createIndex ', e);
        }
    };
    StorageDatabaseHelper.prototype.setTable = function (tableName) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var ret;
            return __generator(this, function (_a) {
                ret = false;
                this._db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                try {
                    this._createTable(tableName);
                    this._tableName = tableName;
                    ret = true;
                    console.log('create table successfull ', this._tableName);
                }
                catch (e) {
                    console.log('Error: in createTable ', e);
                }
                finally {
                    this._db.close();
                    resolve(ret);
                }
                return [2 /*return*/];
            });
        }); });
    };
    // Insert a data into the database
    StorageDatabaseHelper.prototype.set = function (data) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var db, res, resUpd, DATA_INSERT;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                        return [4 /*yield*/, this.get(data.name)];
                    case 1:
                        res = _a.sent();
                        if (!(res.id != null)) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.update(data)];
                    case 2:
                        resUpd = _a.sent();
                        db.close();
                        resolve(resUpd);
                        return [3 /*break*/, 4];
                    case 3:
                        DATA_INSERT = "INSERT INTO \"" + this._tableName + "\" \n                (\"" + COL_NAME + "\", \"" + COL_VALUE + "\") \n                VALUES (?, ?)";
                        db.run(DATA_INSERT, [data.name, data.value], function (err) {
                            if (err) {
                                console.log('Data INSERT: ', err.message);
                                db.close();
                                resolve(false);
                            }
                            else {
                                db.close();
                                resolve(true);
                            }
                        });
                        _a.label = 4;
                    case 4: return [2 /*return*/];
                }
            });
        }); });
    };
    // get a Data
    StorageDatabaseHelper.prototype.get = function (name) {
        var _this = this;
        return new Promise(function (resolve) {
            var data = null;
            var db = _this._utils.getReadableDatabase(_this._dbName /*,this._secret*/);
            var DATA_SELECT_QUERY = "SELECT * FROM " + _this._tableName +
                " WHERE " + COL_NAME + " = '" + name + "'";
            db.all(DATA_SELECT_QUERY, function (err, rows) {
                if (err) {
                    data = new Data();
                    data.id = null;
                    db.close();
                    resolve(data);
                }
                else {
                    data = new Data();
                    if (rows.length >= 1) {
                        data = rows[0];
                    }
                    else {
                        data.id = null;
                    }
                    db.close();
                    resolve(data);
                }
            });
        });
    };
    // update a Data
    StorageDatabaseHelper.prototype.update = function (data) {
        var _this = this;
        return new Promise(function (resolve) {
            var db = _this._utils.getWritableDatabase(_this._dbName /*,this._secret*/);
            var DATA_UPDATE = "UPDATE \"" + _this._tableName + "\" \n            SET \"" + COL_VALUE + "\" = ? WHERE \"" + COL_NAME + "\" = ?";
            db.run(DATA_UPDATE, [data.value, data.name], function (err) {
                if (err) {
                    console.log('Data UPDATE: ', err.message);
                    db.close();
                    resolve(false);
                }
                else {
                    db.close();
                    resolve(true);
                }
            });
        });
    };
    // isKey exists
    StorageDatabaseHelper.prototype.iskey = function (name) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(name)];
                    case 1:
                        res = _a.sent();
                        if (res.id != null) {
                            resolve(true);
                        }
                        else {
                            resolve(false);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // remove a key
    StorageDatabaseHelper.prototype.remove = function (name) {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var res, db_1, DATA_DELETE;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.get(name)];
                    case 1:
                        res = _a.sent();
                        if (res.id != null) {
                            db_1 = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                            DATA_DELETE = "DELETE FROM \"" + this._tableName + "\" \n                WHERE \"" + COL_NAME + "\" = ?";
                            db_1.run(DATA_DELETE, name, function (err) {
                                if (err) {
                                    console.log('Data DELETE: ', err.message);
                                    db_1.close();
                                    resolve(false);
                                }
                                else {
                                    db_1.close();
                                    resolve(true);
                                }
                            });
                        }
                        else {
                            console.log('Error:REMOVE key does not exist');
                            resolve(false);
                        }
                        return [2 /*return*/];
                }
            });
        }); });
    };
    // remove all keys 
    StorageDatabaseHelper.prototype.clear = function () {
        var _this = this;
        return new Promise(function (resolve) { return __awaiter(_this, void 0, void 0, function () {
            var db, DATA_DELETE;
            return __generator(this, function (_a) {
                db = this._utils.getWritableDatabase(this._dbName /*,this._secret*/);
                DATA_DELETE = "DELETE FROM \"" + this._tableName + "\"";
                db.run(DATA_DELETE, [], function (err) {
                    if (err) {
                        console.log('Data CLEAR: ', err.message);
                        db.close();
                        resolve(false);
                    }
                    else {
                        // set back the key primary index to 0
                        var DATA_UPDATE = "UPDATE SQLITE_SEQUENCE \n                    SET SEQ = ? ";
                        db.run(DATA_UPDATE, 0, function (err) {
                            if (err) {
                                console.log('Data UPDATE SQLITE_SEQUENCE: ', err.message);
                                db.close();
                                resolve(false);
                            }
                            else {
                                db.close();
                                resolve(true);
                            }
                        });
                    }
                });
                return [2 /*return*/];
            });
        }); });
    };
    StorageDatabaseHelper.prototype.keys = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var db = _this._utils.getReadableDatabase(_this._dbName /*,this._secret*/);
            var DATA_SELECT_KEYS = "SELECT \"" + COL_NAME + "\" FROM \"" + _this._tableName + "\"";
            db.all(DATA_SELECT_KEYS, function (err, rows) {
                if (err) {
                    db.close();
                    resolve([]);
                }
                else {
                    var arKeys = [];
                    for (var i = 0; i < rows.length; i++) {
                        arKeys = __spreadArrays(arKeys, [rows[i].name]);
                        if (i === rows.length - 1) {
                            db.close();
                            resolve(arKeys);
                        }
                    }
                }
            });
        });
    };
    StorageDatabaseHelper.prototype.values = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var db = _this._utils.getReadableDatabase(_this._dbName /*,this._secret*/);
            var DATA_SELECT_VALUES = "SELECT \"" + COL_VALUE + "\" FROM \"" + _this._tableName + "\"";
            db.all(DATA_SELECT_VALUES, function (err, rows) {
                if (err) {
                    db.close();
                    resolve([]);
                }
                else {
                    var arValues = [];
                    for (var i = 0; i < rows.length; i++) {
                        arValues = __spreadArrays(arValues, [rows[i].value]);
                        if (i === rows.length - 1) {
                            db.close();
                            resolve(arValues);
                        }
                    }
                }
            });
        });
    };
    StorageDatabaseHelper.prototype.keysvalues = function () {
        var _this = this;
        return new Promise(function (resolve) {
            var db = _this._utils.getReadableDatabase(_this._dbName /*,this._secret*/);
            var DATA_SELECT_KEYSVALUES = "SELECT \"" + COL_NAME + "\" , \"" + COL_VALUE + "\" FROM \"" + _this._tableName + "\"";
            db.all(DATA_SELECT_KEYSVALUES, function (err, rows) {
                if (err) {
                    db.close();
                    resolve([]);
                }
                else {
                    db.close();
                    resolve(rows);
                }
            });
        });
    };
    StorageDatabaseHelper.prototype.deleteStore = function (dbName) {
        var _this = this;
        return new Promise(function (resolve) {
            var ret = false;
            var dbPath = path.join(_this._utils.pathDB, dbName);
            try {
                fs.unlinkSync(dbPath);
                //file removed
                ret = true;
            }
            catch (e) {
                console.log("Error: in deleteStore");
            }
            resolve(ret);
        });
    };
    return StorageDatabaseHelper;
}());
export { StorageDatabaseHelper };
//# sourceMappingURL=StorageDatabaseHelper.js.map