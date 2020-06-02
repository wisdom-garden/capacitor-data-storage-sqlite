//import * as sqlite3 from 'sqlite3';
//import * as path from 'path';
//import * as fs from 'fs';
var sqlite3 = window['sqlite3'];
var fs = window['fs'];
var path = window['path'];
var UtilsSQLite = /** @class */ (function () {
    function UtilsSQLite() {
        this.pathDB = "./DataStorage";
    }
    UtilsSQLite.prototype.connection = function (dbName, readOnly /*,key?:string*/) {
        var flags = readOnly ? sqlite3.OPEN_READONLY : sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE;
        console.log('in UtilsSQLite.connection flags ', flags);
        // get the path for the database
        var dbPath = this._getDBPath(dbName);
        var dbOpen;
        if (dbPath != null) {
            try {
                dbOpen = new sqlite3.Database(dbPath, flags);
                return dbOpen;
            }
            catch (e) {
                console.log("Error: in UtilsSQLite.connection ", e);
                return null;
            }
        }
    };
    UtilsSQLite.prototype.getWritableDatabase = function (dbName /*, secret: string*/) {
        var db = this.connection(dbName, false /*,secret*/);
        return db;
    };
    UtilsSQLite.prototype.getReadableDatabase = function (dbName /*, secret: string*/) {
        var db = this.connection(dbName, true /*,secret*/);
        return db;
    };
    UtilsSQLite.prototype._getDBPath = function (dbName) {
        var retPath = null;
        var dbFolder = this.pathDB;
        retPath = path.join(dbFolder, dbName);
        try {
            if (!fs.existsSync(dbFolder)) {
                this._mkdirSyncRecursive(dbFolder);
            }
        }
        catch (e) {
            console.log('Error: in getDBPath', e);
        }
        return retPath;
    };
    UtilsSQLite.prototype._mkdirSyncRecursive = function (directory) {
        var path = directory.replace(/\/$/, '').split('/');
        for (var i = 1; i <= path.length; i++) {
            var segment = path.slice(0, i).join('/');
            segment.length > 0 && !fs.existsSync(segment) ? fs.mkdirSync(segment) : null;
        }
        return;
    };
    return UtilsSQLite;
}());
export { UtilsSQLite };
//# sourceMappingURL=UtilsSQLite.js.map