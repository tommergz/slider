const reqSvgs = require.context('../icons', false);
const paths = reqSvgs.keys();
const svgs = paths.map(path => reqSvgs(path));

export default svgs;