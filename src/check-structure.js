var assert = require('assert');
function checkType(obj, propName, typeName) {
	var prop = obj[propName];
	var actualTypeName = Array.isArray(prop) ? 'array' : typeof prop;
	var msg = `\x1b[31m"${propName}"\x1b[0m must be of type: \x1b[31m${typeName}\x1b[0m, but it is: \x1b[31m${actualTypeName} "${prop}"\x1b[0m.`;
	assert(actualTypeName === typeName, msg);
}
module.exports = function (data) {
	checkType(data, 'header', 'string');
	checkType(data, 'footer', 'string');
	checkType(data, 'blockHeader', 'string');
	checkType(data, 'blockFooter', 'string');
	checkType(data, 'hosts', 'array');
	data.hosts.forEach(function (block) {
		checkType(block, 'name', 'string');
		checkType(block, 'items', 'array');
		block.items.forEach(function (item) {
			if (item.comment !== undefined) checkType(item, 'comment', 'string');
			else {
				checkType(item, 'ip', 'string');
				if (item.domain !== undefined) checkType(item, 'domain', 'string');
				else {
					checkType(item, 'domains', 'array');
					item.domains.forEach(function (domain) {
						checkType({ domains: domain }, 'domains', 'string');
					});
				}
			}
		});
	});
};
