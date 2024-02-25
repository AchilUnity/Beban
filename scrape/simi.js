const axios = require('axios')

async function simsimi(yourMessage, langCode) {
	const res = await axios.post(
    'https://api.simsimi.vn/v2/simtalk',
    new URLSearchParams({
        'text': yourMessage,
        'lc': langCode
    })
);

	if (res.status > 200)
		throw new Error(res.data.success);

	return res.data.message;
    }

module.exports.simsimi = simsimi