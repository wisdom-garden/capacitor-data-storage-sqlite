# Changelog

## 2.1.0-2 - 2026-05-26

Replace `jeep-localforage` with standard `localforage` for web storage:
- Remove `jeep-localforage` dependency, add `localforage: ^1.10.0` to `dependencies` and `peerDependencies`
- Update `StorageDatabaseHelper` import from `jeep-localforage` to `localforage`

Fix `android/build.gradle` to work without `variables.gradle`:
- Remove `apply from: "variables.gradle"` and delete `variables.gradle`
- Add fallback defaults for `compileSdkVersion` (29), `minSdkVersion` (21), `targetSdkVersion` (29) when host project does not define them

## 2.1.0-1 - 2026-05-25

Support Android 16KB memory page alignment (required for Android 15+ devices):
- Upgrade SQLCipher: `android-database-sqlcipher:4.4.0` → `sqlcipher-android:4.16.0`
- Upgrade `androidx.sqlite`: `2.0.1` → `2.4.0`
- Migrate `StorageDatabaseHelper` to new SQLCipher API (`net.zetetic.database.sqlcipher`)

Fix pre-existing bugs in `encryption` mode of `StorageDatabaseHelper`:
- Add try/catch around `openOrCreateDatabase` to prevent crash when opening encrypted database fails
- Wrap temp database migration in try/finally to ensure `tempDB` is always closed and `tempFile` is always deleted

## 2.1.0 - 2020-06-02

Fix Android SQLCipher error code 14 (failed to open database due to missing directory):
- Add `createFilePath()` to ensure the database directory exists before opening or creating a database file
