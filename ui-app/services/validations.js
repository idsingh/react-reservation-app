var validations = {
    required: function (value) {
        if(typeof value === "string") {
            value = value.trim();
            return !!value;
        }
        if(Array.isArray(value)) {
            return !!value.length;
        }
        return validations.validateInteger(value) || validations.validateDouble(value) || !!value;
    },
    validateIntegerInRange: function (value, start, end) {
        // Conversion of string to numbers
        value = +value;
        start = +start;
        end = +end;
        return validations.validateInteger(value) && value >= start && value <= end;
    },
    validateInteger: function (value) {
        return /^\d+$/.test(value);
    },
    validateDouble: function (value) {
        return /^[\d]+(\.\d{1,2})?$/.test(value) && !isNaN(value);
    },
    validateContent: function (value) {
        var re = /^([A-Z0-9_\[\]{}\(\)&.*=?<>|+,% /\\-])*$/i;
        return re.test(value);
    }
};

export default validations;
