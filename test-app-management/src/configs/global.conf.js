import baseConf from  './base.conf'
import devConf from  './dev.conf'
import testConf from  './test.conf'
import prodConf from  './prod.conf'

var globalOption = Object.assign(baseConf, devConf);
// var globalOption = Object.assign(baseConf, testConf);
// var globalOption = Object.assign(baseConf, prodConf);

export default globalOption;