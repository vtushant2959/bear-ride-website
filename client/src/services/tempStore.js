// Temporary in-memory store for files between Register → OTP pages.
// localStorage cannot hold File objects, so we use module-level state.
let _files = {};
let _extraData = {};

export const setTempFiles    = (files)  => { _files     = { ...files }; };
export const getTempFiles    = ()       => _files;
export const setTempExtra    = (data)   => { _extraData  = { ...data  }; };
export const getTempExtra    = ()       => _extraData;
export const clearTempStore  = ()       => { _files = {}; _extraData = {}; };
